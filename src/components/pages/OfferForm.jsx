import React, { useState } from 'react';

const OfferForm = () => {
  const [price, setPrice] = useState('');

  const handlePriceChange = (e) => {
    setPrice(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Offer submitted:', price);

  };

  return (
    <form onSubmit={handleSubmit} className='my-3'>
      <label>
        Price:
        <input type="text" value={price} onChange={handlePriceChange} className='form-control' />
      </label>
      <button className='my-2 btn btn-info' type="submit">Submit Offer</button>
    </form>
  );
};

export default OfferForm;