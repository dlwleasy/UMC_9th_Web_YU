import { useState } from "react";


function Open_Close() {
    const [isModalOpen, setIsModalOpen] = useState(false);

  // 1. 사이드 여는 함수(+ 버튼 관련이야)
    const openModal = () => {
    setIsModalOpen(true);
    };

  // 2. 사이드를 닫는 함수(+ 버튼 관련이야)
    const closeModal = () => {
    setIsModalOpen(false);
    };
    return {openModal, closeModal, isModalOpen}
}

export default Open_Close