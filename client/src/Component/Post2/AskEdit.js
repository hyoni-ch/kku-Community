import React, { useState, useEffect } from 'react'
import "../../App.css"
import { useParams, useNavigate } from "react-router-dom";
import { UploadButtonDiv, UploadForm } from "../../Style/UploadCss.js";
import AskImageUpload from './AskImageUpload';
import axios from "axios";

function AskEdit() {
  let params = useParams();
  let navigate = useNavigate();
  const [PostInfo, setPostInfo] = useState({});
  const [Flag, setFlag] = useState(false);
  const [Title, setTitle] = useState("");
  const [Content, setContent] = useState("");
  const [Image, setImage] = useState("");

  useEffect(() => {
    let body = {
      postNum : params.postNum  
    }
    axios
      .post("/api/ask/detail", body)
      .then((response) => {
        if(response.data.success) {
          setPostInfo(response.data.ask);
          setFlag(true);
        }
      }).catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    setTitle(PostInfo.title);
    setContent(PostInfo.content);
    setImage(PostInfo.image);
  }, [PostInfo]);

  const onSubmit = (e) => {
    e.preventDefault();

    if(Title === "" || Content === "") {
      return alert("모든 항목을 채워주세요!");
    }

    let body = {
      title: Title,
      content: Content,
      postNum: params.postNum,
      image: Image,
    };

    axios
      .post("/api/ask/askEdit", body)
      .then((response) => {
        if(response.data.success) {
          alert("글 수정이 완료되었습니다.");
          navigate(`/ask/${params.postNum}`);
        } else {
          alert("글 수정에 실패하였습니다.");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="main">
      {Flag && (
        <UploadForm>
          <label htmlFor="label">제목</label>
          <input
            id="title"
            type="text"
            value={Title}
            onChange={(e) => {
              setTitle(e.currentTarget.value);
            }}
          />

          <AskImageUpload setImage = {setImage} />

          <label htmlFor="content">내용</label>
          <textarea
            id="content"
            value={Content}
            onChange={(e) => {
              setContent(e.currentTarget.value);
            }}
          />

          <UploadButtonDiv>
            <button
              className="cancel"
              onClick={(e) => {
                e.preventDefault();
                navigate(-1);
              }}
            > 취소 </button>
            <button
              onClick={(e) => {
                onSubmit(e);
              }}
            > 저장 </button>
          </UploadButtonDiv>
        </UploadForm>
      )}
      
    </div>
  )
}

export default AskEdit
