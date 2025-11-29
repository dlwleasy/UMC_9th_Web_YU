import { useState } from "react";
import recordImage from "../img/e278ed6d-4722-4e6d-bd30-7815c5b10c15.jpg";
import { ValidatePW } from "./Hooks";

export const AddLP = ({ close }: { close: () => void }) => {
  const { Password, handlePasswordCheck } = ValidatePW();
  const [TagList, setTag] = useState([""]);

  const addTag = () => {
    setTag([...TagList, Password]);
  };
  console.log(TagList);

  return (
    <>
      <div className="modal-overlay">
        <div className="modal-card">
          <button className="close-btn" onClick={close}>&times;</button>

          <div className="image-wrapper">
            <img
              src="https://cdn-icons-png.flaticon.com/512/10492/10492476.png"
              alt="Vinyl Record"
              className="lp-record-img"
            ></img>
          </div>

          <div className="form-container">
            <input
              type="text"
              className="input-field"
        
              placeholder="제목을 입력하세요"
            ></input>

            <input
              type="text"
              className="input-field"
              placeholder="설명을 입력하세요"
            ></input>

            <div className="tag-input-group">
              <input
                
                className="input-field tag-input"
                onClick={handlePasswordCheck}
                placeholder="LP Tag"
              ></input>
              <button className="add-btn" onClick={addTag}>Add</button>
            </div>

            <div className="tag-list">
                {TagList.map((tag)=>
                <div className="tag-chip">
                <span>{tag}</span>
                <span className="tag-close">&times;</span>
              </div>)}
              
            </div>
          </div>

          <button className="submit-btn">Add LP</button>
        </div>
      </div>
    </>
  );
};
