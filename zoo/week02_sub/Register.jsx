//간단한 회원가입 폼
// 1. 이름
//2. 생년월일
//3. 국적
//4.자기소개
import { useState } from "react";

const Register = () => {
  // const [name, setName] = useState("이름");
  // const [birth, setBirth] = useState("생년월일");
  // const [country, setCountry] = useState("국적");
  // const [intro, setIntro] = useState("자기소개");

  //하나로 묶어서 관리
  const [input, setInput] = useState({
    name: "",
    birth: "",
    country: "",
    bio: "",
  });

  // 1.이름 이벤트 헨들러
  //const onChangeName = (e) => {
  //   setName(e.target.value);
  // };

  //2. 이름에 바로 접근할 수 있게 처리
  //const onChangeName = (e) => {
  //   setInput({
  //     ...input,
  //     name: e.target.value, //원래는 setName이라고 상태변경을 따로 처리해줌
  //     //이제는 바로 이름이라는 키값에 접근해서 변경을 해줌
  //   });
  // };

  //3. 하나로 묶어서 처리
  const OnChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value, //name, birth, country, bio
    });
  };

  // 2.생년월일 이벤트 헨들러

  // const onChangeBirth = (e) => {
  //   setBirth(e.target.value);
  // };

  // const onChangeCountry = (e) => {
  //   setCountry(e.target.value);
  // };

  // const onChangeIntro = (e) => {
  //   setIntro(e.target.value);
  // };

  return (
    <>
      <div>
        <input
          name="name"
          value={input.name}
          onChange={OnChange}
          placeholder={"이름"}
        ></input>
      </div>

      {/* <div>
        <input name="birth" type="date" value={birth} onChangeBirth={onChangeBirth}></input>
      </div> */}

      <div>
        <input
          name="birth"
          type="date"
          value={input.birth}
          onChange={OnChange}
        ></input>
      </div>

      <div>
        <slect name="country" value={input.country} onChange={OnChange}>
          <option value="한국">한국</option>
          <option value="미국">미국</option>
          <option value="일본">일본</option>
          <option value="중국">중국</option>
        </slect>
      </div>

      <div>
        <textarea value={input.intro} onChange={OnChange}></textarea>
      </div>
    </>
  );
};

export default Register;
