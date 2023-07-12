import React, { useState, useEffect } from "react";
import "../../App.css";
import { LoginDiv } from "../../Style/UserCss";
import firebase from "../../firebase";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function Register() {
  const [Name, setName] = useState("");
  const [Email, setEmail] = useState("");
  const [PW, setPW] = useState("");
  const [PWConfirm, setPWConfirm] = useState("");
  const [Flag, setFlag] = useState(false);
  const [NameCheck, setNameCheck] = useState(false);
  const [NameInfo, setNameInfo] = useState("");

  const user = useSelector(state => state.user);

  let navigate = useNavigate();

  useEffect(() => {
    if (user.accessToken) {
      alert("로그인이 되어있습니다.");
      navigate("/");
    }
  }, []);

  const RegisterFunc = async e => {
    setFlag(true);
    e.preventDefault();

    if (!(Name && Email && PW && PWConfirm)) {
      return alert("모든 값을 채워주세요!");
    }
    if (PW !== PWConfirm) {
      return alert("비밀번호와 비밀번호 확인이 일치하지 않습니다.");
    }
    if (!NameCheck) {
      return alert("닉네임 중복검사를 해주세요.");
    }

    let createdUser = await firebase
      .auth()
      .createUserWithEmailAndPassword(Email, PW);

    await createdUser.user.updateProfile({
      displayName: Name,
      photoURL:
        "https://kr.object.ncloudstorage.com/react-community/user/profile.png"
    });

    let body = {
      email: createdUser.user.multiFactor.user.email,
      displayName: createdUser.user.multiFactor.user.displayName,
      uid: createdUser.user.multiFactor.user.uid,
      photoURL:
        "https://kr.object.ncloudstorage.com/react-community/user/profile.png"
    };
    axios.post("/api/user/register", body).then(response => {
      setFlag(false);
      if (response.data.success) {
        //회원가입 성공시
        navigate("/");
        alert("로그인 되었습니다.");
      } else {
        //회원가입 실패시
        return alert("회원가입이 실패하였습니다.");
      }
    });
  };

  const NameCheckFunc = e => {
    e.preventDefault();
    if (!Name) {
      return alert("닉네임을 입력해주세요.");
    }
    let body = {
      displayName: Name
    };
    axios.post("/api/user/namecheck", body).then(response => {
      if (response.data.success) {
        if (response.data.check) {
          setNameCheck(true);
          setNameInfo("사용 가능한 닉네임입니다.");
        } else {
          setNameInfo("사용 불가능한 닉네임입니다.");
        }
      }
    });
  };

  return (
    <div className="main">
      <LoginDiv>
        <form>
          <label>닉네임</label>
          <input
            type="name"
            value={Name}
            onChange={e => setName(e.currentTarget.value)}
            disabled={NameCheck}
          />
          {NameInfo}
          <button
            onClick={e => NameCheckFunc(e)}
            style={{ marginBottom: "10px" }}
          >
            닉네임 중복검사
          </button>
          <label>이메일</label>
          <input
            type="email"
            value={Email}
            onChange={e => setEmail(e.currentTarget.value)}
          />
          <label>비밀번호</label>
          <input
            type="password"
            value={PW}
            minLength={8}
            placeholder="8글자 이상 입력해주세요"
            onChange={e => setPW(e.currentTarget.value)}
          />
          <label>비밀번호 확인</label>
          <input
            type="password"
            value={PWConfirm}
            minLength={8}
            onChange={e => setPWConfirm(e.currentTarget.value)}
          />
          <button disabled={Flag} onClick={e => RegisterFunc(e)}>
            회원가입
          </button>
        </form>
      </LoginDiv>
    </div>
  );
}

export default Register;
