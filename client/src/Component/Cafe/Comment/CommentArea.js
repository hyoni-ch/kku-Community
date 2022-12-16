import React from "react";
import CommentUpload from "./CommentUpload";
import CommentList from "./CommentList";
import { useSelector } from "react-redux";
import { RepleAreaDiv } from "../../../Style/RepleCSS";

function CommentArea(props) {
  const user = useSelector((state) => state.user);

  return (
    <RepleAreaDiv>
      {user.accessToken && <CommentUpload cafePostId={props.cafePostId} />}
      <CommentList cafePostId={props.cafePostId} />
    </RepleAreaDiv>
  );
}

export default CommentArea;
