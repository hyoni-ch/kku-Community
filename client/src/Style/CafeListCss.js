import styled from "@emotion/styled";

const ListDiv = styled.div`
  padding-top: 1rem;
  padding-bottom: 1rem;
  max-width: 1280px;
  margin: 0 auto;
  @media (max-width: 1280px) {
    width: 90%;
  }
`;

const ListItem = styled.div`
  width: 30%;
  height: auto;
  min-height: 120px;
  background: #ffffff;
  border-radius: 15px;
  margin: 2vh;
  padding: 20px;
  display: inline-block;
  box-shadow: 0px 19px 38px rgba(0, 0, 0, 0.03),
    0px 15px 12px rgba(0, 0, 0, 0.1);
  img {
    margin-bottom: 2vh;
  }
  .title {
    margin-top: 10px;
    margin-bottom: 10px;
    text-align: center;
  }
  .address {
    height: 8vh;
  }
  a {
    color: black;
    text-decoration: none;
    text-align: center;
    .title {
      font-weight: bold;
    }
  }
  @media (max-width: 1280px) {
    width: 40%;
  }
  @media (max-width: 656px) {
    width: 100%;
  }
`;

const Item = styled.div`
  display: flex;
  justify-content: flex-end;
`;

export { ListDiv, ListItem, Item };
