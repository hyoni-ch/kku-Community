import React from 'react'
import "../../../App.css"
import { useNavigate } from "react-router-dom";
import { PostDiv, Post, BtnDiv, Text, TextDiv, Title, Content } from "../../../Style/CafeDetailCss.js"
import "moment/locale/ko";
import Favorite from '../Favorite/Favorite'
import { useSelector } from 'react-redux';

function CafeDetail(props) {

  const user = useSelector((state) => state.user);
  
  let navigate = useNavigate();
  const ListHandler = (e) => {
    e.preventDefault();
    navigate(-1);
  }


  return (
    <div className="main">

      <PostDiv>
        <Post>
          <img
            src={`http://localhost:5000/${props.CafePostInfo.image}`}
            alt=""
          />
          <TextDiv>
            <Text>
              <Title> </Title>
                <Content className="heart"> <Favorite CafePostInfo={props.CafePostInfo} cafePostId={props.cafePostId} userFrom={user.uid}/> </Content>
            </Text>
            <Text>
              <Title>카페이름</Title>
              <Content>{props.CafePostInfo.name}</Content>
            </Text>
            <Text>
              <Title>카페위치</Title>
              <Content>{props.CafePostInfo.address}</Content>
            </Text>
            <Text>
              <Title>영업시간</Title>
              <Content>{props.CafePostInfo.time}</Content>
              </Text>
            <Text>
              <Title>전화번호</Title>
              <Content>{props.CafePostInfo.phone}</Content>
            </Text>
            <Text>
              <Title>기타</Title>
              <Content>{props.CafePostInfo.other}</Content>
            </Text>
            
          </TextDiv>
          
        </Post>

        <BtnDiv>
          <button onClick={(e) => ListHandler(e)}>목록</button>
        </BtnDiv>
      </PostDiv>
      
    </div>
  )
}

export default CafeDetail
