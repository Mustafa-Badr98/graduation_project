import React, { useEffect, useRef, useState } from "react";
import cx from "classnames";
import Rate from "rsuite/Rate";
import "rsuite/dist/rsuite.min.css";
import RatePopUpComponent from "../static/RatepopUpcomp";
import viewUsersPageStyles from "./viewUsersPage.module.css";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom/cjs/react-router-dom.min";
import axios from "axios";
import MyFooter from "../static/footer";
import no_profile_pic from "../../assets/images/no-profile.jpg";

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

  const userInSession = useSelector((state) => state.currentUSER.currentUser);
  const authToken = useSelector((state) => state.TokenStore.token);
  const [property_owner, setPropertyOwner] = useState({});
  const [user_comments, setUserComments] = useState([]);

  const get_user_data = () => {
    axios
      .get(`http://127.0.0.1:8000/api/user/email/${param.user_email}`)
      .then((res) => {
        console.log(res.data.data);
        setPropertyOwner(res.data.data);
        setUserComments(res.data.data.comments);
        console.log(property_owner);
      })

      .catch((err) => {
        console.log(err);
      });
  };

  const [reviews, setReviews] = useState([
    {
      RID: 100,
      username: "User1",
      email: "user1@example.com",
      photoPath: "https://bootdey.com/img/Content/avatar/avatar1.png",
      comment: "Great seller! Highly recommended.",
      numOfLikes: 20,
      timestamp: "2023-10-12T12:30:00Z",
    },
    {
      RID: 101,
      username: "User2",
      email: "user2@example.com",
      photoPath: "https://bootdey.com/img/Content/avatar/avatar2.png",
      comment: "Excellent service and fast shipping.",
      numOfLikes: 44,
      timestamp: "2023-10-12T13:45:00Z",
    },
    {
      RID: 102,
      username: "User3",
      email: "user3@example.com",
      photoPath: "https://bootdey.com/img/Content/avatar/avatar3.png",
      comment: "Product quality is outstanding!",
      numOfLikes: 12,
      timestamp: "2023-10-12T14:15:00Z",
    },
    {
      RID: 103,
      username: "User4",
      email: "user4@example.com",
      photoPath: "https://bootdey.com/img/Content/avatar/avatar4.png",
      comment: "Will buy again. A+++",
      numOfLikes: 99,
      timestamp: "2023-10-12T15:00:00Z",
    },
    {
      RID: 104,
      username: "User5",
      email: "user5@example.com",
      photoPath: "https://bootdey.com/img/Content/avatar/avatar5.png",
      comment: "Responsive and helpful seller.",
      numOfLikes: 24,
      timestamp: "2023-10-12T15:45:00Z",
    },
    {
      RID: 105,
      username: "User6",
      email: "user6@example.com",
      photoPath: "https://bootdey.com/img/Content/avatar/avatar6.png",
      comment: "Fast delivery and well-packaged.",
      numOfLikes: 66,
      timestamp: "2023-10-12T16:30:00Z",
    },
    {
      RID: 106,
      username: "User7",
      email: "user7@example.com",
      photoPath: "https://bootdey.com/img/Content/avatar/avatar7.png",
      comment: "Highly satisfied with the purchase.",
      numOfLikes: 98,
      timestamp: "2023-10-12T17:15:00Z",
    },
  ]);

  const [reviewComment, setReviewComment] = useState("");
  const commentSectionChangeHandler = (e) => {
    setReviewComment(e.target.value);
    console.log(e.target.value);
  };

  const addCommentHandler = (e) => {
    if (reviewComment.length !== 0) {
      if (userInSession) {
        idCount += 1;
        let now = new Date();
        let formattedTimestamp = now.toLocaleDateString("en-US");
        let newReview = {
          RID: idCount,
          username: userInSession.username,
          email: userInSession.email,
          photoPath: "https://bootdey.com/img/Content/avatar/avatar1.png",
          comment: reviewComment,
          numOfLikes: 0,
          timestamp: formattedTimestamp,
        };

        setReviews([newReview, ...reviews]);
      } else {
        alert("please log in first to leave a comment");
      }

      console.log("not empty");
    } else {
      console.log("empty");
    }
  };

  const deleteReviewHandler = (rID) => {
    console.log(rID);
    const con = window.confirm("do you want to delete this comment ?");
    if (con) {
      let holderArray = reviews.filter((comment) => comment.RID !== rID);
      setReviews(holderArray);
    }
  };

  useEffect(() => {
    get_user_data();
  }, []);

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
                        <div className="d-flex justify-content-around ">
                          <div
                            style={{ height: "2.5em" }}
                            className={cx(
                              "btn",
                              "btn-secondary",
                              "btn-gradient",
                              "waves-effect",
                              "waves-light",
                              "mt-2"
                            )}
                            href="#"
                          >
                            Contact
                          </div>
                          <RatePopUpComponent />
                        </div>
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
                              defaultValue={property_owner.avg_rating}
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
                    <div className={viewUsersPageStyles["comment-block"]}>
                      <div className="form-group">
                        <textarea
                          className="form-control"
                          id="comment-textarea"
                          rows="2"
                          placeholder="Leave your comment here..."
                          name="comment-section"
                          value={reviewComment}
                          onChange={commentSectionChangeHandler}
                        ></textarea>
                        <div
                          className={cx(
                            viewUsersPageStyles["media-feed-control"],
                            "clearfix"
                          )}
                        >
                          {/* here should do the logic for adding a comment */}
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
                        </div>
                      </div>
                    </div>
                    <hr />
                    <ul className="list-unstyled mt-5">
                      {user_comments &&
                        user_comments.map((comment, index) => {
                          return (
                            <div key={index}>
                              <li className={viewUsersPageStyles.media}>
                                <div
                                  className={cx(
                                    viewUsersPageStyles["profile-picture"],
                                    "bg-gradient",
                                    "bg-primary",
                                    "mb-4"
                                  )}
                                >
                                  <img
                                    src={`http://localhost:8000${comment.commented_by.profile_pic}`}
                                    width="44"
                                    height="44"
                                  />
                                </div>
                                <div
                                  className={viewUsersPageStyles["media-body"]}
                                >
                                  <div
                                    className={cx(
                                      viewUsersPageStyles["media-title"],
                                      "mt-0",
                                      "mb-1"
                                    )}
                                  >
                                    <a href="#">
                                      {comment.commented_by.user_name}{" "}
                                    </a>{" "}
                                    <small> {comment.created_at}</small>
                                    {/* here is the comment content */}
                                  </div>
                                  {comment.content}
                                  <div
                                    className={
                                      viewUsersPageStyles["media-feed-control"]
                                    }
                                  >
                                    <a href="#">
                                      <i
                                        className={cx(
                                          viewUsersPageStyles["batch-icon"],
                                          "batch-icon-heart-full"
                                        )}
                                      ></i>{" "}
                                      Like ({comment.numOfLikes})
                                    </a>

                                    <a href="#">
                                      <i className="batch-icon batch-icon-flag"></i>{" "}
                                      Report
                                    </a>
                                    <a
                                      href="#"
                                      onClick={() => {
                                        deleteReviewHandler(comment.RID);
                                      }}
                                    >
                                      <i className="batch-icon batch-icon-flag"></i>{" "}
                                      Delete
                                    </a>
                                  </div>
                                </div>
                              </li>
                            </div>
                          );
                        })}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
      <MyFooter />
    </>
  );
};

export default ViewUsersPage;
