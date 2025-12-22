import { useParams } from "react-router-dom";
import { getdata } from "./Hooks";

const DetailsLP = () => {
  const { LPid } = useParams();
  const { data_LP, prettireFromet_date, Like } = getdata(LPid);

  return (
    <>
      <main>
        <div className="app-container">
          <div className="music-card">
            <div className="card-header">
              <div className="user-info">
                <div className="avatar"></div>
                <span className="username">
                  {data_LP?.data.data.author.name}
                </span>
              </div>
              <span className="time">{prettireFromet_date}</span>
            </div>

            <div className="title-row">
              <h2 className="song-title">{data_LP?.data.data.title}</h2>
              <div className="icon-group">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                  <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                </svg>

                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="3 6 5 6 21 6"></polyline>
                  <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                </svg>
              </div>
            </div>

            <div className="cd-wrapper">
              <div className="cd-case-shadow"></div>
              <div className="cd-disc">
                <img
                  // 실제 사용하실 이미지 URL을 여기에 넣으세요
                  src={data_LP?.data.data.thumbnail}
                  alt="Album Art"
                  className="album-art"
                />

                <div className="center-hole"></div>
              </div>
            </div>

            <p className="description">{data_LP?.data.data.content}</p>

            <div className="tags-container">
              <span className="tag"># 오타니안</span>
              <span className="tag"># 빅뱅</span>
              <span className="tag"># 권지용</span>
              <span className="tag"># 정형돈</span>
              <span className="tag"># 광희</span>
              <span className="tag"># ubermensch</span>
            </div>

            <div className="card-footer">
              <span className="heart-icon">♥</span>
              <span>{Like}</span>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default DetailsLP;
