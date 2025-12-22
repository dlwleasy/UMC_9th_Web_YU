import { useState } from 'react';
import userImage from "../img/user-icon-on-transparent-background-free-png.webp";


// 1. 가짜 데이터 (Mock Data) 만들기
// '좋아요 한 LP' 데이터
const likedLPs = [
  { id: 1, img: "https://via.placeholder.com/300/4444ff/ffffff?text=Liked+1", title: "좋아요1" },
  { id: 2, img: "https://via.placeholder.com/300/4444ff/ffffff?text=Liked+2", title: "좋아요2" }
];

// '작성한 LP' 데이터 (내용이 바뀌는 걸 확인하기 위해 색상을 다르게 했습니다)
const writtenLPs = [
  { id: 101, img: "https://via.placeholder.com/300/ff4444/ffffff?text=Written+1", title: "작성글1" },
  { id: 102, img: "https://via.placeholder.com/300/ff4444/ffffff?text=Written+2", title: "작성글2" },
  { id: 103, img: "https://via.placeholder.com/300/ff4444/ffffff?text=Written+3", title: "작성글3" }
];

export default function Mypage() {
  // 2. State 선언: 현재 선택된 탭을 저장 (기본값: 'liked')
  const [currentTab, setCurrentTab] = useState('liked');
  const Name = localStorage.getItem('userName');
  const Email = localStorage.getItem('Email');

  return (
    <div className="container" style={{ minWidth: '77vw', margin: '0 auto', padding: '20px', color: 'white', backgroundColor: 'black', height: '100vh' }}>
      
      {/* --- 상단 프로필 영역 (변동 없음) --- */}
      <header className="profile-header" style={{ display: 'flex', alignItems: 'center', padding: '40px 0', position: 'relative' }}>
        <img src={userImage} alt="프로필" style={{ width: '150px', height: '100px', borderRadius: '50%', marginRight: '20px' }} />
        <div>
          <h1 style={{ fontSize: '24px', fontWeight: 'bold' }}>{Name}</h1>
          <p style={{ color: '#aaa' }}>프론트 짱</p>
          <p style={{ color: '#888' }}>{Email}</p>
        </div>
      </header>

      {/* --- 탭 메뉴 (클릭 이벤트 추가!) --- */}
      <nav style={{ display: 'flex', borderBottom: '1px solid #333', marginBottom: '20px' }}>
        
        {/* 탭 1: 좋아요 한 LP */}
        <div 
          onClick={() => setCurrentTab('liked')} // 클릭 시 상태 변경
          style={{ 
            padding: '10px 20px', 
            cursor: 'pointer',
            fontWeight: 'bold',
            // 선택된 탭이면 흰색, 아니면 회색
            color: currentTab === 'liked' ? '#fff' : '#555',
            borderBottom: currentTab === 'liked' ? '2px solid #fff' : 'none'
          }}
        >
          내가 좋아요 한 LP
        </div>

        {/* 탭 2: 작성한 LP */}
        <div 
          onClick={() => setCurrentTab('written')} // 클릭 시 상태 변경
          style={{ 
            padding: '10px 20px', 
            cursor: 'pointer',
            fontWeight: 'bold',
            color: currentTab === 'written' ? '#fff' : '#555',
            borderBottom: currentTab === 'written' ? '2px solid #fff' : 'none'
          }}
        >
          내가 작성한 LP
        </div>
      </nav>

      {/* --- 정렬 버튼 (디자인만 유지) --- */}
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '20px' }}>
        <div style={{ border: '1px solid #555', borderRadius: '5px', overflow: 'hidden' }}>
          <button style={{ background: '#000', color: '#888', border: 'none', padding: '5px 15px' }}>오래된순</button>
          <button style={{ background: '#fff', color: '#000', border: 'none', padding: '5px 15px', fontWeight: 'bold' }}>최신순</button>
        </div>
      </div>

      {/* --- 3. 조건부 렌더링 (핵심!) --- */}
      <main style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: '10px' }}>
        
        {/* 현재 탭이 'liked'이면 likedLPs를 보여주고,
            아니면 writtenLPs를 보여줍니다.
        */}
        {(currentTab === 'liked' ? likedLPs : writtenLPs).map((item) => (
          <img 
            key={item.id} 
            src={item.img} 
            alt={item.title} 
            style={{ width: '100%', aspectRatio: '1/1', objectFit: 'cover', borderRadius: '4px' }} 
          />
        ))}

      </main>

    </div>
  );
}
