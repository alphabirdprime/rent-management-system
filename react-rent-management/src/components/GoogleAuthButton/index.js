import React from 'react';
import PropTypes from 'prop-types';
import { GoogleLogin } from '@react-oauth/google';
import { Button } from '@mui/material';
import './styles.scss';

function GoogleAuthButton({
  label,
  color,
  onSuccess,
  onFailure,
}) {
  return (
    <div className="google-auth-button">
      <Button variant="contained" color={color} className="google-auth-button-label">
        {label}
      </Button>
      <div className="google-auth-button-overlay">
        <GoogleLogin
          onSuccess={(response) => onSuccess(response.credential)}
          onError={onFailure}
          useOneTap={false}
          type="standard"
          theme="outline"
          size="large"
          text="signin_with"
          shape="rectangular"
        />
      </div>
    </div>
  );
}

GoogleAuthButton.propTypes = {
  label: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  onSuccess: PropTypes.func.isRequired,
  onFailure: PropTypes.func.isRequired,
};

export default GoogleAuthButton;
