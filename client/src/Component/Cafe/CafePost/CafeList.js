import React from 'react'
import { ListDiv, ListItem, Item } from "../../../Style/CafeListCss.js";
import '../../../App.css';
import { Link } from "react-router-dom";
import "moment/locale/ko";
import { FaComment } from "react-icons/fa"


function CafeList(props) {

  
    
  return (
    <div className="main">
      <ListDiv>
        {props.CafePostList.map((cafe, idx) => {
          return (
            <ListItem key={idx}>
              <Link to={`/cafe/${cafe.cafePostNum}`}>
                <img
                  src={`http://localhost:5000/${cafe.image}`}
                  alt=""
                  style={{width: "100%", height: "250px"}}
                />
                <h3 className="title"> {cafe.name} </h3>
                <p className="address"> {cafe.address} </p>
              </Link>
              <Item>
                <div> <FaComment /> {cafe.commentNum} </div>
              </Item>
            </ListItem>
          )
        })}
      </ListDiv>
    </div>
  )
}

export default CafeList
