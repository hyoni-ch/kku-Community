import React, { useState, useEffect } from 'react'
import CafeDetail from './CafeDetail'
import { Spinner } from "react-bootstrap";
import { SpinnerDiv } from "../../../Style/PostDetailCss"
import { useParams } from "react-router-dom"
import axios from "axios"
import CommentArea from '../Comment/CommentArea';

function CafePostArea() {

    const [CafePostInfo, setCafePostInfo] = useState({});
    const [Flag, setFlag] = useState(false);

    let params = useParams();

    useEffect(() => {
      let body = {
        cafePostNum : params.cafePostNum
      }
      axios
        .post("/api/cafe/detail", body)
        .then((response) => {
          if(response.data.success) {
            setCafePostInfo(response.data.cafe);
            setFlag(true);
          }
        }).catch((err) => {
            console.log(err);
        });
      }, []);

  return (
    <div>
        {Flag ? (
          <>
            <CafeDetail CafePostInfo={CafePostInfo} cafePostId={CafePostInfo.cafePostNum} />
            <CommentArea cafePostId={CafePostInfo._id} />
          </>
          
        ) : (
          <SpinnerDiv>
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </SpinnerDiv>  
        )}
               
      
    </div>
  )
}

export default CafePostArea
