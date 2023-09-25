import { BrowserRouter, Switch, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import HomePage from "./components/pages/homePage";
import NotFoundPage from "./components/pages/notFoundPage";
import SignupPage from "./components/static/signupPage";
import viewSingleProductPage from "./components/pages/viewSingelProduct";
import CartPage from "./components/pages/cart";
import LoginModal from "./components/static/loginModal";
import MyNavbar from "./components/static/myNavbar";
import FavPage from "./components/pages/FavPage";

function App() {
  return (
    <>
      <BrowserRouter>
        <MyNavbar />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/register" component={SignupPage} />
          <Route exact path="/cart" component={CartPage} />
          <Route exact path="/Fav" component={FavPage} />
          <Route exact path="/:id" component={viewSingleProductPage} />

          <Route exact path="/*" component={NotFoundPage} />
        </Switch>
      </BrowserRouter>
      <LoginModal />
    </>
  );
}

export default App;
