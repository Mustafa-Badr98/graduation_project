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

    default:
      return state;
  }
}
