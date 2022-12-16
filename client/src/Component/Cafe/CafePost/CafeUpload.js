import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { UploadForm, UploadButtonDiv } from "../../../Style/CafeUploadCss"
import axios from "axios"
import "../../../App.css"
import CafeImageUpload from './CafeImageUpload.js';

function CafeUpload() {

  const [Name, setName] = useState("");
  const [Address, setAddress] = useState("");
  const [Time, setTime] = useState("");
  const [Phone, setPhone] = useState("");
  const [Other, setOther] = useState("");
  const [Image, setImage] = useState("");

  let navigate = useNavigate();

  const onSubmit = (e) => {
    e.preventDefault();
    if(Name === "" || Address === "") {
        return alert("카페 이름과 주소를 넣어주세요.");
    }

    let body = {
        name: Name,
        address: Address,
        time: Time,
        phone: Phone,
        other: Other,
        image: Image,
    }

    axios.post("/api/cafe/submit", body).then((response) => {
        if(response.data.success) {
            alert("글 작성이 완료되었습니다.");
            navigate("/cafe");
        }
        else {
            alert("글 작성에 실패하였습니다.");
        }
    })
    .catch((err) => {
        console.log(err);
    })
  }

  return (
    <div className="main">


      <UploadForm>

        <h4>카페 업로드</h4>

        <CafeImageUpload setImage = {setImage} />

        <label htmlFor="name">이름</label>
        <textarea
          id="name"
          value={Name}
          onChange={(e) => {
            setName(e.currentTarget.value);
          }}
        />

        <label htmlFor="address">주소</label>
        <textarea
          id="address"
          value={Address}
          onChange={(e) => {
            setAddress(e.currentTarget.value);
          }}
        />

        <label htmlFor="time">영업시간</label>
        <textarea
          id="time"
          value={Time}
          onChange={(e) => {
            setTime(e.currentTarget.value);
          }}
        />

        <label htmlFor="phone">전화번호</label>
        <textarea
          id="phone"
          value={Phone}
          onChange={(e) => {
            setPhone(e.currentTarget.value);
          }}
        />

        <label htmlFor="other">기타</label>
        <textarea
          id="other"
          value={Other}
          onChange={(e) => {
            setOther(e.currentTarget.value);
          }}
        />

        <UploadButtonDiv>
          <button
            onClick={(e) => {
              onSubmit(e);
            }}
          > 저장 </button>
        </UploadButtonDiv>
        

      </UploadForm>
    </div>
  )
}

export default CafeUpload
