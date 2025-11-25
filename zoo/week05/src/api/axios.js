import axios from "axios";

//뭐가 필요한지 생각하기
export const apiInstance = axios.create({
  baseURL: "http://localhost:8000",
});

apiInstance.interceptors.response.use(
  (response) => {
    console.log("성공", response);
    return response;
  },
  async (error) => {
    console.log(`${error.response.status}CODE ERROR!`);
    const refreshtoken = localStorage.getItem("refreshToken");
    console.log(refreshtoken);
    if (refreshtoken) {
      const response = await axios.post(
        "http://localhost:8000/v1/auth/refresh",
        {
          refresh: refreshtoken,
        }
      );
      console.log(response);
      const { accessToken, refreshToken } = response.data.data;
      console.log("accesstoken", accessToken, "refreshtoken", refreshToken);
      localStorage.clear();
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      //실패한 요청
      const originalRequest = error.config;
      originalRequest.headers["Authorization"] = `Bearer ${accessToken}`;
      return apiInstance(originalRequest);
    }
  }
);
