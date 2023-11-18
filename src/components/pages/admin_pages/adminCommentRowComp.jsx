import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { ChangeFlagAction } from "../../../store/actions/changeFlagAction";
import ConfirmationModal from "../../static/confirmModal";

const AdminCommentRowComp = (props) => {
  const dispatch = useDispatch();

  const flag = useSelector((state) => state.Flag.flag);

  const comment = props.comment;
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
        .delete(
          `http://127.0.0.1:8000/api/delete_comment/admin/${comment.id}`,
          {
            headers: {
              Authorization: `Token ${storedAuthToken}`,
            },
          }
        )
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
          <span className="fw-bold">{comment.id}</span>{" "}
        </td>
        <td>{comment.user.user_name} </td>
        <td> {comment.commented_by.user_name}</td>
        <td>{comment.content} </td>
        <td>{comment.created_at} </td>
        <td> </td>
        <td> </td>

        <td className="">
          <button className="bg-body">
            <i
              onClick={handleShowDeleteConfirm}
              className="pt-1 fa-solid fa-trash"
              style={{ color: "#ff0f0f" }}
            ></i>
          </button>
        </td>
      </tr>
      <ConfirmationModal
        show={showModal}
        onHide={handleCloseModal}
        onConfirm={handelDeleteButton}
        body={"Are you sure you want to delete this comment ?"}
      />
    </>
  );
};
export default AdminCommentRowComp;
