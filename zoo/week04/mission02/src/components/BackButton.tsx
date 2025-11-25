import { useNavigate } from "react-router-dom";

export default function BackButton() {
  const navigate = useNavigate();
  return (
    <button
      type="button"
      onClick={() => navigate(-1)}
      aria-label="이전 페이지로 이동"
      className="absolute left-4 top-4 p-2 rounded hover:bg-gray-100"
    >
      &lt;
    </button>
  );
}
