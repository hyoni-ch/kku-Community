import React, { useState, useEffect, useRef } from "react";
import { RepleContentDiv, RepleUploadDiv } from "../../../Style/RepleCSS.js";
import { useSelector } from "react-redux";
import Avatar from "react-avatar";

import axios from "axios";
import moment from "moment";
import "moment/locale/ko";

function CommentContent(props) {
  const [ModalFlag, setModalFlag] = useState(false);
  const [EdifFlag, setEdifFlag] = useState(false);
  const [Comment, setComment] = useState(props.comment.comment);

  const user = useSelector(state => state.user);
  const ref = useRef();
  useOnClickOutside(ref, () => setModalFlag(false));

  const SetTime = (a, b) => {
    if (a !== b) {
      return moment(b).format("YYYY년 MMMM Do, hh:mm") + "(수정됨)";
    } else {
      return moment(a).format("YYYY년 MMMM Do, hh:mm");
    }
  };

  const SubmitHandler = e => {
    e.preventDefault();
    let body = {
      uid: user.uid,
      comment: Comment,
      cafePostId: props.comment.cafePostId,
      commentId: props.comment._id
    };

    axios.post("/api/comment/edit", body).then(response => {
      if (response.data.success) {
        alert("댓글 수정이 성공하였습니다.");
      } else {
        alert("댓글 수정이 실패하였습니다.");
      }
      return window.location.reload();
    });
  };

  const DeleteHandler = e => {
    e.preventDefault();
    if (window.confirm("정말로 삭제하시겠습니까?")) {
      let body = {
        commentId: props.comment._id,
        cafePostId: props.comment.cafePostId
      };
      axios
        .post("/api/comment/delete", body)
        .then(response => {
          if (response.data.success) {
            alert("댓글이 삭제되었습니다.");
            window.location.reload();
          }
        })
        .catch(err => {
          alert("댓글 삭제에 실패하였습니다.");
        });
    }
  };

  return (
    <RepleContentDiv>
      <div className="author">
        <div className="userInfo">
          <Avatar
            size="30"
            round={true}
            src={props.comment.author.photoURL}
            style={{ border: "1px solid #c6c6c6" }}
          />
          <p>{props.comment.author.displayName}</p>
        </div>
        {props.comment.author.uid === user.uid && (
          <div className="modalControl">
            <span onClick={() => setModalFlag(true)}>···</span>
            {ModalFlag && (
              <div className="modalDiv" ref={ref}>
                <p
                  onClick={() => {
                    setEdifFlag(true);
                    setModalFlag(false);
                  }}
                >
                  수정
                </p>
                <p className="delete" onClick={e => DeleteHandler(e)}>
                  삭제
                </p>
              </div>
            )}
          </div>
        )}
      </div>
      <p className="time">
        {SetTime(props.comment.createdAt, props.comment.updatedAt)}
      </p>
      {EdifFlag ? (
        <RepleUploadDiv>
          <form>
            <input
              type="text"
              value={Comment}
              onChange={e => {
                setComment(e.currentTarget.value);
              }}
            />
            <button
              onClick={e => {
                SubmitHandler(e);
              }}
            >
              등록
            </button>
          </form>
          <div className="cancel">
            <button
              onClick={e => {
                e.preventDefault();
                setEdifFlag(false);
              }}
            >
              취소
            </button>
          </div>
        </RepleUploadDiv>
      ) : (
        <p>{props.comment.comment}</p>
      )}
    </RepleContentDiv>
  );
}

function useOnClickOutside(ref, handler) {
  useEffect(() => {
    const listener = event => {
      if (!ref.current || ref.current.contains(event.target)) {
        return;
      }
      handler(event);
    };
    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);
    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [ref, handler]);
}

export default CommentContent;
