// components/Modal.jsx
import { useEffect } from "react";
import "./Modal.css";

export default function Modal({ isOpen, onClose, children }) {
  // ESC 키로 닫기 / 상태변화가 언제되는지 생각하기 - 필요한게 무엇인지
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEsc);
      document.body.style.overflow = "hidden"; // 뒷 배경 스크롤 방지
    }

    return () => {
      //전체적으로 설정해줬던거 없애줌
      document.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "unset"; //화면 고정한거 풀어주기
    };
  }, [isOpen, onClose]); //각각의 상황마다 하는 동작이 다르기 때문에 값을 변경시켜줘야해서

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      {/*배경 누르면 닫히게하기 */}
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          ✕
        </button>
        {children}
      </div>
    </div>
  );
}

/*
이벤트 버블링 현상 
: 자식에게서 부모로 올라간다.
사용자가 자식의 글자를 클릭한경우

stopPropagation()이 있어서 클릭 뒤에있는 검은배경, 즉 부모까지 전달이 된다.
그래서 배경이 감지하고는 close하여 모달이닫혀버려서 버그가 발생한다.
-> 따라서 막아주는 것이고, 막아주면 신호를보내지 않고 소멸된다. 모달이 닫히지 않고 그대로 유지된다,



*/

/*
부모-자식 관계 - 상자 속 상자 - 태그가 겹쳐 있다는 것
첫 번째 div (배경): 화면 전체를 검게 칠하기 위해 (overlay)

두 번째 div (위치): 정가운데에 물건을 놓기 위한 좌표를 잡기 위해

세 번째 div (내용): 실제 콘텐츠를 담기 위해

영역과 그룹을 만들기 위해서
*/
