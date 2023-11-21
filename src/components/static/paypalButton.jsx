// src/components/PayPalButton.js

import React from 'react';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';

const PayPalButton = () => {
  return (
    <PayPalScriptProvider options={{ 'client-id': 'Aewv9q6Zg0wC0HzHzC_Fr_VOseZLAAXxtJQhWlaOg-gLlLvoPQrU_8a_1wzgTfdij8rGdJr8YkVvxwBa' }}>
      <PayPalButtons />
    </PayPalScriptProvider>
  );
};

export default PayPalButton;
