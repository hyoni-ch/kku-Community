import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useSelector } from 'react-redux'
import Table from 'react-bootstrap/Table';
import '../../../App.css'
import { TiDeleteOutline } from 'react-icons/ti'
import { Link } from "react-router-dom";

function FavoritePage() {

    const user = useSelector((state) => state.user);

    const userFrom = user.uid;

    const [Favorites, setFavorites] = useState([]);

    useEffect(() => {
      fetchFavoriteCafe();
    },[]);
        

    const fetchFavoriteCafe = () => {
      axios.post("/api/favorite/getFavoriteCafe", { userFrom: userFrom })
      .then((response) => {
        if (response.data.success) {
            setFavorites(response.data.favorites);
        } else {
            alert('찜 정보를 가져오는데 실패했습니다');
        }
      })
      .catch((err) => {
        console.log(err);
      })

      
    }

    const onClickDelete = (cafePostId, userFrom) => {
      let body = {
        cafePostId,
        userFrom,
      }

      axios.post("/api/favorite/removeFromFavorite", body)
        .then((response) => {
          if(response.data.success) {
            alert("찜이 해제되었습니다.");
            fetchFavoriteCafe();
          }
          else {
            alert("리스트에서 지우는데 실패했습니다.");
          }
        })
    }

    


  return (
    <div className="main">
      <p style={{marginTop: '3vh', marginLeft: '5vh', marginBottom: '3vh', fontWeight: 'bold', fontSize: '1.3rem'}}>찜 목록</p>

      <Table striped style={{textAlign: 'center'}}>
        <thead>
          <tr>
            <th>이미지</th>
            <th>카페이름</th>
            <th>카페위치</th>
            <th></th>  
          </tr>
        </thead>
        <tbody>
          {Favorites.map((favorite, idx) => (
            <tr key={idx}>
              <td style={{width: '25%',}}>
                <Link to={`/cafe/${favorite.cafePostId}`}>
                  <img
                    src={`http://localhost:5000/${favorite.image}`}
                    alt=""
                    style={{width: "50%", height: "15vh"}}
                  />
                </Link>
              </td>
              <td style={{width: '20%'}}>
                {favorite.name}
              </td>
              <td style={{ width: '45%',}}>
                {favorite.address}
              </td>
              
              <td>
                <button
                  onClick={() => onClickDelete(favorite.cafePostId ,favorite.userFrom)}
                  style={{
                    border: 'none',
                    background: 'none',
                    marginRight: '4px',
                    fontSize: '1.5rem'
                  }}
                > <TiDeleteOutline /> </button>
              </td>
            </tr>  
          ))}
        </tbody>
      </Table>
      
    </div>
  )
}

export default FavoritePage
