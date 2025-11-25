import React, { useState } from 'react';
import { Infinte_get_Comment } from '../hooks/ToggleHook';
import { useParams } from 'react-router-dom';




const CommentSection = () => {
    const LP_ID:number = useParams()
    const [checked, setSortOrder] = useState(false); // 'latest' | 'oldest'
    const latestOrOld: 'asc' | 'desc'= checked ? 'asc' : 'desc'
    console.log(latestOrOld)
    const {data,status, hasNextPage, isFetching, isFetchingNextPage, fetchNextPage, isLoading} = Infinte_get_Comment(1,latestOrOld)
    console.log(data)

  return (
    <div className="comment-container">
      

      <div className="comment-header">
        <span className="comment-title">댓글</span>
        <div className="sort-buttons">
          <button 
            className={`sort-btn ${latestOrOld === 'desc' ? 'active' : ''}`}
            onClick={() => setSortOrder(false)}
          >
            오래된순
          </button>
          <button 
            className={`sort-btn ${latestOrOld === 'asc' ? 'active' : ''}`}
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
        <button className="submit-btn">작성</button>
      </div>

      
      <div className="comment-list">

        <div key={data.id} className="comment-item">
            
            <img src={data.author.avatar} alt="profile" className="avatar" />
            
            
            <div className="comment-content">
              <span className="user-name">{data.username}</span>
              <p className="comment-text">{data.content}</p>
            </div>

            
            {data.isMyComment && (
              <div className="more-options">
                
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/>
                </svg>
              </div>
            )}
          </div>
    
      </div>
      
    </div>
  );
};

export default CommentSection;