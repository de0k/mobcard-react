import React, { useState, useEffect, useRef } from 'react';
import { useAppContext } from '../AppContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBuilding, faFax, faEnvelope, faPhone, faShare, faReply } from '@fortawesome/free-solid-svg-icons';
import api from '../api'; // api 인스턴스 불러오기

function Skin1() {
  const { userEmail } = useAppContext();
  const [contactData, setContactData] = useState(null);
  const mapContainer = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get(`/api/contact/${userEmail}`);
        setContactData(response.data);
        displayMap(response.data.address);
      } catch (error) {
        console.error('Error fetching data: ', error);
      }
    };

    if (userEmail) {
      fetchData();
    }
  }, [userEmail]);

  const displayMap = (address) => {
    window.kakao.maps.load(() => {
      const geocoder = new window.kakao.maps.services.Geocoder();
      geocoder.addressSearch(address, (result, status) => {
        if (status === window.kakao.maps.services.Status.OK) {
          const coords = new window.kakao.maps.LatLng(result[0].y, result[0].x);
          const map = new window.kakao.maps.Map(mapContainer.current, {
            center: coords,
            level: 3,
          });
          new window.kakao.maps.Marker({ map, position: coords });
        }
      });
    });
  };

  if (!contactData) {
    return <div>Loading...</div>;
  }

  return (
    <div className='HYUN view_frame skin1'>
      <div className='top_text_v1'>
        <p>내 프로필</p>
      </div>
      <div className='box1 mainBox'>
        <figure className='img'>
          <img src={contactData.imgurl || '/img/sample.jpg'} alt='Profile'/>
        </figure>
        <div className='textBox'>
          <div className='inner'>
            <p className='name'>
              {contactData.name}
              <small className='rank'> ({contactData.rank}) </small>
            </p>
          </div>
          <section className='followerBox'>
            <div className='follow follwer'>
              <FontAwesomeIcon className='icon' icon={faShare} /> 공유한 사람 (<span>40</span>)
            </div>
            <div className='follow follwing'>
              <FontAwesomeIcon className='icon' icon={faReply} /> 공유받은 사람 (<span>36</span>)
            </div>
          </section>
        </div>
      </div>

      <div className='box2 box'>
        <h2 className='title_v1'>
          <span>infomation</span>
        </h2>
        <div className='content_cname content'>
          <div className='inner'>
            <FontAwesomeIcon className='icon' icon={faBuilding} />
            <p className='text1'>Company</p>
          </div>
          <p className='cname text2'>
            {contactData.cname}
          </p>
        </div>
        <div className='content_phone content'>
          <div className='inner'>
            <FontAwesomeIcon className='icon' icon={faPhone} />
            <p className='text1'>phone</p>
          </div>
          <p className='hp text2'>
            {contactData.hp}
          </p>
        </div>
        <div className='content_email content'>
          <div className='inner'>
            <FontAwesomeIcon className='icon' icon={faEnvelope} />
            <p className='text1'>E-mail</p>
          </div>
          <p className='email text2'>
            {contactData.email}
          </p>
        </div>
        <div className='content_fax content'>
          <div className='inner'>
            <FontAwesomeIcon className='icon' icon={faFax} />
            <p className='text1'>Fax</p>
          </div>
          <p className='fax text2'>
            {contactData.fax}
          </p>
        </div>
      </div>

      <div className='box3 box'>
        <h2 className='title_v1'>
          <span>Introduction</span>
        </h2>
        <p className='text'>
          {contactData.produc}
        </p>
      </div>
      <div className='box4 box'>
        <h2 className='title_v1'>
          <span>Location</span>
        </h2>
        <p className='text'>
          {contactData.address}
        </p>
        <div ref={mapContainer} style={{ width: '100%', height: '400px' }} className='map'></div>
      </div>
    </div>
  );
}

export default Skin1;
