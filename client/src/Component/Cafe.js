import React, { useState, useEffect } from 'react'
import '../App.css';
import CafeList from '../Component/Cafe/CafePost/CafeList';
import axios from "axios";
import { DropdownButton, Dropdown } from "react-bootstrap";
import { GNBDiv, FooterDiv } from "../Style/CommuCSS.js";
import { HiSearch } from "react-icons/hi"


function Cafe() {
  const [CafePostList, setCafePostList] = useState([]);
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
      .post("/api/cafe/list", body)
      .then((response) => {
        if (response.data.success) {
          setCafePostList([...CafePostList, ...response.data.cafePostList]);
          setSkip(Skip + response.data.cafePostList.length);
          if (response.data.cafePostList.length < 5) {
            setLoadMore(false);
          }
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getCafePostList = () => {
    setSkip(0);

    let body = {
      sort: Sort,
      searchTerm: SearchTerm,
      skip: 0,
    };

    axios
      .post("/api/cafe/list", body)
      .then((response) => {
        if (response.data.success) {
          setCafePostList([...response.data.cafePostList]);
          setSkip(response.data.cafePostList.length);
          if (response.data.cafePostList.length < 6) {
            setLoadMore(false);
          }
          if (response.data.cafePostList.length == 0) {
            setLoadMore(false);
          }
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getCafePostList();
  }, [Sort]);

  const SearchHandler = () => {
    getCafePostList();
  };

  return (
    <div className="main"> 
      <GNBDiv>
        <div className="search">
          <input
            type="text"
            value={SearchTerm}
            placeholder="지역"
            onChange={(e) => setSearchTerm(e.currentTarget.value)}
            onKeyDown={(e) => {
              if (e.keyCode === 13) SearchHandler();
            }}
          />
          <button onClick={() => SearchHandler()}>
            <HiSearch />
          </button>
        </div>

        <DropdownButton variant="outline-secondary" title={Sort}>
          <Dropdown.Item onClick={() => setSort("최신순")}>
            최신순
          </Dropdown.Item>
          <Dropdown.Item onClick={() => setSort("리뷰순")}>
            리뷰순
          </Dropdown.Item>
        </DropdownButton>
      </GNBDiv>
      <CafeList CafePostList={CafePostList} />
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

export default Cafe