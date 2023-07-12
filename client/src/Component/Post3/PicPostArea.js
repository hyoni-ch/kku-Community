import React, { useState, useEffect } from "react";
import PicDetail from "./PicDetail";
import { Spinner } from "react-bootstrap";
import { SpinnerDiv } from "../../Style/PostDetailCss";
import { useParams } from "react-router-dom";
import axios from "axios";

function PicPostArea() {
  const [PostInfo, setPostInfo] = useState({});
  const [Flag, setFlag] = useState(false);

  let params = useParams();

  useEffect(() => {
    let body = {
      postNum: params.postNum
    };
    axios
      .post("/api/pic/detail", body)
      .then(response => {
        if (response.data.success) {
          setPostInfo(response.data.pic);
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
          <PicDetail PostInfo={PostInfo} />
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

export default PicPostArea;
