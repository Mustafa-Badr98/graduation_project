import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import MyFooter from "../static/footer";
import axios from "axios";
import { useDispatch } from "react-redux";
import { GetCurrentUserAction } from "../../store/actions/getCurrentUser";
import { useHistory } from "react-router-dom/cjs/react-router-dom";
import ConfirmationModal from "../static/confirmModal";
import OfferComp from "../static/offerComp";

const OffersPage = () => {
  const history = useHistory();
  const token = localStorage.getItem("authToken");
  const param = useParams();
  const [property_offers, setPropertyOffers] = useState([]);

  const dispatch = useDispatch();

  const getPropertyOffers = () => {
    try {
      axios
        .get(`http://127.0.0.1:8000/api/get_property_offers/${param.id}`, {
          headers: {
            Authorization: `Token ${token}`,
          },
        })
        .then((res) => {
          console.log(res.data.offers);
          setPropertyOffers(res.data.offers);
        });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPropertyOffers();
  }, []);
  return (
    <>
      <div className="container mt-5 vh-100">
        <h2>Property offers:</h2>
        {property_offers.length > 0 && property_offers ? (
          <div className="mt-5">
            {" "}
            {property_offers.map((offer, index) => (
              <OfferComp offer={offer} key={index} />
            ))}
          </div>
        ) : (
          <>
            <div className="alert alert-warning mt-5 fs-1" role="alert">
              Your property has no offer yet!
            </div>
          </>
        )}
      </div>
      <MyFooter />
    </>
  );
};

export default OffersPage;
