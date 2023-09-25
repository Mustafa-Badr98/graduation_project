const INITIAL_VALUE = {
  productList: [],
};

export default function GetProductsListReducer(state = INITIAL_VALUE, action) {
  switch (action.type) {
    case "GET_PRODUCTS":
      return {
        ...state,
        productList: action.payload,
      };

    default:
      return state;
  }
  
}
