import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { ChangeFlagAction } from "../../../store/actions/changeFlagAction";
import ConfirmationModal from "../../static/confirmModal";
import { Link } from "react-router-dom/cjs/react-router-dom";

const AdminPropertyRowComp = (props) => {
  const dispatch = useDispatch();

  const flag = useSelector((state) => state.Flag.flag);

  const property = props.property;
  const storedAuthToken = localStorage.getItem("authToken");

  const [showModal, setShowModal] = useState(false);

  const handleShowDeleteConfirm = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  // const handelDeleteButton = () => {
  //   handleCloseModal();
  //   console.log(user.id);
  //   console.log(storedAuthToken);
  //   try {
  //     const response = axios
  //       .delete(`http://127.0.0.1:8000/api/users/resources/${user.id}`, {
  //         headers: {
  //           Authorization: `Token ${storedAuthToken}`,
  //         },
  //       })
  //       .then((res) => console.log(res));
  //     window.location.reload();
  //   } catch (error) {
  //     console.log(error);
  //   }

  //   // .then((res) => dispatch(RefreshUserDataAction(res.data.user)));
  // };

  const handelDeleteButton = async () => {
    handleCloseModal();
    console.log(storedAuthToken);
    try {
      axios
        .delete(`http://127.0.0.1:8000/api/properties/${property.id}`, {
          headers: {
            Authorization: `Token ${storedAuthToken}`,
          },
        })
        .then((res) => console.log(res))
        .then(() => {
          props.refreshPage();
        });
    } catch (error) {
      console.log(error);
    }

    // .then((res) => dispatch(RefreshUserDataAction(res.data.user)));
  };

  return (
    <>
      <tr>
        <th scope="row"> </th>
        <td>
          <span className="fw-bold">{property.id}</span>{" "}
        </td>
        <td>{property.title} </td>
        <td> {property.seller.user_name}</td>
        <td>{property.price} </td>
        <td>{property.location} </td>
        <td>{property.offers.length} </td>
        <td>{property.created_at} </td>
        <td>{property.type} </td>

        <td>
          {" "}
          {property.state === "live" ? (
            <div className="text-success">Live</div>
          ) : (
            <div className="text-danger">Sold</div>
          )}
        </td>

        <td>
          <Link to={`/EditPropertyAd/${property.id}`} className="bg-body">
            <i className="pt-2 fa-solid fa-pen-to-square"></i>
          </Link>
        </td>
        <td className="">
          <button className="bg-body">
            <i
              onClick={handleShowDeleteConfirm}
              className="pt-2 fa-solid fa-trash"
              style={{ color: "#ff0f0f" }}
            ></i>
          </button>
        </td>
      </tr>
      <ConfirmationModal
        show={showModal}
        onHide={handleCloseModal}
        onConfirm={handelDeleteButton}
        body={"Are you sure you want to delete this property ?"}
      />
    </>
  );
};
export default AdminPropertyRowComp;
