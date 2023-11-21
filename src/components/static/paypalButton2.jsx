import React from "react";
import {
  PayPalScriptProvider,
  PayPalButtons,
  usePayPalScriptReducer,
} from "@paypal/react-paypal-js";

const PayPalButton2 = () => {
  const [{ isPending }] = usePayPalScriptReducer();

  const createOrder = (data, actions) => {
    // Add your order details here
    return actions.order.create({
      purchase_units: [
        {
          amount: {
            value: "10.00", // Replace with the total amount
            currency_code: "USD", // Replace with the currency code
          },
        },
      ],
    });
  };

  const onApprove = (data, actions) => {
    return actions.order.capture().then(function (details) {
      // Handle the successful capture
      console.log("Capture result", details);
    });
  };

  return (
    <PayPalScriptProvider
      options={{
        "client-id":
          "Aewv9q6Zg0wC0HzHzC_Fr_VOseZLAAXxtJQhWlaOg-gLlLvoPQrU_8a_1wzgTfdij8rGdJr8YkVvxwBa",
      }}
    >
      <PayPalButtons
        createOrder={createOrder}
        onApprove={onApprove}
        disabled={isPending}
      />
    </PayPalScriptProvider>
  );
};

export default PayPalButton2;
