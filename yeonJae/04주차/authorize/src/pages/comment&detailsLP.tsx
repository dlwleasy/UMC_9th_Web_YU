import { useParams } from "react-router-dom";
import { getdata } from "./Hooks";
import { Infinte_get_Comment } from "../hooks/ToggleHook";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";

const Comment_detailsLP = () => {
  const { LPid } = useParams();
  const { ref, inView } = useInView();

  const { data_LP, prettireFromet_date, Like } = getdata(LPid);
  console.log("LP 데이터", data_LP, "지금 아이디", LPid);
  const [checked, setSortOrder] = useState(false); // 'latest' | 'oldest'
  const latestOrOld: "asc" | "desc" = checked ? "asc" : "desc";
  console.log(latestOrOld);
  const {
    data,
    status,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
    isLoading,
  } = Infinte_get_Comment(LPid, latestOrOld);
  console.log("댓글 데이터", data, status);

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);
  if (status == "error") {
    return <div> 에러 발생 </div>;
  }

  return (
    <>
      <div className="both-container">
        <main className="detail_container">
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
        <div className="comment-container">
          <div className="comment-header">
            <span className="comment-title">댓글</span>
            <div className="sort-buttons">
              <button
                className={`sort-btn ${latestOrOld === "desc" ? "active" : ""}`}
                onClick={() => setSortOrder(false)}
              >
                오래된순
              </button>
              <button
                className={`sort-btn ${latestOrOld === "asc" ? "active" : ""}`}
                onClick={() => setSortOrder(true)}
              >
                최신순
              </button>
            </div>
          </div>

          <div className="input-wrapper">
            <input
              type="text"
              className="comment-input"
              placeholder="댓글을 입력해주세요"
            />
            <button className="submit-btn_comment">작성</button>
          </div>
          <div className="comment-container_list">
            {isLoading
              ? Array.from(new Array(10)).map((_, index) => (
                  <Stack>
                    <Skeleton
                      animation="wave"
                      variant="circular"
                      key={index}
                      width={30}
                      height={30}
                      sx={{ bgcolor: "grey.400" }}
                    />
                    <Skeleton
                      variant="text"
                      sx={{ fontSize: "2rem", bgcolor: "grey.400" }}
                    />
                  </Stack>
                ))
              : data?.pages.map((page, pageIndex) =>
                  page.data.data.map((Comment_data) => (
                    <div key={Comment_data.id} className="comment-list">
                      <div className="comment-item">
                        <img
                          src={Comment_data.author.avatar}
                          alt="profile"
                          className="avatar"
                        />

                        <div className="comment-content">
                          <span className="user-name">
                            {Comment_data.author.name}
                          </span>
                          <p className="comment-text">{Comment_data.content}</p>
                        </div>

                        <div className="more-options">
                          <svg
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                          >
                            <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  ))
                )}
            {isFetchingNextPage &&
              Array.from(new Array(10)).map((_, index) => (
                <Stack>
                  <Skeleton
                    animation="wave"
                    variant="circular"
                    key={index}
                    width={30}
                    height={30}
                    sx={{ bgcolor: "grey.400" }}
                  />
                  <Skeleton
                    variant="text"
                    sx={{ fontSize: "2rem", bgcolor: "grey.400" }}
                  />
                </Stack>
              ))}
            <div className="check_infinite" ref={ref}>
              한재연
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Comment_detailsLP;
