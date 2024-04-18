import React, { useContext } from 'react';
import { useAppContext } from '../AppContext';

function Copyright() {
  const { appName } = useAppContext();

  return (
    <p className='copyright'>
      Copyright © 2023 {appName} All Rights Reserved.
    </p>
  );
}

export default Copyright;
