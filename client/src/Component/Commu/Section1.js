import React from 'react'
import { useSelector } from "react-redux";
import { Div, Wrapper, TextDiv, Text } from './Style/Section1CSS'

function Section1() {

  const user = useSelector((state) => state.user);

  return (
    <Div>
      <Wrapper>
        <TextDiv>
          {user.accessToken ? (
            <>
            <Text style={{color: "#E2CBB7"}}>{user.displayName}님,</Text>
            <Text>함께해요에 오신 걸</Text>
            <Text>환영합니다.</Text>
            </>
          ) : (
            <>
            <Text>함께해요에 오신 걸</Text>
            <Text>환영합니다.</Text>
            </>
          ) }
        </TextDiv>
      </Wrapper>
    </Div>
  )
}

export default Section1
