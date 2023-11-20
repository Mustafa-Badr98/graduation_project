import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { ChangeFlagAction } from "../../../store/actions/changeFlagAction";
import ConfirmationModal from "../../static/confirmModal";

const AdminOfferRowComp = (props) => {
  const dispatch = useDispatch();

  const flag = useSelector((state) => state.Flag.flag);

  const offer = props.offer;
  const storedAuthToken = localStorage.getItem("authToken");

  const [showModal, setShowModal] = useState(false);

  const handleShowDeleteConfirm = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handelDeleteButton = () => {
    handleCloseModal();
    console.log(storedAuthToken);
    try {
      axios
        .delete(`http://127.0.0.1:8000/api/admin_delete_offer/${offer.id}`, {
          headers: {
            Authorization: `Token ${storedAuthToken}`,
          },
        })
        .then((res) => console.log(res))
        .then(() => {
          refreshPage();
        });
    } catch (error) {
      console.log(error);
    }

    // .then((res) => dispatch(RefreshUserDataAction(res.data.user)));
  };

  function refreshPage() {
    window.location.reload();
  }
  return (
    <>
      <tr>
        <th scope="row"></th>
        <td>
          <span className="fw-bold">{offer.id}</span>{" "}
        </td>
        <td>{offer.user.user_name} </td>
        <td> {offer.property.title}</td>
        <td>
          <span className="text-danger">{offer.price} </span> EGP
        </td>
        <td>{offer.created_at} </td>
        <td> </td>
        <td> </td>

      
        <td className="">

        </td>
      </tr>
      <ConfirmationModal
        show={showModal}
        onHide={handleCloseModal}
        onConfirm={handelDeleteButton}
        body={"Are you sure you want to delete this offer ?"}
      />
    </>
  );
};
export default AdminOfferRowComp;
