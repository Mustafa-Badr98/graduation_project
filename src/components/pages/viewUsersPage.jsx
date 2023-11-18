import React, { useEffect, useRef, useState } from "react";
import cx from "classnames";
import Rate from "rsuite/Rate";
import "rsuite/dist/rsuite.min.css";
import RatePopUpComponent from "../static/RatepopUpcomp";
import viewUsersPageStyles from "./viewUsersPage.module.css";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom/cjs/react-router-dom.min";
import axios from "axios";
import MyFooter from "../static/footer";
import no_profile_pic from "../../assets/images/no-profile.jpg";
import { ChangeFlagAction } from "../../store/actions/changeFlagAction";
import CommentComp from "../static/commentComp";

const texts = {
  0: "No rate yet",
  1: "Useless",
  2: "Poor",
  3: "Ok",
  4: "Good",
  5: "Excellent",
};
let idCount = 0;

const ViewUsersPage = () => {
  const param = useParams();
  const dispatch = useDispatch();

  const userInSession = useSelector((state) => state.currentUSER.currentUser);
  const authToken = useSelector((state) => state.TokenStore.token);
  const [property_owner, setPropertyOwner] = useState({});
  const [user_comments, setUserComments] = useState([]);
  const flag = useSelector((state) => state.Flag.flag);
  const [ratingsUserIds, setRatingsUsersIds] = useState([]);

  const get_user_data = () => {
    axios
      .get(`http://127.0.0.1:8000/api/user/email/${param.user_email}`)
      .then((res) => {
        console.log(res.data.data);
        setPropertyOwner(res.data.data);
        setUserComments(res.data.data.comments);
        setRatingsUsersIds(
          res.data.data.ratings.map((rating) => parseInt(rating.rated_by, 10))
        );
      })

      .catch((err) => {
        console.log(err);
      });
  };

  const [comment, setComment] = useState("");
  const commentSectionChangeHandler = (e) => {
    setComment(e.target.value);
    console.log(e.target.value);
  };

  const addCommentHandler = () => {
    let data = {
      user: property_owner.id,
      content: comment,
    };

    if (userInSession) {
      axios
        .post("http://127.0.0.1:8000/api/add_comment/", data, {
          headers: {
            Authorization: `Token ${authToken}`,
          },
        })
        .then((res) => {
          // setFlag(flag + 1);
          dispatch(ChangeFlagAction(flag + 1));
          console.log(flag);
          console.log(res.data.comment);
        });
    } else {
      alert("You should login first to leave a comment.");
    }
  };

  const deleteCommentHandler = (cID) => {
    console.log(cID);
    const con = window.confirm("do you want to delete your comment ?");
    if (con) {
      console.log(authToken);
      axios
        .delete(`http://127.0.0.1:8000/api/delete_comment/${cID}`, {
          headers: {
            Authorization: `Token ${authToken}`,
          },
        })
        .then((res) => {
          console.log(res);
          // setFlag(flag + 1);
          dispatch(ChangeFlagAction(flag + 1));

          console.log(flag);
        });
    } else {
      alert("delete canceled");
    }
  };

  useEffect(() => {
    get_user_data();
  }, [flag]);

  const [hoverValue, setHoverValue] = useState(2);
  return (
    <>
      <div style={{ minHeight: "1100px" }} className="container">
        <main
          className={cx(viewUsersPageStyles["main-content"], "p-5")}
          role="main"
        >
          <div className={cx(viewUsersPageStyles.row, "mb-4")}>
            <div className="col-md-12">
              <div className={viewUsersPageStyles.card}>
                <div style={{ height: "10vh" }}></div>
                <div className={viewUsersPageStyles["card-user-profile"]}>
                  <div className={viewUsersPageStyles["profile-page-left"]}>
                    <div className={viewUsersPageStyles.row}>
                      <div className="col-lg-12 mb-4">
                        <div className="ms-5 mb-4 fs-4 fw-bold">
                          {property_owner.user_name}
                        </div>
                        <div
                          className={cx(
                            viewUsersPageStyles["profile-picture"],
                            viewUsersPageStyles["profile-picture-lg"],
                            "bg-gradient",
                            "bg-primary",
                            "mb-4"
                          )}
                        >
                          {property_owner.profile_pic ? (
                            <>
                              <img
                                src={`http://localhost:8000${property_owner.profile_pic}`}
                                alt="user-profile"
                                width="144"
                                height="144"
                              />
                            </>
                          ) : (
                            <>
                              <img
                                src={no_profile_pic}
                                alt="no-user-profile"
                                width="144"
                                height="144"
                                className="bg-body"
                              />
                            </>
                          )}
                        </div>
                        {property_owner.id === userInSession.id ? (
                          <></>
                        ) : Object.keys(userInSession).length > 0 ? (
                          <>
                            <div className="d-flex justify-content-around ">
                              {ratingsUserIds.includes(userInSession.id) ? (
                                <>
                                  <RatePopUpComponent
                                    title="Edit Rate"
                                    user={property_owner}
                                  />
                                </>
                              ) : (
                                <>
                                  <RatePopUpComponent
                                    title="Give Rate"
                                    user={property_owner}
                                  />
                                </>
                              )}
                            </div>
                          </>
                        ) : (
                          <></>
                        )}
                      </div>
                      <div className="col-sm-8">
                        <span className="fs-5 fw-bold">Live Ads :</span>

                        {Object.keys(property_owner).length > 0 ? (
                          <>
                            <span className="ms-2 fs-5 fw-bold">
                              {property_owner.properties_owned.length}{" "}
                            </span>
                          </>
                        ) : (
                          <></>
                        )}
                      </div>
                      <div className="col-sm-6">
                        <span className="fs-5 fw-bold">Sold :</span>

                        {Object.keys(property_owner).length > 0 ? (
                          <>
                            <span className="ms-2 fs-5 fw-bold">
                              {property_owner.deals_sold.length}{" "}
                            </span>
                          </>
                        ) : (
                          <></>
                        )}
                      </div>
                    </div>
                    <hr />
                    <h5>
                      <i
                        className={cx(
                          viewUsersPageStyles["batch-icon"],
                          viewUsersPageStyles["batch-icon-user-alt-add-2"]
                        )}
                      ></i>
                      Overall Rate
                    </h5>
                    <div
                      className={cx(
                        viewUsersPageStyles["profile-page-block-outer"],
                        "clearfix"
                      )}
                    >
                      {Object.keys(property_owner).length > 0 ? (
                        <>
                          <div
                            style={{
                              display: "block",
                              width: 200,
                              paddingLeft: 0,
                            }}
                          >
                            <Rate
                              style={{ width: 120 }}
                              readOnly
                              value={property_owner.avg_rating}
                            />

                            <span className="fs-6 ms-2">
                              {texts[Math.round(property_owner.avg_rating)]}
                            </span>
                          </div>
                          <div>
                            number of Rates : ({property_owner.num_ratings})
                          </div>
                        </>
                      ) : (
                        <></>
                      )}
                    </div>

                    <hr />
                    <h5>
                      <i
                        className={cx(
                          viewUsersPageStyles["batch-icon"],
                          "batch-icon-image"
                        )}
                      ></i>
                      latest Ad
                    </h5>
                    {Object.keys(property_owner).length > 0 ? (
                      <>
                        <Link to={`/${property_owner.properties_owned[0].id}`}>
                          <img
                            src={`http://localhost:8000${property_owner.properties_owned[0].images[0].image}`}
                            className="img-fluid img-thumbnail mt-2"
                          />
                        </Link>
                      </>
                    ) : (
                      <></>
                    )}
                  </div>
                  <div className={viewUsersPageStyles["profile-page-center"]}>
                    <h1
                      className={viewUsersPageStyles["card-user-profile-name"]}
                    ></h1>
                    {property_owner.id === userInSession.id ? (
                      <></>
                    ) : (
                      <>
                        <div className={viewUsersPageStyles["comment-block"]}>
                          {/* comment input */}
                          <div className="form-group">
                            <textarea
                              className="form-control"
                              id="comment-textarea"
                              rows="2"
                              placeholder="Leave your comment here..."
                              name="comment-section"
                              value={comment}
                              onChange={commentSectionChangeHandler}
                            ></textarea>
                            <div
                              className={cx(
                                viewUsersPageStyles["media-feed-control"],
                                "clearfix"
                              )}
                            >
                              {/* here should do the logic for adding a comment */}
                              {Object.keys(userInSession).length > 0 ? (
                                <>
                                  {" "}
                                  <button
                                    onClick={addCommentHandler}
                                    type="button"
                                    className={cx(
                                      "btn",
                                      "btn-secondary",
                                      "btn-sm",
                                      viewUsersPageStyles["comment-reply"],
                                      "float-right",
                                      "waves-effect",
                                      "waves-light"
                                    )}
                                  >
                                    Post
                                  </button>
                                </>
                              ) : (
                                <> Login To Leave a comment.</>
                              )}
                            </div>
                          </div>
                        </div>
                      </>
                    )}

                    <hr />
                    <ul className="list-unstyled mt-5">
                      {user_comments &&
                        user_comments.map((comment, index) => {
                          return <CommentComp key={index} comment={comment} />;
                        })}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default ViewUsersPage;
