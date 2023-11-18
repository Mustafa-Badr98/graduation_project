import React, { useEffect, useState } from "react";
import axios from "axios";
import ConfirmationModal from "./confirmModal";
import { useDispatch, useSelector } from "react-redux";
import { GetCurrentUserAction } from "../../store/actions/getCurrentUser";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import no_profile_pic from "../../assets/images/no-profile.jpg";
import viewUsersPageStyles from "../pages/viewUsersPage.module.css";
import cx from "classnames";
import { ChangeFlagAction } from "../../store/actions/changeFlagAction";

const CommentComp = (props) => {
  const userInSession = useSelector((state) => state.currentUSER.currentUser);
  const authToken = useSelector((state) => state.TokenStore.token);
  const flag = useSelector((state) => state.Flag.flag);
  const localComment = props.comment;

  const [showModal, setShowModal] = useState(false);

  const handleShowDeleteConfirm = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const dispatch = useDispatch();
  const history = useHistory();

  const deleteCommentHandler = () => {
    handleCloseModal();
    axios
      .delete(`http://127.0.0.1:8000/api/delete_comment/${localComment.id}`, {
        headers: {
          Authorization: `Token ${authToken}`,
        },
      })
      .then((res) => {
        console.log(res);
        dispatch(ChangeFlagAction(flag + 1));
      });
  };

  return (
    <>
      <div className="mt-3">
        <li className={viewUsersPageStyles.media}>
          <div
            className={cx(
              viewUsersPageStyles["profile-picture"],
              "bg-gradient",
              "bg-primary",
              "mb-4"
            )}
          >
            {localComment.commented_by.profile_pic ? (
              <>
                <img
                  src={`http://localhost:8000${localComment.commented_by.profile_pic}`}
                  width="44"
                  height="44"
                />
              </>
            ) : (
              <>
                <img
                  src={no_profile_pic}
                  width="44"
                  height="44"
                  className="bg-body"
                />
              </>
            )}
          </div>
          <div className={viewUsersPageStyles["media-body"]}>
            <div
              className={cx(viewUsersPageStyles["media-title"], "mt-0", "mb-1")}
            >
              <a href="#">{localComment.commented_by.user_name} </a>{" "}
              <small> {localComment.created_at}</small>
              {/* here is the comment content */}
            </div>
            {localComment.content}
            <div className={viewUsersPageStyles["media-feed-control"]}>
              <a href="#">
                <i
                  className={cx(
                    viewUsersPageStyles["batch-icon"],
                    "batch-icon-heart-full"
                  )}
                ></i>{" "}
              </a>
              {userInSession.id === localComment.commented_by.id ? (
                <>
                  <button
                    className="btn btn-danger"
                    style={{ scale: ".7" }}
                    onClick={() => {
                      handleShowDeleteConfirm();
                    }}
                  >
                    <i className="batch-icon batch-icon-flag"></i> Delete
                  </button>
                </>
              ) : (
                <></>
              )}
            </div>
          </div>
        </li>
      </div>
      <ConfirmationModal
        show={showModal}
        onHide={handleCloseModal}
        onConfirm={deleteCommentHandler}
        body={"Are you sure you want to delete your comment ?"}
      />
    </>
  );
};

export default CommentComp;
