import React from 'react'
import { ListDiv, ListItem } from "../../Style/ListCss.js";
import '../../App.css';
import { Link } from "react-router-dom";

import moment from "moment";
import "moment/locale/ko";


function List(props) {

  const SetTime = (a, b) => {
    if (a !== b) {
      return moment(b).format("YYYY년 MMMM Do, hh:mm") + "(수정됨)";
    } else {
      return moment(a).format("YYYY년 MMMM Do, hh:mm");
    }
  };
    
  return (
    <div>
      <ListDiv>
        {props.PostList.map((post, idx) => {
          return (
            <ListItem key={idx}>
              <Link to={`/post/${post.postNum}`}>
                <h3 className="title"> {post.title} </h3>
                <p className="area"> [{post.area}] </p>
                <div className="author">
                  <p> {post.author.displayName} </p>
                  <p className="time">
                    {SetTime(post.createdAt, post.updatedAt)}
                  </p> 
                </div>
                <p> {post.content} </p>
              </Link>
            </ListItem>
          )
        })}
      </ListDiv>
    </div>
  )
}

export default List
