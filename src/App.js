import { BrowserRouter, Switch, Route } from "react-router-dom";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import HomePage from "./components/pages/homePage";
import NotFoundPage from "./components/pages/notFoundPage";
import SignupPage from "./components/pages/signupPage";
import LoginModal from "./components/static/loginModal";
import MyNavbar from "./components/static/myNavbar";
import FavPage from "./components/pages/FavPage";
import SellPage from "./components/pages/sellPage";
import UserAdsPage from "./components/pages/userAdsPage";
import ViewSingleProductPageV2 from "./components/pages/viewSingleProductV2";
import EditProfilePage from "./components/pages/EditUserProfilePage";
import ViewUsersPage from "./components/pages/viewUsersPage";
import SearchedPropertiesPage from "./components/pages/searchedPropertiesPage";
import { useDispatch, useSelector } from "react-redux";
import { GetCurrentUserByTokenAction } from "./store/actions/getCurrentUserByToken";
import { LoginAction } from "./store/actions/loginAction";
import { IsLoadingAction } from "./store/actions/ISLoadingAction";
import { StoreToken } from "./store/actions/StoreToken";
import DoneDealPage from "./components/pages/doneDealPage";
import EditPropertyPage from "./components/pages/EditPropertyPage";
import OffersPage from "./components/pages/OffersPage";
import AdminHomePage from "./components/pages/admin_pages/adminPanelHome";
import { Redirect } from "react-router-dom";
import AdminUsersPage from "./components/pages/admin_pages/adminUsersPage";

import AdminCommentsPage from "./components/pages/admin_pages/adminCommentsPage";
import AdminPropertiesPage from "./components/pages/admin_pages/adminPropertiesPage";
import AdminOffersPage from "./components/pages/admin_pages/adminOffersPage";
import AdminRatingsPage from "./components/pages/admin_pages/adminRatingsPage";
import AdminDealsPage from "./components/pages/admin_pages/adminDealsPage";
import AddAdminUserPage from "./components/pages/admin_pages/addAdminUserPage";
import Paypal from "./components/pages/paypal";
import { useEffect, useState } from "react";
import i18n from "./components/118n";
import paymentPage from "./components/pages/paymentPage";

function App() {
  const user = useSelector((state) => state.currentUSER.currentUser);

  console.log(user);
  console.log("from app.js");

  const dispatch = useDispatch();

  const storedAuthToken = localStorage.getItem("authToken");
  if (storedAuthToken && Object.keys(user).length === 0) {
    dispatch(IsLoadingAction(true));
    console.log("Retrieved authToken:", storedAuthToken);
    dispatch(StoreToken(storedAuthToken));
    dispatch(GetCurrentUserByTokenAction(storedAuthToken));
    dispatch(LoginAction());
  } else {
    console.log("No authToken found in localStorage or there is user");
  }
  const [checkIsAdmin, setIsAdmin] = useState(false);

  const checkAdmin = () => {
    const storedUserData = localStorage.getItem("userData");
    if (storedUserData) {
      const userData = JSON.parse(storedUserData);
      if (userData.is_admin) {
        console.log(userData);
        setIsAdmin(true);
      } else {
        console.log("not admin");
      }
    } else {
      console.log("No user data in local storage");
    }
  };
  useEffect(() => {
    checkAdmin();
  }, []);

  return (
    <>
      <BrowserRouter>
        <MyNavbar />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route
            exact
            path="/searchResult"
            component={SearchedPropertiesPage}
          />
          <Route exact path="/viewUser/:user_email" component={ViewUsersPage} />
          <Route
            exact
            path="/property:id"
            component={ViewSingleProductPageV2}
          />
          <Route
            exact
            path="/payment/property:property_id/offer:offer_id"
            component={paymentPage}
          />
          <Route exact path="/MyDeals" component={DoneDealPage} />
          <Route exact path="/userAds" component={UserAdsPage} />
          <Route
            exact
            path="/EditPropertyAd/:id"
            component={EditPropertyPage}
          />
          <Route exact path="/Property/:id/Offers/" component={OffersPage} />
          <Route
            exact
            path="/EditUserProfile/:id"
            component={EditProfilePage}
          />
          <Route exact path="/Fav" component={FavPage} />
          <Route exact path="/sellProduct" component={SellPage} />I
          <Route exact path="/register" component={SignupPage} />
          {user.is_admin ? (
            <>
              <Route exact path="/admin_panel" component={AdminHomePage} />
              <Route
                exact
                path="/admin_panel/users"
                component={AdminUsersPage}
              />
              <Route
                exact
                path="/admin_panel/properties"
                component={AdminPropertiesPage}
              />
              <Route
                exact
                path="/admin_panel/comments"
                component={AdminCommentsPage}
              />
              <Route
                exact
                path="/admin_panel/offers"
                component={AdminOffersPage}
              />
              <Route
                exact
                path="/admin_panel/ratings"
                component={AdminRatingsPage}
              />
              <Route
                exact
                path="/admin_panel/deals"
                component={AdminDealsPage}
              />
              <Route
                exact
                path="/add_admin_user"
                component={AddAdminUserPage}
              />
            </>
          ) : (
            <Redirect to="/" />
          )}
          <Route path="/*" component={NotFoundPage} />
        </Switch>
      </BrowserRouter>
      <LoginModal />
    </>
  );
}

export default App;
