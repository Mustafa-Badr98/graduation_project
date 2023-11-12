import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import OfferForm from '../pages/OfferForm';

const AdditionalOfferButton = () => {
  const [showForm, setShowForm] = useState(false);

  const handleClick = () => {
    setShowForm(true);
  };

  return (
    <div className='text-center'>
      <button onClick={handleClick} className='btn btn-success'>Make Offer</button>
      {showForm && <OfferForm />}
    </div>
  );
};

export default AdditionalOfferButton;