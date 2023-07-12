import React, { useState, useEffect } from "react";
import axios from "axios";
import CommentContent from "./CommentContent.js";

import { RepleListDiv } from "../../../Style/RepleCSS.js";

function CommentList(props) {
  const [commentList, setcommentList] = useState([]);

  useEffect(() => {
    let body = {
      cafePostId: props.cafePostId
    };
    axios.post("/api/comment/getComment", body).then(response => {
      if (response.data.success) {
        setcommentList([...response.data.commentList]);
      }
    });
  }, []);

  return (
    <RepleListDiv>
      {commentList.map((comment, idx) => {
        return <CommentContent comment={comment} key={idx} />;
      })}
    </RepleListDiv>
  );
}

export default CommentList;
