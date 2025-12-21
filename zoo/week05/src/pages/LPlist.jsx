import { useState, useEffect } from "react";
import axios from "axios";
import "./LPlist.css";
import { useNavigate } from "react-router-dom";
import useDebounce from "../hooks/useDebounce";
import Modal from "../components/Modal";
import LPForm from "../components/LPForm";

export default function LPlist() {
  const [lpList, setLpList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  //페이지 추가 : 만약에 값이 있다면
  const [nextCursor, setNextCursor] = useState(null);
  const [hasNext, setHasNext] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  //sort
  const [sort, setSort] = useState("desc"); //최신순으로 설정
  //search
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const navigate = useNavigate();

  //주소창 이동시킴
  const handleCardClick = (lpId) => {
    const isLogin = Boolean(localStorage.getItem("IsLoginned"));

    if (!isLogin) {
      alert("로그인이 필요한 페이지입니다.");
      return <Navigate to="/login" state={{ from: location }} replace />;
    }
    navigate(`/lp/${lpId}`);
  };

  //axios는 항상 data에 값을 담아온다는 성질 이용하기
  useEffect(() => {
    const fetchLP = async () => {
      setLoading(true);
      try {
        //url값 설정하기
        let url = `http://localhost:8000/v1/lps?sort=${sort}`;
        if (debouncedSearchTerm.trim()) {
          url += `&search=${encodeURIComponent(debouncedSearchTerm.trim())}`;
        }
        const res = await axios(url);
        // const res = await axios(`http://localhost:8000/v1/lps?sort=${sort}`);
        //axios.get("http://localhost:8000/v1/lps") 와 동일.get이 기본값
        //data.data.data;
        const lpArray = res.data.data.data;
        setLpList(lpArray);
        setNextCursor(res.data.data.nextCursor);
        setHasNext(res.data.data.hasNext);
      } catch (err) {
        console.error(err);
        setError(err);
      } finally {
        //everytime
        setLoading(false);
      }
    };
    fetchLP();
  }, [sort, debouncedSearchTerm]);

  //이거 안 하면 너무 복잡해짐
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // 더보기를 다루는 법
  const handleLoadMore = async () => {
    if (!hasNext || loadingMore) return; // 다음 페이지가 없거나 로딩 중이면 실행 안 함

    setLoadingMore(true);
    try {
      // 추가: 검색어도 포함
      let url = `http://localhost:8000/v1/lps?cursor=${nextCursor}&sort=${sort}`;
      if (debouncedSearchTerm.trim()) {
        url += `&search=${encodeURIComponent(debouncedSearchTerm.trim())}`;
      }
      const res = await axios(url);
      // const res = await axios(
      //   `http://localhost:8000/v1/lps?cursor=${nextCursor}&sort=${sort}`
      //   //이거 안 하면 안됨
      // );
      const newLpArray = res.data.data.data;

      // 기존 리스트에 새로운 데이터 추가
      setLpList([...lpList, ...newLpArray]); //state는 수정하는게 아니라 새로운 배열을 만들어서 업데이트 해야됨
      setNextCursor(res.data.data.nextCursor);
      setHasNext(res.data.data.hasNext);
    } catch (err) {
      console.error(err);
      setError(err);
    } finally {
      setLoadingMore(false);
    }
  };

  if (loading) return <div>loading..</div>;
  if (error) return <div> error! </div>;

  const handleSubmit = async (formData) => {
    try {
      // FormData 생성 (파일 업로드용)
      const data = new FormData();
      data.append("title", formData.title);
      data.append("content", formData.content);
      data.append("tags", formData.tags);
      data.append("thumbnail", formData.thumbnail);

      await axios.post("http://localhost:8000/v1/lps", data);

      alert("LP가 등록되었습니다!");
      setIsModalOpen(false);
      // LP 목록 새로고침 로직 추가
    } catch (err) {
      console.error(err);
      alert("등록 실패");
    }
  };

  return (
    <div className="lp-page">
      <div className="controls">
        {/*  추가: 검색 박스 */}
        <div className="search-box">
          <input
            type="text"
            placeholder="LP 검색..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          {searchTerm && (
            <button className="clear-btn" onClick={() => setSearchTerm("")}>
              ✕
            </button>
          )}
        </div>

        <div className="sort-buttons">
          <button
            onClick={() => setSort("desc")}
            className={`sort-btn ${sort === "desc" ? "active" : ""}`}
          >
            최신순 ▼
          </button>

          <button
            onClick={() => setSort("asc")}
            className={`sort-btn ${sort === "asc" ? "active" : ""}`}
          >
            오래된순 ▼
          </button>
        </div>
      </div>

      <div>
        <button onClick={() => setIsModalOpen(true)}>LP 등록</button>

        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          {/*children 이 컴포넌트를 모달에 넣어줄 수 있음 - 그래서 렌더링됨*/}
          <LPForm
            onSubmit={handleSubmit}
            onClose={() => setIsModalOpen(false)}
          />
        </Modal>
      </div>

      {/* 검색 결과 표시 */}
      {debouncedSearchTerm && (
        <div className="search-info">
          "{debouncedSearchTerm}" 검색 결과: {lpList.length}개
        </div>
      )}

      <div className="lp-grid">
        {/*  추가: 결과 없을 때 메시지 */}
        {lpList.length === 0 ? (
          <div className="no-results">
            {debouncedSearchTerm.trim()
              ? "검색 결과가 없습니다."
              : "LP가 없습니다."}
          </div>
        ) : (
          lpList.map((lp) => (
            <div
              className="lp-card"
              key={lp.id}
              onClick={() => handleCardClick(lp.id)}
            >
              {" "}
              <div className="lp-overlay"></div>
              {/* key는 최상위에! */}
              <img src={lp.thumbnail} alt={lp.title} />
              {/* info를 card 안으로! */}
              <div className="lp-info">
                <div className="lp-title">{lp.title}</div>
                <div className="lp-meta">
                  <span className="lp-date">📅 {formatDate(lp.createdAt)}</span>
                  <span className="lp-likes">❤️ {lp.likes || 0}</span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* hasNext가 true일 때만 버튼 표시 */}
      {hasNext && (
        <button
          className="floating-btn"
          onClick={handleLoadMore}
          disabled={loadingMore}
        >
          {loadingMore ? "로딩 중..." : "+"}
        </button>
      )}
    </div>
  );
}

// 객체 리터럴 반환? ()=>()

//response데이터를 렌더링 해주기

// export default function LPlist() {
//   useEffect(() => {
//     const fetchLP = async () => {
//       const response = await fetch("http://localhost:8000/v1/lps");
//       console.log(response);
//       const result = await response.json();
//       console.log(result);
//     };
//     fetchLP();
//   }, []);

//   return <h1>home</h1>;
// }
