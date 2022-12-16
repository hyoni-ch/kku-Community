import styled from "@emotion/styled";

const LoginDiv = styled.div`
  width: 50%;
  max-width: 360px;
  margin: 0 auto;
  margin-top: 5rem;
  form {
    width: 70%;
    padding: 20px;
    box-shadow: 0px 10px 10px rgba(0, 0, 0, 0.3),
      0px 15px 12px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
    label {
      font-weight: bold;
    }
    input {
      border-radius: 10px;
      border: 1px solid #c6c6c6;
      padding: 5px;
      margin-bottom: 10px;

      &:active,
      &:focus {
        outline: none;
      }
    }
    button {
        border-radius: 15px;
        padding: 5px 10px;
        background-color: #E2CBB7;
        color: white;
        border: 1px solid #E2CBB7;
        margin-top: 10px;
        &:hover {
          background-color: white;
          color: black;
          border: 1px solide black;
        }
    }
    @media (max-width: 756px) {
        width: 100%;
    }
  }
`;

const MyPageDiv = styled.div`
  width: 100vw;
  height: 100vh;
  form {
    margin-top: 2rem;
    width: 50%;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    label {
      margin-bottom: 2rem;
      input {
        display: none;
      }
    }
    button {
      border-radius: 15px;
      padding: 5px 10px;
      background-color: black;
      color: white;
      border: 1px solid black;
      margin-top: 10px;
      &:hover {
        background-color: white;
        color: black;
        border: 1px solid black;
      }
    }
  }
`;

export { LoginDiv, MyPageDiv };