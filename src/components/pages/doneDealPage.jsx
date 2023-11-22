import React, { useEffect, useState } from "react";
import MyFooter from "../static/footer";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import no_profile_pic from "../../assets/images/no-profile.jpg";
import { useTranslation } from "react-i18next";

const DoneDealPage = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.currentUSER.currentUser);
  const [user_deals, setUserDeals] = useState([]);
  const [isShowingSold, setIsShowingSold] = useState(true);

  const showSoldButtonHandler = () => {
    setUserDeals(user.deals_sold);
    setIsShowingSold(true);
  };

  const showBoughtButtonHandler = () => {
    setUserDeals(user.deals_bought);
    setIsShowingSold(false);
  };
  useEffect(() => {
    if (user) {
      setUserDeals(user.deals_sold);
      console.log(user_deals);
    }
  }, [user]);
  return (
    <>
      {Object.keys(user).length === 0 ? (
        <> </>
      ) : (
        <>
          {" "}
          <div
            style={{ backgroundColor: "rgb(244, 244, 244)" }}
            className="container-fluid pt-5"
          >
            <div className="container">
              <div className="row">
                <div style={{ minHeight: "75vh" }} className="col-8 bg-body ">
                  <div className="fs-5 fw-bold mt-3 ">{t("Done Deals")} </div>
                  <hr style={{ height: "2px", color: "black" }} />

                  <div className="row pb-1">
                    <div className="offset-7 col-2">
                      <span
                        onClick={showSoldButtonHandler}
                        className="w-100 btn btn-secondary"
                      >
                        {t("Sold")}
                      </span>
                    </div>
                    <div className="col-2">
                      <span
                        onClick={showBoughtButtonHandler}
                        className="w-100 btn btn-secondary"
                      >
                        {t("Bought")}
                      </span>
                    </div>
                  </div>

                  {user_deals &&
                    user_deals.map((deal, index) => {
                      return (
                        <div
                          key={index}
                          className="ms-3 mt-2"
                          style={{ minWidth: "827px !important" }}
                        >
                          <div className="col-12 px-0 row d-flex border mb-2">
                            <div
                              className="col-2 text-center d-flex justify-content-center"
                              style={{
                                height: "90px",
                                background: "var(--bg-second-bg)",
                              }}
                            >
                              {isShowingSold ? (
                                <>
                                  {" "}
                                  <div
                                    className="col-12 m-auto text-center px-0 kufi font-3"
                                    style={{
                                      fontWeight: "bold",
                                      color: "#28a745",
                                    }}
                                  >
                                    + {deal.price} {t("EGP")}
                                  </div>
                                </>
                              ) : (
                                <>
                                  {" "}
                                  <div
                                    className="col-12 m-auto text-center px-0 kufi font-3"
                                    style={{
                                      fontWeight: "bold",
                                      color: "rgb(226, 113, 113)",
                                    }}
                                  >
                                    - {deal.price} {t("EGP")}
                                  </div>
                                </>
                              )}
                            </div>
                            <div
                              className="col pt-1 my-auto text-center border-right"
                              style={{ height: "100%" }}
                            >
                              <div className="col-12 font-small">
                                {t("Deal")} : #{deal.id}
                                <span>
                                  {" "}
                                  {deal.property.title} {t("at")}{" "}
                                  {t(deal.property.location)}
                                </span>
                              </div>
                              {isShowingSold ? (
                                <>
                                  <div className="col-12 font-small">
                                    {t("Type Of Transaction")} : {t("Sell")}
                                  </div>
                                </>
                              ) : (
                                <>
                                  <div className="col-12 font-small">
                                    {t("Type Of Transaction")} : {t("Buy")}
                                  </div>
                                </>
                              )}

                              <div className="col-12 font-small">
                                {t("State")}: {t("Done")}
                              </div>
                              <div className="col-12 font-small">
                                {t("Done At")} : {deal.created_at}{" "}
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                </div>

                <div className="col-4">
                  <div className="offset-4 mt-5" style={{ width: "150px" }}>
                    {user.profile_pic ? (
                      <>
                        <img
                          src={`http://localhost:8000${user.profile_pic}`}
                          alt=""
                          srcSet=""
                          style={{
                            width: "100%",
                            borderRadius: "50%",
                            padding: "10px",
                            height: "100%",
                          }}
                        />
                      </>
                    ) : (
                      <>
                        <img
                          src={no_profile_pic}
                          alt=""
                          srcSet=""
                          style={{
                            width: "100%",
                            borderRadius: "50%",
                            padding: "10px",
                            height: "100%",
                          }}
                        />
                      </>
                    )}
                  </div>

                  <h5
                    className="text-center pt-2 mb-0 mb-md-5 pb-0 mt-2"
                    style={{ fontSize: "20px", color: "var(--bg-font-4)" }}
                  >
                    {user.user_name}
                  </h5>
                </div>
              </div>
            </div>

            <div className="container mt-5">
              <div className="row"></div>
            </div>

            <MyFooter />
          </div>
        </>
      )}
    </>
  );
};

export default DoneDealPage;
