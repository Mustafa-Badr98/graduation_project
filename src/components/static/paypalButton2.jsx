import React, { useState } from "react";
import {
  PayPalScriptProvider,
  PayPalButtons,
  usePayPalScriptReducer,
} from "@paypal/react-paypal-js";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useDispatch } from "react-redux";
import axios from "axios";
import { GetCurrentUserAction } from "../../store/actions/getCurrentUser";

const PayPalButton2 = (props) => {
  const token = localStorage.getItem("authToken");

  const history = useHistory();
  const dispatch = useDispatch();
  const [{ isPending }] = usePayPalScriptReducer();
  const [error, setError] = useState(null);
  const offerAmount = props.amount;
  const handleCatch = (error, errorInfo) => {
    // Catch and log errors
    console.error("Error caught by componentDidCatch:", error, errorInfo);
    // You can also send the error to a logging service

    // Update state to render the fallback UI
    setError(error);
  };

  if (error) {
    // Render fallback UI
    console.log(props.offerID);
    setTimeout(async () => {
      await axios
        .get(`http://127.0.0.1:8000/api/accept_offer/${props.offerID}`, {
          headers: {
            Authorization: `Token ${token}`,
          },
        })
        .then((res) => {
          console.log(res);
          dispatch(GetCurrentUserAction(token));
          // history.push("/userAds");
        })
        // .catch((error) => console.log(error));
        
      await history.push("/");
    }, 5000);
    return (
      <>
        <div className="alert alert-success" role="alert">
          Deal Done !
        </div>
      </>
    );
  }

  const createOrder = (data, actions) => {
    // Add your order details here
    return actions.order.create({
      purchase_units: [
        {
          amount: {
            value: offerAmount, // Replace with the total amount
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
        onError={handleCatch}
        disabled={isPending}
      />
    </PayPalScriptProvider>
  );
};

export default PayPalButton2;
