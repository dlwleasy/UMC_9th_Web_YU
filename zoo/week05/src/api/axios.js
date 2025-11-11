import axios from "axios";

//1.axios 인스턴스 생성 (커스텀 인스턴스 - 전용으로 만들기)
const api = axios.create({ baseURL: "http://localhost:8000/v1" });
//api.post("/auth/signup", { ... }); : http://localhost:8000/v1/auth/signup와 동일

//2.요청 인터셉터 설정 (토큰 첨부 등)

api.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      // config.headers 안에 'Authorization' 헤더를 추가합니다.
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
export default api;

// 이제 또 토큰을 증명하기 위해서 증거를 보내는 것들이 있음
// 이런것들은 헤더어ㅔ 이름표를 붙여서 보냄 : Authorization

//원래 ; local에서 직접 꺼내고 요청할때마다 수동으로 넣어야됨
// api.get("/user/mypage", {
//   headers: {
//     Authorization: `Bearer ${token}`
//   }
// });

// 3. ✨ 여기가 3단계: '응답 인터셉터' 설정하기 <- 모르겠음
api.interceptors.response.use(
  // (1) 서버로부터 정상 응답(2xx)을 받았을 때
  (response) => {
    // 그냥 그대로 .then()으로 전달
    return response;
  },

  // (2) 서버로부터 에러 응답(4xx, 5xx)을 받았을 때
  async (error) => {
    // 'error.config'는 '우편물 검사실'이 가로챈
    // '반송 우편' (즉, 401 에러를 일으킨 원래의 요청) 입니다.
    const originalRequest = error.config;

    // 401 에러(토큰 만료)이고,
    // _retry 플래그가 붙어있지 않다면 (무한 재시도를 막기 위함)
    if (error.response.status === 401 && !originalRequest._retry) {
      // _retry 플래그를 true로 설정 (이제 이 요청은 "재시도 중"이라고 표시)
      originalRequest._retry = true;

      try {
        // --- 6, 7번: '매표소' 가서 새 토큰 받아오기 ---
        const refreshToken = localStorage.getItem("refreshToken");

        // 🚨 중요: 새 토큰을 받아오는 요청은 'api' 인스턴스가 아닌,
        // 순정 axios를 사용해야 합니다. (안 그러면 무한 루프에 빠짐)
        const response = await axios.post(
          "http://localhost:8000/v1/auth/refresh", // baseURL을 포함한 전체 주소
          { refreshToken: refreshToken }
        );

        // --- 8번: 새 토큰 저장 ---
        const newAccessToken = response.data.accessToken;
        localStorage.setItem("accessToken", newAccessToken);

        // --- 9번: '반송 우편'에 새 토큰 붙여서 다시 보내기 ---
        // 원래 요청(originalRequest)의 헤더를 새 토큰으로 교체
        originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;

        // 'api' 인스턴스를 사용해 원래 요청을 재시도
        return api(originalRequest);
      } catch (refreshError) {
        // --- 'Refresh Token'마저 만료된 경우 (최악) ---
        // (예: 7일간 접속 안 함)
        console.error("Refresh Token도 만료되었습니다.", refreshError);

        // 스토리지 비우고 (완전 로그아웃)
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");

        // 로그인 페이지로 강제 이동
        alert("세션이 만료되었습니다. 다시 로그인해주세요.");
        window.location.href = "/login"; // (혹은 navigate 사용)

        return Promise.reject(refreshError);
      }
    }

    // 401 에러가 아니거나, 이미 재시도한 요청이라면
    // 그냥 에러를 .catch()로 전달
    return Promise.reject(error);
  }
);
