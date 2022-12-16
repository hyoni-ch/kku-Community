import React, { useState } from 'react'
import axios from "axios"
import { useSelector } from 'react-redux'
import { RepleUploadDiv } from "../../../Style/RepleCSS";

function CommentUpload(props) {

    const [Comment, setComment] = useState("");
    const user = useSelector((state) => state.user);


    const SubmitHandler = (e) => {
      e.preventDefault();

      if(!Comment) {
        return alert("댓글 내용을 채워주세요!");
      }

      let body = {
        comment: Comment,
        uid: user.uid,
        cafePostId: props.cafePostId
      };

      axios.post("/api/comment/submit", body).then((response) => {
        if(response.data.success) {
          alert("댓글 작성을 성공하였습니다.");
          window.location.reload();
        } else {
          alert("댓글 작성을 실패하였습니다.");
        }
      });
    };

  return (
    <RepleUploadDiv>
      <form>
        <input
          type="text"
          value={Comment}
          onChange={(e) => {
            setComment(e.currentTarget.value);
          }}  
        />
        <button onClick={(e) => {SubmitHandler(e);}}>등록</button>
      </form>
    </RepleUploadDiv>
  )
}

export default CommentUpload
