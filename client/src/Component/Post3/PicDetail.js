import React from 'react'
import "../../App.css"
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";

import { PostDiv, Post, BtnDiv } from "../../Style/PostDetailCss.js"

import { useSelector } from 'react-redux';
import moment from "moment";
import "moment/locale/ko";

function PicDetail(props) {
    let params = useParams();
    let navigate = useNavigate();

    const user = useSelector((state) => state.user);

    const SetTime = (a, b) => {
      if (a !== b) {
        return moment(b).format("YYYY년 MMMM Do, hh:mm") + "(수정됨)";
      } else {
        return moment(a).format("YYYY년 MMMM Do, hh:mm");
      }
    };


    const DeleteHandler = () => {
      if(window.confirm("정말로 삭제하시겠습니까?")) {
        let body = {
          postNum : params.postNum  
        }
        axios
          .post("/api/pic/delete", body)
          .then((response) => {
            if(response.data.success) {
              alert("게시글이 삭제되었습니다.");
              navigate("/commuPic");
            }
          }).catch((err) => {
              alert("게시글 삭제에 실패하였습니다.");
          });
      }
    }

    const ListHandler = (e) => {
      e.preventDefault();
      navigate("/commuPic");
    }

  return (
    <div className="main">

      <PostDiv>
        
        <Post>
          <h2>{props.PostInfo.title}</h2>

          <div className="author">
            <p>{props.PostInfo.author.displayName}</p>

            <p className="time">
              {SetTime(props.PostInfo.createdAt, props.PostInfo.updatedAt)}
            </p>
          </div>
          
                               
          {props.PostInfo.image ? (
            <img
              src={`http://localhost:5000/${props.PostInfo.image}`}
              alt=""
              style={{width: "100%", height: "auto"}}
            />
          ) : null}
          <p className="content" style={{marginTop:'2vh', fontSize: '1.1rem', whiteSpace: 'pre-line',}} >{props.PostInfo.content}</p>
        </Post>


        
          <BtnDiv>

            <button onClick={(e) => ListHandler(e)}>목록</button>

            {user.uid === props.PostInfo.author.uid && (
              <>
              <Link to={`/picEdit/${props.PostInfo.postNum}`}>
                <button className="edit">수정</button>
              </Link>
          
              <button className="delete" onClick={() => DeleteHandler()}>삭제</button>
              </>
            )}
          </BtnDiv>
          

      </PostDiv>
      
    </div>
  )
}

export default PicDetail
