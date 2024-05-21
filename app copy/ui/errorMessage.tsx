// components/ErrorMessage.js
import "../globals.css";
import React from 'react';
import PropTypes from 'prop-types';

const ErrorMessage = ({ message, type }) => {
  if (!message) return null;

  const getStyles = (type) => {
    switch (type) {
      case 'warning':
        return { container: { ...baseStyles.container, borderColor: 'orange', borderLeftColor: '#f8911b', backgroundColor: '#fff3e6', color: 'orange' }, message: baseStyles.message };
      case 'info':
        return { container: { ...baseStyles.container, borderColor: 'blue', borderLeftColor: '#f8911b', backgroundColor: '#e6f3ff', color: 'blue' }, message: baseStyles.message };
      case 'error':
      default:
        return { container: { ...baseStyles.container, borderColor: 'red', borderLeftColor: '#f8911b', backgroundColor: '#ffe6e6', color: 'red' }, message: baseStyles.message };
    }
  };

  const styles = getStyles(type);

  return (
    <div style={styles.container}>
      <p style={styles.message}>{message}</p>
    </div>
  );
};

ErrorMessage.propTypes = {
  message: PropTypes.string,
  type: PropTypes.oneOf(['error', 'warning', 'info']),
};

ErrorMessage.defaultProps = {
  type: 'error',
};

const baseStyles = {
  container: {
    padding: '10px',
    margin: '10px auto',
    border: '1px solid',
    borderLeft: '5px solid',
    borderRadius: '2px',
    fontSize: '14px',
    width: '370px',
    position: 'fixed',
    bottom: '30px',
  },
  message: {
    margin: 0,
  },
};

export default ErrorMessage;
