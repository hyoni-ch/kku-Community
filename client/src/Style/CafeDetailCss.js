import styled from "@emotion/styled";

const PostDiv = styled.div`
  padding-top: 1rem;
  padding-bottom: 1rem;
  max-width: 960px;
  margin: 0 auto !important;
  @media (max-width: 960px) {
    width: 90%
  }
`;

const SpinnerDiv = styled.div`
  width: 100%;
  height: calc(100vh - 2rem);
  display: flex;
  align-content: center;
  align-items: center;
  justify-content: center;
`;

const Post = styled.div`
  width: 100%;
  height: auto;
  background: #ffffff;
  display: flex;
  padding: 30px 20px;
  border-radius: 15px;
  box-shadow: 0px 19px 38px rgba(0, 0, 0, 0.03),
    0px 15px 12px rgba(0, 0, 0, 0.1);
  p {
    margin-bottom: 0px;
  }
  img {
    width: 500px;
    height: 500px;
    line-height: 500px;
  }
  @media (max-width: 1280px) {
    display: block;
    img {
      width: 100%;
    }
  }
`;

const TextDiv = styled.div`
  text-align: center;
  margin: 0 auto;
  width: 100%;
  .heart {
    font-size: 1.3rem;
    margin-right: 20px;
    text-align: right;
    cursor: pointer;
  }
`;

const Text = styled.div`
  display: flex;
  width: 90%;
  margin: 0 auto;
  height: auto;
  line-height: 60px;
  border-bottom: 1px solid lightgray;
`;

const Title = styled.div`
  font-weight: bold;
  width: 25%;
 
`;

const Content = styled.div`
  width: 75%;
  white-space: pre-line;
  }
`;

const BtnDiv = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  margin: 20px 0;
  button {
    border-radius: 15px;
    padding: 5px 10px;
    font-weight: bold;
    border: 1px solid black;
    &.edit {
      background-color: white;
      color: black;
      border: 1px solid black;
      margin-left: 10px;
      &:hover {
        background-color: black;
        color: white;
      }
    }
    &.delete {
      margin-left: 10px;
      background-color: #E2CBB7;
      color: white;
      border: 1px solid #E2CBB7;
      &:hover {
        background-color: white;
        color: #E2CBB7;
        border: 1px solid #E2CBB7;
      }
    }
  }
`;

export {PostDiv, SpinnerDiv, Post, BtnDiv, Text, TextDiv, Title, Content};