// src/page/dashboard/Card.js
import React from 'react';
import PropTypes from 'prop-types';

const Card = ({ title, value, change }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md text-center">
      <h3 className="text-lg font-medium text-gray-600 mb-2">{title}</h3>
      <p className="text-3xl font-bold text-gray-800 mb-1">{value}</p>
      <p className="text-sm text-green-500">{change}</p>
    </div>
  );
};

Card.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  change: PropTypes.string.isRequired,
};

export default Card;