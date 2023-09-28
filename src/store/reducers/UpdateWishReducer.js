const INITIAL_VALUE = {
  wishList: [],
};

export default function UpdateWishListReducer(state = INITIAL_VALUE, action) {
  switch (action.type) {
    case "ADD_WISH":
      

      const existingProductIndexInWish = state.wishList.findIndex(
        (product) => product.id === action.payload.id
      );

      if (existingProductIndexInWish !== -1) {
        return state;
      } else {
        return {
          ...state,
          wishList: [...state.wishList, action.payload],
        };
      }

    case "REM_WISH":
      const existingProductIndexRem = state.wishList.findIndex(
        (product) => product.id === action.payload.id
      );

      if (existingProductIndexRem !== -1) {
        const updatedWishList = state.wishList.filter(
          (product) => product.id !== action.payload.id
        );
        return {
          ...state,
          wishList: updatedWishList,
        };
      }
    default:
      return state;
  }
}
