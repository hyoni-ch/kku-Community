import React from 'react'
import { ListDiv, ListItem } from "../../Style/ListCss.js";
import '../../App.css';
import { Link } from "react-router-dom";

import moment from "moment";
import "moment/locale/ko";


function AskList(props) {

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
        {props.PostList.map((ask, idx) => {
          return (
            <ListItem key={idx}>
              <Link to={`/ask/${ask.postNum}`}>
                <h3 className="title"> {ask.title} </h3>
                <div className="author">
                  <p> {ask.author.displayName} </p>
                  <p className="time">
                    {SetTime(ask.createdAt, ask.updatedAt)}
                  </p>
                </div>
                
                <p> {ask.content} </p>
              </Link>
            </ListItem>
          )
        })}
      </ListDiv>
    </div>
  )
}

export default AskList
