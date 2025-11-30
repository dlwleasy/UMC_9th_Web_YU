import { useState } from "react";
import recordImage from "../img/e278ed6d-4722-4e6d-bd30-7815c5b10c15.jpg";
import { CreateLP, ValidateContent, ValidatePW, ValidateTitle } from "./Hooks";

export const AddLP = ({ close }: { close: () => void }) => {
  const { Password, handlePasswordCheck } = ValidatePW();
  const {Title, handletitleCheck} = ValidateTitle()
  const {Content, handlecontentCheck} = ValidateContent()
  const [TagList, setTag] = useState([""]);

  const print= (TagList:string[],i:number) => {
    const newItems = TagList.filter((_, index) => index !== i);
    setTag(newItems)
    }

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
              src={recordImage}
              alt="Vinyl Record"
              className="lp-record-img"
            ></img>
          </div>

          <div className="form-container">
            <input
              type="text"
              className="input-field"
              onChange={handletitleCheck}
              placeholder="제목을 입력하세요"
            ></input>

            <input
              type="text"
              className="input-field"
              onChange={handlecontentCheck}
              placeholder="설명을 입력하세요"
            ></input>

            <div className="tag-input-group">
              <input
                
                className="input-field tag-input"
                onChange={handlePasswordCheck}
                placeholder="LP Tag"
              ></input>
              <button className="add-btn" onClick={addTag}>Add</button>
            </div>

            <div className="tag-list">
                {TagList.map((tag,i)=>
                <div className="tag-chip" key={i}>
                  <span>{tag}</span>

                <span className="tag-close" onClick={()=>print(TagList,i)}>&times;</span>
              </div>)}
              
            </div>
          </div>

          <button className="submit-btn" onClick={()=>CreateLP(Title,Content,TagList,recordImage)}>Add LP</button>
        </div>
      </div>
    </>
  );
};
