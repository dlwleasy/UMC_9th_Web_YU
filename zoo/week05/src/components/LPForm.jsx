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
  //객체로 지정해서 useState여러개 안 해도 사용할 수 있게함

  const [preview, setPreview] = useState(null);

  const handleImageChange = (e) => {
    //파일 꺼내기-1개만
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, thumbnail: file });

      // 미리보기 - 알맞는 이미지인지 확인하기 위함
      const reader = new FileReader(); //브라우저용-파일을 읽어서 디지털 이미지 파일로 변환해서 만들어주는 것
      reader.onloadend = () => {
        //이 과정을 완료했다는 것을 알려줌- 일이 다 끝났을때 실행하는 함수
        setPreview(reader.result);
      };
      reader.readAsDataURL(file); //읽기 시작하는 것,서버에 올리지 않고
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
