import React, { useEffect, useState } from "react";
import PayPalButton from "../static/paypalButton";
import PayPalButton2 from "../static/paypalButton2";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import axios from "axios";
import UserCard from "../static/UserCard";
import MyFooter from "../static/footer";

export default function PaymentPage() {
  const containerStyle = {
    textAlign: "center",
    maxWidth: "700px",
    margin: "",
    padding: "30px",
    border: "1px solid #ddd",
    borderRadius: "8px",
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
    marginBottom: "20px",
  };

  const imageStyle = {
    width: "100%",
    height: "auto",
    borderRadius: "8px",
    marginBottom: "10px",
  };

  const titleStyle = {
    fontSize: "24px",
    fontWeight: "bold",
    marginBottom: "10px",
  };

  const descriptionStyle = {
    fontSize: "16px",
    marginBottom: "10px",
  };

  const infoStyle = {
    fontSize: "14px",
    marginBottom: "10px",
  };

  const amountStyle = {
    fontSize: "20px",
    fontWeight: "bold",
    color: "green",
  };

  const param = useParams();
  const [property, setProperty] = useState({});
  const [offer, setOffer] = useState({});
  const [checkout, setCheckOut] = useState(false);
  const getProperty = () => {
    axios
      .get(`http://127.0.0.1:8000/api/properties/${param.property_id}`)
      .then((res) => {
        console.log(res.data.data);
        setProperty(res.data.data);
      })
      .catch((err) => console.log(err));
  };

  const getOffer = () => {
    axios
      .get(`http://127.0.0.1:8000/api/get_offer/${param.offer_id}/`)
      .then((res) => {
        console.log(res.data.data);
        setOffer(res.data.data);
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    getProperty();
    getOffer();
  }, []);
  return (
    <>
      <div className="container">
        <h1>Payment Page</h1>
        {Object.keys(property).length > 0 && (
          <>
            <div className="offset-2 my-5" style={containerStyle}>
              <img
                style={imageStyle}
                src={`http://localhost:8000${property.images[0].image}`}
                alt="Property Image"
              />
              <div style={titleStyle}>{property.title}</div>
              <div style={descriptionStyle}>{property.description}</div>
              <div style={infoStyle}>
                <p>
                  <strong>Size:</strong> {property.number_of_bedrooms} bedrooms,{" "}
                  {property.number_of_bathrooms} bathrooms
                </p>
                <p>
                  <strong>Location:</strong> {property.location}, City
                </p>
              </div>
              <div style={amountStyle}>Offer Amount: {offer.price} EGP</div>
            </div>
          </>
        )}
        <div className="App">
          {checkout ? (
            <div className="offset-2">
              <PayPalScriptProvider
                options={{
                  "client-id":
                    "Aewv9q6Zg0wC0HzHzC_Fr_VOseZLAAXxtJQhWlaOg-gLlLvoPQrU_8a_1wzgTfdij8rGdJr8YkVvxwBa",
                }}
              >
                <PayPalButton2 offerID={offer.id} amount={offer.price/50} />
              </PayPalScriptProvider>

              <button
                className="btn btn-primary mt-5"
                onClick={() => {
                  setCheckOut(false);
                }}
              >
                Seal Deal
              </button>
            </div>
          ) : (
            <button
              className="btn btn-primary"
              onClick={() => {
                setCheckOut(true);
              }}
            >
              Seal Deal
            </button>
          )}
        </div>
      </div>
      <MyFooter />
    </>
  );
}
