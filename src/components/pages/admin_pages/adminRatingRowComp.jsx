import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { ChangeFlagAction } from "../../../store/actions/changeFlagAction";
import ConfirmationModal from "../../static/confirmModal";

const AdminRatingRowComp = (props) => {
  const dispatch = useDispatch();

  const flag = useSelector((state) => state.Flag.flag);

  const rating = props.rating;
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
        .delete(`http://127.0.0.1:8000/api/rating/admin/delete/${rating.id}`, {
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
        <th scope="row"> </th>
        <td>
          <span className="fw-bold">{rating.id}</span>{" "}
        </td>
        <td>{rating.user} </td>
        <td> {rating.rated_by}</td>
        <td>
          <span className="text-danger">{rating.rating} </span>
        </td>
        <td>{rating.created_at} </td>
        <td> </td>
        <td> </td>

        <td className="">
          <button className="bg-body">
            <i
              className="pt-2 fa-solid fa-trash"
              style={{ color: "#ff0f0f" }}
              onClick={handleShowDeleteConfirm}
            ></i>
          </button>
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
export default AdminRatingRowComp;
