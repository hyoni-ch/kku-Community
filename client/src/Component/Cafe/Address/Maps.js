/*global kakao*/
import React, { useState } from "react";
import { Map, MapMarker } from "react-kakao-maps-sdk";

function Maps() {
  const [state, setState] = useState({
    // 지도의 초기 위치
    center: { lat: 37.49676871972202, lng: 127.02474726969814 },
    // 지도 위치 변경시 panto를 이용할지(부드럽게 이동)
    isPanto: true
  });
  const [searchAddress, SetSearchAddress] = useState();

  // 주소 입력후 검색 클릭 시 원하는 주소로 이동
  const SearchMap = () => {
    const geocoder = new kakao.maps.services.Geocoder();

    let callback = function(result, status) {
      if (status === kakao.maps.services.Status.OK) {
        const newSearch = result[0];
        setState({
          center: { lat: newSearch.y, lng: newSearch.x }
        });
      }
    };
    geocoder.addressSearch(`${searchAddress}`, callback);
  };

  const handleSearchAddress = e => {
    SetSearchAddress(e.target.value);
  };

  return (
    <div>
      <div>
        <input
          onChange={handleSearchAddress}
          placeholder="주소를 입력해주세요"
        ></input>
        <button onClick={SearchMap}>검색</button>
      </div>

      <Map
        center={state.center}
        isPanto={state.isPanto}
        style={{
          // 지도의 크기
          width: "90%",
          height: "100vh"
        }}
        level={3} // 지도의 확대 레벨
      />
    </div>
  );
}

export default Maps;
