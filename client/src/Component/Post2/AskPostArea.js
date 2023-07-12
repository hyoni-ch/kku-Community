import React, { useState, useEffect } from "react";
import AskDetail from "./AskDetail";
import { Spinner } from "react-bootstrap";
import { SpinnerDiv } from "../../Style/PostDetailCss";
import { useParams } from "react-router-dom";
import axios from "axios";
import RepleArea from "../Reple/RepleArea";

function AskPostArea() {
  const [PostInfo, setPostInfo] = useState({});
  const [Flag, setFlag] = useState(false);

  let params = useParams();

  useEffect(() => {
    let body = {
      postNum: params.postNum
    };
    axios
      .post("/api/ask/detail", body)
      .then(response => {
        if (response.data.success) {
          setPostInfo(response.data.ask);
          setFlag(true);
        }
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      {Flag ? (
        <>
          <AskDetail PostInfo={PostInfo} />
          <RepleArea postId={PostInfo._id} />
        </>
      ) : (
        <SpinnerDiv>
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </SpinnerDiv>
      )}
    </div>
  );
}

export default AskPostArea;
