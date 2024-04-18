import React, { useState, useEffect, useRef } from 'react';
import { useAppContext } from '../AppContext';
import api from '../api'; // api 인스턴스 불러오기

function Profile() {
  const { userEmail } = useAppContext();
  const [contactData, setContactData] = useState(null);
  const mapContainer = useRef(null); // 지도를 표시할 컨테이너

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get(`/api/contact/${userEmail}`);
        setContactData(response.data);
        displayMap(response.data.address); // 주소를 바탕으로 지도 표시
      } catch (error) {
        console.error('Error fetching data: ', error);
      }
    };

    if (userEmail) {
      fetchData();
    }
  }, [userEmail]);

  const displayMap = (address) => {
    if (!address) {
      console.error('No address provided');
      return;
    }
  
    window.kakao.maps.load(() => {
      const geocoder = new window.kakao.maps.services.Geocoder();
      geocoder.addressSearch(address, (result, status) => {
        if (status === window.kakao.maps.services.Status.OK) {
          const coords = new window.kakao.maps.LatLng(result[0].y, result[0].x);
          if (!mapContainer.current.firstChild) { // 지도가 이미 로드된 경우를 체크
            const map = new window.kakao.maps.Map(mapContainer.current, {
              center: coords,
              level: 3,
            });
            new window.kakao.maps.Marker({ map, position: coords });
          }
        } else {
          console.error('Failed to load the map: ', status);
        }
      });
    });
  };
  

  if (!contactData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Profile</h1>
      <p>Name: {contactData.name}</p>
      <p>Phone: {contactData.hp}</p>
      <p>Fax: {contactData.fax}</p>
      <p>Address: {contactData.address}</p>
      <p>Website URL: {contactData.url}</p>
      <p>Product: {contactData.produc}</p>
      <p>Rank: {contactData.rank}</p>
      <p>Company Name: {contactData.cname}</p>
      <p>Image URL: {contactData.imgurl}</p>
      {/* ... 기존 프로필 데이터 표시 코드 ... */}
      <div ref={mapContainer} style={{ width: '100%', height: '400px' }}></div> {/* 지도 컨테이너 */}
    </div>
  );
}

export default Profile;
