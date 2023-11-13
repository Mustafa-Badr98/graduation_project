import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import MyFooter from "../static/footer";
import axios from "axios";

const OffersPage = () => {
  const token = localStorage.getItem("authToken");
  const param = useParams();
  const [property_offers, setPropertyOffers] = useState([]);
  const [flag, setFlag] = useState(0);

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

  const handelAcceptOffer = (offerId) => {
    console.log(offerId);
    console.log("hi");
    axios
      .get(`http://127.0.0.1:8000/api/accept_offer/${offerId}`, {
        headers: {
          Authorization: `Token ${token}`,
        },
      })
      .then((res) => {
        // getPropertyOffers();
        console.log(res);
        setFlag(flag + 1);
      });
  };

  const handelRejectOffer = (offerId) => {
    console.log(offerId);
    console.log("hi");
    axios
      .delete(`http://127.0.0.1:8000/api/reject_offer/${offerId}`, {
        headers: {
          Authorization: `Token ${token}`,
        },
      })
      .then((res) => {
        getPropertyOffers();
        console.log(res);
        setFlag(flag + 1);
      });
  };

  useEffect(() => {
    getPropertyOffers();
  }, [flag]);
  return (
    <>
      <div className="container mt-5 vh-100">
        <h2>Property offers:</h2>
        {property_offers.length > 0 && property_offers ? (
          <div className="mt-5">
            {" "}
            {property_offers.map((offer, index) => (
              <div
                key={index}
                style={{ height: "50px" }}
                className="bg-dark rounded text-light mt-3 row"
              >
                <div className="col-2 fs-5 pt-2">
                  Offered By {offer.user.user_name}
                </div>
                <div className="col-3 fs-5 pt-2">on {offer.created_at}</div>
                <div className="col-3 fs-5 pt-2">
                  offer Price EGP {offer.price}
                </div>
                <div className="col-1 pt-1">
                  <button
                    onClick={() => handelAcceptOffer(offer.id)}
                    className="btn btn-success "
                  >
                    Accept{" "}
                  </button>
                </div>
                <div className="col-1 pt-1">
                  <button
                    onClick={() => handelRejectOffer(offer.id)}
                    className="btn btn-danger "
                  >
                    Reject{" "}
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <></>
        )}
      </div>
      <MyFooter />
    </>
  );
};

export default OffersPage;
