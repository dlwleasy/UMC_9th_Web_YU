import { useState, useEffect } from "react";
import axios from "axios";
import "./LPlist.css";

export default function LPlist() {
  const [lpList, setLpList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  //axios는 항상 data에 값을 담아온다는 성질 이용하기
  useEffect(() => {
    const fetchLP = async () => {
      try {
        const res = await axios("http://localhost:8000/v1/lps");
        //data.data.data;
        const lpArray = res.data.data.data;
        setLpList(lpArray);
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

  if (loading) return <div>loading..</div>;
  if (error) return <div> error! </div>;
  return (
    <div className="lp-page">
      {/* 중앙 큰 박스 */}
      <div className="lp-grid-wrapper">
        <div className="lp-grid">
          {lpList.map((lp) => (
            <div className="lp-card" key={lp.id}>
              <img src={lp.thumbnail} alt={lp.title} />
              {/* 밑에처럼 오버레이 정보도 넣을 수 있음 */}
              <div className="lp-info">
                <div className="lp-title">{lp.title}</div>
                {/* <div className="lp-meta">1 days ago · ♥ 0</div> 이런 것도 가능 */}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

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
