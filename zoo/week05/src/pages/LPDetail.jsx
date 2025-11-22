import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

export default function LPDetail() {
  const { lpid } = useParams(); // URL에서 lpid 가져오기
  const [lp, setLp] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLPDetail = async () => {
      try {
        const res = await axios(`http://localhost:8000/v1/lps/${lpid}`);
        setLp(res.data.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchLPDetail();
  }, [lpid]);

  if (loading) return <div>Loading...</div>;
  if (!lp) return <div>LP를 찾을 수 없습니다.</div>;

  return (
    <div style={{ padding: "40px" }}>
      <h1>{lp.title}</h1>
      <img src={lp.thumbnail} alt={lp.title} style={{ maxWidth: "500px" }} />
      <p>{lp.content}</p>
      <p>💗 :{lp.likes}</p>
    </div>
  );
}
