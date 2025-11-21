import { useState, useEffect } from "react";
import axios from "axios";
import "./LPlist.css";

export default function LPlist() {
  const [lpList, setLpList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  //페이지 추가 : 만약에 값이 있다면
  const [nextCursor, setNextCursor] = useState(null);
  const [hasNext, setHasNext] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);

  //axios는 항상 data에 값을 담아온다는 성질 이용하기
  useEffect(() => {
    const fetchLP = async () => {
      try {
        const res = await axios("http://localhost:8000/v1/lps"); //axios.get("http://localhost:8000/v1/lps") 와 동일.get이 기본값
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
  }, []);

  // 더보기를 다루는 법
  const handleLoadMore = async () => {
    if (!hasNext || loadingMore) return; // 다음 페이지가 없거나 로딩 중이면 실행 안 함

    setLoadingMore(true);
    try {
      const res = await axios(
        `http://localhost:8000/v1/lps?cursor=${nextCursor}`
      );
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
  return (
    <div className="lp-page">
      <div className="lp-grid">
        {lpList.map((lp) => (
          <>
            <div className="lp-card" key={lp.id}>
              <img src={lp.thumbnail} alt={lp.title}></img>
            </div>

            <div className="lp-info">
              <div className="lp-title">{lp.title}</div>
              <div className="lp-content">{lp.content}</div>
            </div>
          </>
        ))}
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
