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
import { useDispatch } from "react-redux";
import { GetCurrentUserByTokenAction } from "./store/actions/getCurrentUserByToken";
import { LoginAction } from "./store/actions/loginAction";
import { IsLoadingAction } from "./store/actions/ISLoadingAction";
import { StoreToken } from "./store/actions/StoreToken";
import DoneDealPage from "./components/pages/doneDealPage";
import EditPropertyPage from "./components/pages/EditPropertyPage";

function App() {
  const dispatch = useDispatch();

  const storedAuthToken = localStorage.getItem("authToken");
  if (storedAuthToken) {
    dispatch(IsLoadingAction(true));
    console.log("Retrieved authToken:", storedAuthToken);
    dispatch(StoreToken(storedAuthToken));
    dispatch(GetCurrentUserByTokenAction(storedAuthToken));
    dispatch(LoginAction());
  } else {
    console.log("No authToken found in localStorage");
  }

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
          
          <Route exact path="/MyDeals" component={DoneDealPage} />
          <Route exact path="/register" component={SignupPage} />
          <Route exact path="/userAds" component={UserAdsPage} />
          <Route exact path="/EditPropertyAd/:id" component={EditPropertyPage} />
          <Route exact path="/EditUserProfile" component={EditProfilePage} />
          <Route exact path="/Fav" component={FavPage} />
          <Route exact path="/sellProduct" component={SellPage} />
          <Route exact path="/viewUser/:user" component={ViewUsersPage} />
          <Route exact path="/:id" component={ViewSingleProductPageV2} />
          <Route exact path="/*" component={NotFoundPage} />
        </Switch>
      </BrowserRouter>
      <LoginModal />
    </>
  );
}

export default App;
