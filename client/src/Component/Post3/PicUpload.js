import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UploadButtonDiv, UploadForm } from "../../Style/UploadCss.js";
import PicImageUpload from "./PicImageUpload.js";
import axios from "axios";
import { useSelector } from "react-redux";

function PicUpload() {
  const [Title, setTitle] = useState("");
  const [Content, setContent] = useState("");
  const [Image, setImage] = useState("");
  let navigate = useNavigate();

  const user = useSelector(state => state.user);

  useEffect(() => {
    if (user.isLoading && !user.accessToken) {
      alert("로그인 한 회원만 글을 작성할 수 있습니다.");
      navigate("/login");
    }
  }, [user]);

  const onSubmit = e => {
    e.preventDefault();

    if (Title === "" || Content === "") {
      return alert("모든 항목을 채워주세요!");
    }

    let body = {
      title: Title,
      content: Content,
      image: Image,
      uid: user.uid
    };

    axios
      .post("/api/pic/submit", body)
      .then(response => {
        if (response.data.success) {
          alert("글 작성이 완료되었습니다.");
          navigate("/commuPic");
        } else {
          alert("글 작성에 실패하였습니다.");
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <div className="main">
      <UploadForm>
        <label htmlFor="label">제목</label>
        <input
          id="title"
          type="text"
          value={Title}
          onChange={e => {
            setTitle(e.currentTarget.value);
          }}
        />

        <PicImageUpload setImage={setImage} />

        <label htmlFor="content">내용</label>
        <textarea
          id="content"
          value={Content}
          onChange={e => {
            setContent(e.currentTarget.value);
          }}
        />

        <UploadButtonDiv>
          <button
            onClick={e => {
              onSubmit(e);
            }}
          >
            {" "}
            저장{" "}
          </button>
        </UploadButtonDiv>
      </UploadForm>
    </div>
  );
}

export default PicUpload;
