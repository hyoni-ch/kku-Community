import React from "react";
import { ListDiv, ListItem } from "../../Style/PicListCss.js";
import "../../App.css";
import { Link } from "react-router-dom";
import moment from "moment";
import "moment/locale/ko";

function PicList(props) {
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
        {props.PostList.map((pic, idx) => {
          return (
            <ListItem key={idx}>
              <Link to={`/pic/${pic.postNum}`}>
                <div className="contentBox">
                  <div className="img">
                    <img src={`http://localhost:5000/${pic.image}`} />
                  </div>
                  <div className="content">
                    <h3 className="title"> {pic.title} </h3>
                    <p className="content" style={{ whiteSpace: "pre-line" }}>
                      {" "}
                      {pic.content}{" "}
                    </p>
                  </div>
                </div>
                <div className="author">
                  <p> {pic.author.displayName} </p>
                  <p className="time">
                    {SetTime(pic.createdAt, pic.updatedAt)}
                  </p>
                </div>
              </Link>
            </ListItem>
          );
        })}
      </ListDiv>
    </div>
  );
}

export default PicList;
