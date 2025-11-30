// components/LPForm.jsx
import { useState } from "react";
import "./LPForm.css";

export default function LPForm({ onSubmit, onClose }) {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    tags: "",
    thumbnail: null,
  });
  const [preview, setPreview] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, thumbnail: file });

      // 미리보기
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form className="lp-form" onSubmit={handleSubmit}>
      <h2>LP 등록</h2>

      {/* 이미지 업로드 */}
      <div className="form-group">
        <label className="image-upload-label">
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            style={{ display: "none" }}
          />
          <div className="image-preview">
            {preview ? (
              <img src={preview} alt="Preview" />
            ) : (
              <div className="placeholder">
                <span>📷</span>
                <p>LP 사진 업로드</p>
              </div>
            )}
          </div>
        </label>
      </div>

      {/* LP Name */}
      <div className="form-group">
        <label>LP Name</label>
        <input
          type="text"
          placeholder="LP 제목을 입력하세요"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          required
        />
      </div>

      {/* LP Content */}
      <div className="form-group">
        <label>LP Content</label>
        <textarea
          placeholder="LP 설명을 입력하세요"
          value={formData.content}
          onChange={(e) =>
            setFormData({ ...formData, content: e.target.value })
          }
          rows="4"
          required
        />
      </div>

      {/* LP Tag */}
      <div className="form-group">
        <label>LP Tag</label>
        <input
          type="text"
          placeholder="태그를 쉼표로 구분하여 입력하세요"
          value={formData.tags}
          onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
        />
      </div>

      {/* 버튼 */}
      <div className="form-buttons">
        <button type="button" className="cancel-btn" onClick={onClose}>
          취소
        </button>
        <button type="submit" className="submit-btn">
          Add LP
        </button>
      </div>
    </form>
  );
}
