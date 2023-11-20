import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { ChangeFlagAction } from "../../../store/actions/changeFlagAction";
import ConfirmationModal from "../../static/confirmModal";
import { Link } from "react-router-dom/cjs/react-router-dom";

const AdminUserRowComp = (props) => {
  const dispatch = useDispatch();

  const flag = useSelector((state) => state.Flag.flag);

  const user = props.user;
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
    console.log(user.id);
    console.log(storedAuthToken);
    try {
      const response = axios
        .delete(`http://127.0.0.1:8000/api/users/resources/${user.id}`, {
          headers: {
            Authorization: `Token ${storedAuthToken}`,
          },
        })
        .then((res) => console.log(res));
      refreshPage();
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
          <span className="fw-bold">{user.id}</span>{" "}
        </td>
        <td>{user.user_name} </td>
        <td>{user.email}</td>
        <td>{user.mobile_phone} </td>
        <td>{user.avg_rating} </td>
        <td>{user.properties_owned.length} </td>
        <td>
          {user.is_admin ? (
            <div className="text-success">True</div>
          ) : (
            <div className="text-danger">False</div>
          )}
        </td>
        {!user.is_admin ? (
          <>
            <td>
              <Link to={`/EditUserProfile/${user.id}`} className="bg-body">
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
          </>
        ) : (
          <>
            <td></td>
            <td></td>
          </>
        )}
      </tr>
      <ConfirmationModal
        show={showModal}
        onHide={handleCloseModal}
        onConfirm={handelDeleteButton}
        body={"Are you sure you want to delete this user ?"}
      />
    </>
  );
};
export default AdminUserRowComp;
