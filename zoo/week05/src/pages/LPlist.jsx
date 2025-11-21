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
        const res = await axios("http://localhost:8000/v1/lps"); //axios.get("http://localhost:8000/v1/lps") 와 동일.get이 기본값
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
