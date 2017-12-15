
import React from 'react';

import AuthModal from './AuthModal';
import SettingsModal from './SettingsModal';

const Modal = (props) => {
  switch (props.type) {
    case 'auth':
      return <AuthModal {...props} />;
    case 'settings':
      return <SettingsModal {...props} />;
    default:
      return null;
  }
};

export default Modal;
