import React from "react";
import PayPalButton from "../static/paypalButton";
import PayPalButton2 from "../static/paypalButton copy";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
export default function paymentPage() {
  return (
    <div className="container">
      <h1>Payment Page</h1>
      <PayPalScriptProvider
        options={{
          "client-id":
            "Aewv9q6Zg0wC0HzHzC_Fr_VOseZLAAXxtJQhWlaOg-gLlLvoPQrU_8a_1wzgTfdij8rGdJr8YkVvxwBa",
        }}
      >
        <PayPalButton2 />
      </PayPalScriptProvider>
    </div>
  );
}
