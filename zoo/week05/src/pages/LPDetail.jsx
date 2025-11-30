import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import "./LPDetail.css";
export default function LPDetail() {
  const { lpid } = useParams();
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

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="lp-detail-container" style={{ padding: "40px" }}>
      <div>
        <h4>{lp.author.name}</h4>
        <h4>{formatDate(lp.createdAt)}</h4>
      </div>

      <div>
        <h1>{lp.title}</h1>
        <button>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
            <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" />
          </svg>
        </button>
        <button>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
            <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" />
          </svg>
        </button>
      </div>

      <img src={lp.thumbnail} alt={lp.title} style={{ maxWidth: "500px" }} />

      <p>{lp.content}</p>

      {lp.tags && lp.tags.length > 0 && (
        <div className="tags">
          {lp.tags.map((tag) => (
            <span key={tag.id} className="tag">
              #{tag.name}
            </span>
          ))}
        </div>
      )}

      <button>💗 :{lp.likes}</button>
    </div>
  );
}
