import React, { useEffect } from 'react'
import './App.css';
import { Routes, Route } from "react-router-dom";

import { useDispatch } from "react-redux";
import { loginUser, clearUser } from './Reducer/userSlice';
import firebase from "./firebase"

import Header from "./Component/Header";
import Footer from "./Component/Footer";

import Commu from "./Component/Commu";
import CommuWalk from "./Component/Post/CommuWalk";
import Upload from "./Component/Post/Upload";
import PostArea from "./Component/Post/PostArea";
import Edit from "./Component/Post/Edit";

import CommuAsk from "./Component/Post2/CommuAsk";
import AskUpload from "./Component/Post2/AskUpload";
import AskPostArea from "./Component/Post2/AskPostArea";
import AskEdit from "./Component/Post2/AskEdit";

import CommuPic from "./Component/Post3/CommuPic";
import PicUpload from "./Component/Post3/PicUpload";
import PicPostArea from "./Component/Post3/PicPostArea";
import PicEdit from "./Component/Post3/PicEdit";

import Cafe from "./Component/Cafe";
import CafeUpload from "./Component/Cafe/CafePost/CafeUpload";
import CafePostArea from "./Component/Cafe/CafePost/CafePostArea";

import FavoritePage from './Component/Cafe/Favorite/FavoritePage';


import Login from "./Component/User/Login";
import Register from "./Component/User/Register";


function App() {

  const dispatch = useDispatch();

  useEffect(() => {
    firebase.auth().onAuthStateChanged((userInfo) => {
      if(userInfo !== null) {
        dispatch(loginUser(userInfo.multiFactor.user));
      } else {
        dispatch(clearUser());
      }
    });
  }, []);

  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Commu />} />

        <Route path="/commuWalk" element={<CommuWalk />} />
        <Route path="/upload" element={<Upload />} />
        <Route path="/post/:postNum" element={<PostArea />} />
        <Route path="/edit/:postNum" element={<Edit />} />

        <Route path="/commuAsk" element={<CommuAsk />} />
        <Route path="/askUpload" element={<AskUpload />} />
        <Route path="/ask/:postNum" element={<AskPostArea />} />
        <Route path="/askEdit/:postNum" element={<AskEdit />} />

        <Route path="/commuPic" element={<CommuPic />} />
        <Route path="/picUpload" element={<PicUpload />} />
        <Route path="/pic/:postNum" element={<PicPostArea />} />
        <Route path="/picEdit/:postNum" element={<PicEdit />} />

        <Route path="/cafe" element={<Cafe />} />
        <Route path="/cafeUpload" element={<CafeUpload />} />
        <Route path="/cafe/:cafePostNum" element={<CafePostArea />} />
        
        <Route path="/favorite" element={<FavoritePage />} />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

      </Routes>
      <Footer />
    </div>
  );
}

export default App;
