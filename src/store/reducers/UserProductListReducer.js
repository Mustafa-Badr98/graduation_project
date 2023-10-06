const INITIAL_VALUE = {
  userListOfProducts: [],
};

export default function AddToUserProductListReducer(
  state = INITIAL_VALUE,
  action
) {
  switch (action.type) {
    case "ADD_TO_USER_PRODUCT_LIST":
      return {
        ...state,
        userListOfProducts: [action.payload, ...state.userListOfProducts],
      };

    case "EDIT_USER_LIST":
      const updatedList = state.userListOfProducts.map((item) =>
        item.id === action.payload.id ? action.payload : item
      );

      return {
        ...state,
        userListOfProducts: updatedList,
      };

    case "DELETE_FROM_USER_LIST":
      const filteredList = state.userListOfProducts.filter(
        (item) => item.id !== action.payload.id
      );

      return {
        ...state,
        userListOfProducts: filteredList,
      };

    default:
      return state;
  }
}
