import React, { useEffect, useRef, useState } from "react";
import cx from "classnames";
import Rate from "rsuite/Rate";
import "rsuite/dist/rsuite.min.css";
import RatePopUpComponent from "../static/RatepopUpcomp";
import viewUsersPageStyles from "./viewUsersPage.module.css";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import axios from "axios";

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
  const userInSession = useSelector((state) => state.currentUSER.currentUser);
  const authToken = useSelector((state) => state.TokenStore.token);
  const [property_owner, setPropertyOwner] = useState({});
  console.log(authToken);
  console.log(userInSession);
  const param = useParams();
  console.log(param.user);

  const get_user_data = () => {
  // let filteredObj = {};
  // let req = axios
  //   .get(`http://127.0.0.1:8000/api/user/${param.user}`)

  //   .then((res) => (setPropertyOwner(res.data)))
  // //   .then(() => setFilteredObject(filteredObj))
  // //   .then(() => setSeller(filteredObj.seller))
  //   .then(() => console.log(property_owner))
  //   .catch((err) => {
  //     console.log(err);
  //   });
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
        alert("please log in first to leave a review");
      }

      console.log("not empty");
    } else {
      console.log("empty");
    }
  };

  const deleteReviewHandler = (rID) => {
    console.log(rID);
    const con = window.confirm("do you want to delete this review ?");
    if (con) {
      let holderArray = reviews.filter((review) => review.RID !== rID);
      setReviews(holderArray);
    }
  };

  const [hoverValue, setHoverValue] = useState(2);
  return (
    <>
      <div className="container">
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
                        <div
                          className={cx(
                            viewUsersPageStyles["profile-picture"],
                            viewUsersPageStyles["profile-picture-lg"],
                            "bg-gradient",
                            "bg-primary",
                            "mb-4"
                          )}
                        >
                          <img
                            src="https://bootdey.com/img/Content/avatar/avatar6.png"
                            width="144"
                            height="144"
                          />
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
                      <div className="col-sm-6">
                        <span className="fs-5 fw-bold">Ads :</span>

                        <span className="ms-2 fs-5">12</span>
                      </div>
                      <div className="col-sm-6">
                        <span className="fs-5 fw-bold">Sold :</span>

                        <span className="ms-2 fs-5">3</span>
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
                          defaultValue={userInSession.avg_rating}
                        />
                        <span className="fs-6 ms-2">
                          {texts[Math.round(userInSession.avg_rating)]}
                        </span>
                      </div>
                    </div>
                    <div>number of Rates : ({userInSession.num_ratings})</div>
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
                    <a href="#">
                      <img
                        src="https://en.bailypearl.com/wp-content/uploads/2021/05/villa-la-croix-valmer-vue-aerienne-2-2560x1633.jpg"
                        className="img-fluid img-thumbnail mt-2"
                      />
                    </a>
                  </div>
                  <div className={viewUsersPageStyles["profile-page-center"]}>
                    <h1
                      className={viewUsersPageStyles["card-user-profile-name"]}
                    >
                      {/* here is the seller name  */}
                      {userInSession.user_name}
                    </h1>
                    <div className={viewUsersPageStyles["comment-block"]}>
                      <div className="form-group">
                        <textarea
                          className="form-control"
                          id="comment-textarea"
                          rows="2"
                          placeholder="Enter your comment here..."
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
                          {/* here should do the logic for adding a review */}
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
                      {reviews.map((review, index) => {
                        return (
                          <>
                            <li
                              key={index}
                              className={viewUsersPageStyles.media}
                            >
                              <div
                                className={cx(
                                  viewUsersPageStyles["profile-picture"],
                                  "bg-gradient",
                                  "bg-primary",
                                  "mb-4"
                                )}
                              >
                                <img
                                  src={review.photoPath}
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
                                  <a href="#">{review.username} </a>{" "}
                                  <small> {review.timestamp}</small>
                                  {/* here is the review content */}
                                </div>
                                {review.comment}
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
                                    Like ({review.numOfLikes})
                                  </a>

                                  <a href="#">
                                    <i className="batch-icon batch-icon-flag"></i>{" "}
                                    Report
                                  </a>
                                  <a
                                    href="#"
                                    onClick={() => {
                                      deleteReviewHandler(review.RID);
                                    }}
                                  >
                                    <i className="batch-icon batch-icon-flag"></i>{" "}
                                    Delete
                                  </a>
                                </div>
                              </div>
                            </li>
                          </>
                        );
                      })}

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
                            src="https://bootdey.com/img/Content/avatar/avatar3.png"
                            width="44"
                            height="44"
                          />
                        </div>
                        <div className={viewUsersPageStyles["media-body"]}>
                          <div
                            className={cx(
                              viewUsersPageStyles["media-title"],
                              "mt-0",
                              "mb-1"
                            )}
                          >
                            <a href="#">Mona </a> <small> 1 hour ago</small>
                            {/* here is the review content */}
                          </div>
                          this is the greatest web site ever thanks to the
                          seller.
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
                              Like (4)
                            </a>
                            <a href="#">
                              <i
                                className={cx(
                                  viewUsersPageStyles["batch-icon"],
                                  "batch-icon-speech-bubble-left-tip"
                                )}
                              ></i>{" "}
                              Comment (2)
                            </a>
                            <a href="#">
                              <i className="batch-icon batch-icon-flag"></i>{" "}
                              Report
                            </a>
                          </div>
                          {/* <div className="media-body-reply-block">
                            <ul className="list-unstyled">
                              <li className="media mt-4">
                                <div
                                  className={cx(
                                    viewUsersPageStyles["profile-picture"],
                                    "bg-gradient",
                                    "bg-primary",
                                    "mb-4"
                                  )}
                                >
                                  <img
                                    src="https://bootdey.com/img/Content/avatar/avatar7.png"
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
                                      " mb-1"
                                    )}
                                  >
                                    <a href="#">John Doe</a>{" "}
                                    <small> 45 mins ago</small>
                                  </div>
                                  Cras sit amet nibh libero, in gravida nulla.
                                  Nulla vel metus scelerisque ante sollicitudin.
                                  Cras purus odio.
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
                                      Like
                                    </a>
                                    <a href="#">
                                      <i
                                        className={cx(
                                          viewUsersPageStyles["batch-icon"],
                                          "batch-icon-speech-bubble-left-tip"
                                        )}
                                      ></i>{" "}
                                      Comment
                                    </a>
                                    <a href="#">
                                      <i className="batch-icon batch-icon-flag"></i>{" "}
                                      Report
                                    </a>
                                  </div>
                                </div>
                              </li>
                              <li className="media mt-4">
                                <div
                                  className={cx(
                                    viewUsersPageStyles["profile-picture"],
                                    "bg-gradient",
                                    "bg-primary",
                                    "mb-4"
                                  )}
                                >
                                  <img
                                    src="https://bootdey.com/img/Content/avatar/avatar3.png"
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
                                      " mb-1"
                                    )}
                                  >
                                    <a href="#">John Doe</a>{" "}
                                    <small> 7 mins ago</small>
                                  </div>
                                  Cras sit amet nibh libero, in gravida nulla.
                                  Nulla vel metus scelerisque ante sollicitudin.
                                  Cras purus odio.
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
                                      Like
                                    </a>
                                    <a href="#">
                                      <i
                                        className={cx(
                                          viewUsersPageStyles["batch-icon"],
                                          "batch-icon-speech-bubble-left-tip"
                                        )}
                                      ></i>{" "}
                                      Comment
                                    </a>
                                    <a href="#">
                                      <i className="batch-icon batch-icon-flag"></i>{" "}
                                      Report
                                    </a>
                                  </div>
                                </div>
                              </li>
                              <li
                                className={cx(
                                  viewUsersPageStyles["comment-reply-block"],
                                  "mt-4"
                                )}
                              >
                                <div className={cx("form-group", "clearfix")}>
                                  <textarea
                                    className={cx(
                                      viewUsersPageStyles[
                                        "comment-reply-textarea"
                                      ],
                                      "form-control"
                                    )}
                                    rows="2"
                                    placeholder="Enter your comment here..."
                                  ></textarea>
                                  <button
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
                                    Reply
                                  </button>
                                </div>
                              </li>
                            </ul>
                          </div> */}
                        </div>
                      </li>
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
                            src="https://bootdey.com/img/Content/avatar/avatar8.png"
                            width="44"
                            height="44"
                          />
                        </div>
                        <div className={viewUsersPageStyles["media-body"]}>
                          <div
                            className={cx(
                              viewUsersPageStyles["media-title"],
                              "mt-0",
                              " mb-1"
                            )}
                          >
                            <a href="#">Lila </a> <small> 1 hour ago</small>
                          </div>
                          <a href="#">
                            <img
                              src="https://bootdey.com/img/Content/avatar/avatar1.png"
                              className="img-fluid img-thumbnail"
                            />
                          </a>
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
                              Like (57)
                            </a>
                            <a href="#">
                              <i
                                className={cx(
                                  viewUsersPageStyles["batch-icon"],
                                  "batch-icon-speech-bubble-left-tip"
                                )}
                              ></i>{" "}
                              Comment
                            </a>
                            <a href="#">
                              <i className="batch-icon batch-icon-flag"></i>{" "}
                              Report
                            </a>
                          </div>
                        </div>
                      </li>
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
