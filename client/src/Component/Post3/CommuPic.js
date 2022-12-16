import React, { useState, useEffect } from 'react'
import '../../App.css';
import { Link } from "react-router-dom";
import PicList from './PicList';
import axios from "axios";
import { GNBDiv, FooterDiv } from "../../Style/CommuCSS.js";
import { HiSearch } from "react-icons/hi"


function CommuPic() {
  

  const [PostList, setPostList] = useState([]);
  const [Sort, setSort] = useState("최신순");
  const [SearchTerm, setSearchTerm] = useState("");
  const [Skip, setSkip] = useState(0);
  const [LoadMore, setLoadMore] = useState(true);

  const getLoadMore = () => {
    let body = {
      sort: Sort,
      searchTerm: SearchTerm,
      skip: Skip,
    };
    axios
      .post("/api/pic/list", body)
      .then((response) => {
        if (response.data.success) {
          setPostList([...PostList, ...response.data.postList]);
          setSkip(Skip + response.data.postList.length);
          if (response.data.postList.length < 3) {
            setLoadMore(false);
          }
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getPostList = () => {
    setSkip(0);

    let body = {
      sort: Sort,
      searchTerm: SearchTerm,
      skip: 0,
    };

    axios
      .post("/api/pic/list", body)
      .then((response) => {
        if (response.data.success) {
          setPostList([...response.data.postList]);
          setSkip(response.data.postList.length);
          if (response.data.postList.length < 3) {
            setLoadMore(false);
          }
          if (response.data.postList.length == 0) {
            setLoadMore(false);
          }
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };



  useEffect(() => {
    getPostList();
  }, [Sort]);

  const SearchHandler = () => {
    getPostList();
  };
  return (
    <div className="main clear">
      <p className="listTitle">추억해요</p>
      <Link to="/PicUpload"><button className="writeBtn">글쓰기</button></Link>

      <GNBDiv>
        <div className="search">
          <input
            type="text"
            value={SearchTerm}
            placeholder="제목+내용"
            onChange={(e) => setSearchTerm(e.currentTarget.value)}
            onKeyDown={(e) => {
              if (e.keyCode === 13) SearchHandler();
            }}
          />
          <button onClick={() => SearchHandler()}>
            <HiSearch />
          </button>
        </div>

      </GNBDiv>
      <PicList PostList={PostList} />
      {LoadMore && (
        <FooterDiv>
          <button
            style={{ marginBottom: "10vh" }}
            onClick={() => getLoadMore()}
          >
            더 불러오기
          </button>
        </FooterDiv>
      )}
    </div>
  )
}

export default CommuPic