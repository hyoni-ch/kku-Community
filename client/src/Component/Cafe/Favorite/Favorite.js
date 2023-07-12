import React, { useState, useEffect } from "react";
import axios from "axios";
import { BsHeart, BsHeartFill } from "react-icons/bs";
import { useSelector } from "react-redux";

function Favorite(props) {
  const cafePostId = props.cafePostId;
  const userFrom = props.userFrom;
  const name = props.CafePostInfo.name;
  const address = props.CafePostInfo.address;
  const image = props.CafePostInfo.image;

  const [FavoriteNumber, setFavoriteNumber] = useState(0);
  const [Favorited, setFavorited] = useState(false);

  const user = useSelector(state => state.user);

  let body = {
    userFrom: userFrom,
    cafePostId: cafePostId,
    name: name,
    address: address,
    image: image
  };

  useEffect(() => {
    axios
      .post("/api/favorite/favoriteNumber", body)
      .then(response => {
        if (response.data.success) {
          setFavoriteNumber(response.data.FavoriteNumber);
        } else {
          alert("찜 숫자 정보를 가져오는데 실패했습니다.");
        }
      })
      .catch(err => {
        console.log(err);
      });

    axios
      .post("/api/favorite/favorited", body)
      .then(response => {
        if (response.data.success) {
          setFavorited(response.data.Favorited);
        } else {
          alert("찜 여부 정보를 가져오는데 실패했습니다.");
        }
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  const onClickFavorite = () => {
    if (Favorited) {
      axios
        .post("/api/favorite/removeFromFavorite", body)
        .then(response => {
          if (response.data.success) {
            setFavoriteNumber(FavoriteNumber - 1);
            setFavorited(!Favorited);
          } else {
            alert("리스트에서 지우는 걸 실패했습니다.");
          }
        })
        .catch(err => {
          console.log(err);
        });
    } else {
      axios
        .post("/api/favorite/addToFavorite", body)
        .then(response => {
          if (response.data.success) {
            setFavoriteNumber(FavoriteNumber + 1);
            setFavorited(!Favorited);
          } else {
            alert("리스트에서 추가하는 걸 실패했습니다.");
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  };

  return (
    <div>
      {!user.accessToken ? null : (
        <>
          <button
            onClick={onClickFavorite}
            style={{ border: "none", background: "none", marginRight: "4px" }}
          >
            {Favorited ? <BsHeartFill /> : <BsHeart />}
          </button>
          {FavoriteNumber}
        </>
      )}
    </div>
  );
}

export default Favorite;
