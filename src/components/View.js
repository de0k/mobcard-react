import React, { useState, useEffect } from 'react';
import Skin1 from './Skin1';
import Skin2 from './Skin2';
import { useAppContext } from '../AppContext';
import api from '../api'; // api 인스턴스 불러오기

function View() {
  const { userEmail } = useAppContext();
  const [selectedSkin, setSelectedSkin] = useState(null);

  useEffect(() => {
    const fetchSkin = async () => {
      try {
        const response = await api.get(`/api/get-user-skin`, { params: { email: userEmail } });
        setSelectedSkin(response.data.skin);
      } catch (error) {
        console.error('Error fetching skin data:', error);
      }
    };

    fetchSkin();
  }, [userEmail]);

  return (
    <div>
      {selectedSkin === 'skin1' && <Skin1 />}
      {selectedSkin === 'skin2' && <Skin2 />}
    </div>
  );
}

export default View;
