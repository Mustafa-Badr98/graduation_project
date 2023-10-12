import React, { useEffect, useRef, useState } from "react";
import cx from "classnames";
import Rate from "rsuite/Rate";
import "rsuite/dist/rsuite.min.css";
import RatePopUpComponent from "../static/RatepopUpcomp";
import viewUsersPageStyles from "./viewUsersPage.module.css";


const texts = {
  0: "No rate yet",
  1: "Useless",
  2: "Poor",
  3: "Ok",
  4: "Good",
  5: "Excellent",
};
const ViewUsersPage = () => {
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
                        <a
                          className={cx(
                            "btn",
                            "btn-secondary",
                            "btn-block",
                            "btn-gradient",
                            "waves-effect",
                            "waves-light",
                            "ms-2"
                          )}
                          href="#"
                        >
                          <span className="gradient">
                            <i
                              className={cx(
                                viewUsersPageStyles["batch-icon"],
                                viewUsersPageStyles["batch-icon-user-alt-add-2"]
                              )}
                            ></i>
                            Contact
                          </span>
                        </a>
                        <RatePopUpComponent />
                      </div>
                      <div className="col-sm-6">
                        <span className="my-0 fw-bold">Ads :</span>
                        <span className="my-0">
                          <span className="fs-5">12</span>
                        </span>
                      </div>
                      <div className="col-sm-6">
                        <span className="my-0 fw-bold">Sold :</span>
                        <span className="my-0">
                          <span className="fs-5">3</span>
                        </span>
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
                          defaultValue={hoverValue}
                        />
                        <span className="fs-6 ms-2">{texts[hoverValue]}</span>
                      </div>
                    </div>
                    <hr />
                    <h5>
                      <i
                        className={cx(
                          viewUsersPageStyles["batch-icon"],
                          "batch-icon-image"
                        )}
                      ></i>
                      Album
                    </h5>
                    <a href="#">
                      <img
                        src="https://bootdey.com/img/Content/avatar/avatar1.png"
                        className="img-fluid img-thumbnail"
                      />
                    </a>
                    <a className="float-right mt-2" href="#">
                      More
                    </a>
                  </div>
                  <div className={viewUsersPageStyles["profile-page-center"]}>
                    <h1
                      className={viewUsersPageStyles["card-user-profile-name"]}
                    >
                      John Doe
                    </h1>
                    <div className={viewUsersPageStyles["comment-block"]}>
                      <div className="form-group">
                        <textarea
                          className="form-control"
                          id="comment-textarea"
                          rows="2"
                          placeholder="Enter your comment here..."
                        ></textarea>
                        <div
                          className={cx(
                            viewUsersPageStyles["media-feed-control"],
                            "clearfix"
                          )}
                        >
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
                            Post
                          </button>
                          <a
                            href="#"
                            data-toggle="tooltip"
                            title=""
                            data-original-title="Add Picture"
                          >
                            <i
                              className={cx(
                                viewUsersPageStyles["batch-icon"],
                                "batch-icon-image"
                              )}
                            ></i>
                          </a>
                        </div>
                      </div>
                    </div>
                    <hr />
                    <ul className="list-unstyled mt-5">
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
                            src="https://bootdey.com/img/Content/avatar/avatar7.png"
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
                            <a href="#">John Doe</a> <small> 1 hour ago</small>
                          </div>
                          Cras sit amet nibh libero, in gravida nulla. Nulla vel
                          metus scelerisque ante sollicitudin. Cras purus odio.
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
                          <div className="media-body-reply-block">
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
                          </div>
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
                            src="https://bootdey.com/img/Content/avatar/avatar4.png"
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
                            <a href="#">John Doe</a> <small> 1 hour ago</small>
                          </div>
                          <a href="#">
                            <img
                              src="https://bootdey.com/img/Content/avatar/avatar3.png"
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
