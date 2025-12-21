// 영화 상세 모달 컴포넌트
export default function MovieModal({ movie, onClose }) {
  const imageBaseUrl = "https://image.tmdb.org/t/p/w500";
  const fallbackImageImage =
    "https://via.placeholder.com/500x750?text=No+Image";

  // 배경 클릭으로 모달 닫기
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  // IMDb 검색 링크
  const handleImdbSearch = () => {
    const searchQuery = encodeURIComponent(movie.title);
    window.open(`https://www.imdb.com/find?q=${searchQuery}`, "_blank");
  };

  return (
    <div className="modal-backdrop" onClick={handleBackdropClick}>
      <div className="modal-content">
        {/* 닫기 버튼 */}
        <button className="modal-close" onClick={onClose}>
          ✕
        </button>

        {/* 포스터 이미지 */}
        <div className="modal-poster">
          <img
            src={
              movie.poster_path
                ? `${imageBaseUrl}${movie.poster_path}`
                : fallbackImageImage
            }
            alt={movie.title || "영화 포스터"}
            onError={(e) => {
              e.target.src = fallbackImageImage;
            }}
          />
        </div>

        {/* 영화 정보 */}
        <div className="modal-info">
          <h2 className="modal-title">{movie.title}</h2>

          {movie.original_title !== movie.title && (
            <p className="modal-original-title">{movie.original_title}</p>
          )}

          <div className="modal-meta">
            {movie.vote_average > 0 && (
              <div className="modal-rating">
                <span className="rating-label">평점</span>
                <span className="rating-value">
                  ⭐ {movie.vote_average.toFixed(1)}
                </span>
              </div>
            )}

            {movie.release_date && (
              <div className="modal-date">
                <span className="date-label">개봉일</span>
                <span className="date-value">{movie.release_date}</span>
              </div>
            )}

            {movie.vote_count > 0 && (
              <div className="modal-votes">
                <span className="votes-label">평가 수</span>
                <span className="votes-value">
                  {movie.vote_count.toLocaleString()}명
                </span>
              </div>
            )}
          </div>

          {movie.overview && (
            <div className="modal-overview">
              <h3 className="overview-title">줄거리</h3>
              <p className="overview-text">{movie.overview}</p>
            </div>
          )}

          {/* 버튼 그룹 */}
          <div className="modal-buttons">
            <button className="imdb-button" onClick={handleImdbSearch}>
              IMDb에서 검색하기
            </button>
            <button className="close-button" onClick={onClose}>
              닫기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
