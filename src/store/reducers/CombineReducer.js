import { combineReducers } from "redux";
import LogReducer from "./loginReducer";
import GetProductsListReducer from "./productsReducer";
import UpdateCartReducer from "./UpdateCartReducer";
import GetCurrentUserReducer from "./GetCurrentUser";
import { UpdateFavCountReducer } from "./UpdateFavCountReducer";
import UpdateWishListReducer from "./UpdateWishReducer";
import IsLoadingReducer from "./IsLoadingReducer";
export default combineReducers({
  IsLog: LogReducer,
  Products: GetProductsListReducer,
  CartList: UpdateCartReducer,
  currentUSER: GetCurrentUserReducer,
  FavCOUNT: UpdateFavCountReducer,
  WishLIST: UpdateWishListReducer,
  IsLOADING: IsLoadingReducer,
});
