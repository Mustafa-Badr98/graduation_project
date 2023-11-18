import React, { useEffect, useState } from "react";
import axios from "axios";
import ConfirmationModal from "./confirmModal";
import { useDispatch } from "react-redux";
import { GetCurrentUserAction } from "../../store/actions/getCurrentUser";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const OfferComp = (props) => {
  const token = localStorage.getItem("authToken");

  const localOffer = props.offer;

  const dispatch = useDispatch();
  const history = useHistory();

  const [showModalReject, setShowModalReject] = useState(false);
  const [showModalAccept, setShowModalAccept] = useState(false);

  const handleShowReject = () => {
    setShowModalReject(true);
  };

  const handleCloseModalReject = () => {
    setShowModalReject(false);
  };

  const handleShowAccept = () => {
    setShowModalAccept(true);
  };

  const handleCloseModalAccept = () => {
    setShowModalAccept(false);
  };

  const handelAcceptOffer = () => {
    console.log("Accepted");
    handleCloseModalAccept();
    axios
      .get(`http://127.0.0.1:8000/api/accept_offer/${localOffer.id}`, {
        headers: {
          Authorization: `Token ${token}`,
        },
      })
      .then((res) => {
        dispatch(GetCurrentUserAction(token));
        history.push("/userAds");
      });
  };

  const handelRejectOffer = () => {
    console.log("Rejected");
    handleCloseModalReject();
    axios
      .delete(`http://127.0.0.1:8000/api/reject_offer/${localOffer.id}`, {
        headers: {
          Authorization: `Token ${token}`,
        },
      })
      .then((res) => {
        window.location.reload();
        console.log(res);
      });
  };

  return (
    <div
      style={{ height: "50px" }}
      className="bg-dark rounded text-light mt-3 row"
    >
      <div className="col-3 fs-5 pt-2">
        Offered By {localOffer.user.user_name}
      </div>
      <div className="col-3 fs-5 pt-2">
        Date: {localOffer.created_at.slice(0, 10)}
      </div>
      <div className="col-3 fs-5 pt-2">
        offered price <span className="text-success">{localOffer.price} </span>{" "}
        EGP
      </div>
      <div className="col-1 pt-1">
        <button
          // onClick={() => handelAcceptOffer(offer.id)}
          onClick={handleShowAccept}
          className="btn btn-success "
        >
          Accept{" "}
        </button>
      </div>
      <div className="col-1 pt-1">
        <button
          // onClick={() => handelRejectOffer(offer.id)}
          onClick={handleShowReject}
          className="btn btn-danger "
        >
          Reject{" "}
        </button>
      </div>
      <ConfirmationModal
        show={showModalReject}
        onHide={handleCloseModalReject}
        onConfirm={handelRejectOffer}
        body={"Are you sure you want to reject this offer ?"}
      />

      <ConfirmationModal
        show={showModalAccept}
        onHide={handleCloseModalAccept}
        onConfirm={handelAcceptOffer}
        body={"Are you sure you want to accept this offer ?"}
      />
    </div>
  );
};

export default OfferComp;
