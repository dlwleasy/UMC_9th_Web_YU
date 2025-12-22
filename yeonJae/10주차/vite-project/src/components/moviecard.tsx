
export const MovieCard = ({title,  closeModal, release_date, story_line, poster_path, movieID, subposter_path}:{title:string, closeModal:()=>void, release_date:string, story_line:string, poster_path:string, movieID:string, subposter_path:string}) => {
    const url = `https://www.imdb.com/find?q=${movieID}`;
    
    return(
        <>
            <div className="modal-overlay" onClick={(e) => {
            e.stopPropagation(); // 부모의 openModal 실행 방지
            
        }}>
    <div className="modal-content">
        <button className="close-btn" onClick={closeModal}>&times;</button>
        <div className="modal-header-bg">
            <img alt="영화 포스터 2" src={`https://image.tmdb.org/t/p/w500${subposter_path}`} className="bg_poster"></img>
            <div className="header-text">
                <h2>{title}</h2>
                <p>名探偵コナン 黒鉄の魚影 (サブマリン)</p>
            </div>
        </div>

        <div className="modal-body">
            <div className="poster-section">
                <img src={`https://image.tmdb.org/t/p/w500${poster_path}`} alt="영화 포스터"></img>
            </div>
            <div className="info-section">
                <div className="rating-info">
                    <span className="score">7.0</span> <span className="count">(114 평가)</span>
                </div>
                
                <div className="detail-item">
                    <h4>개봉일</h4>
                    <p>{release_date}</p>
                </div>

                <div className="detail-item">
                    <h4>인기도</h4>
                    <div className="progress-bar"><div className="progress"></div></div>
                </div>

                <div className="detail-item">
                    <h4>줄거리</h4>
                    <p className="summary">{story_line}</p>
                </div>

                <div className="button-group">
                    <button className="imdb-btn" onClick={()=>window.open(url, "_blank")}>IMDb에서 검색</button>
                    
                    <button className="close-action-btn" onClick={closeModal}>닫기</button>
                </div>
            </div>
        </div>
    </div>
</div>
        </>
    )
}