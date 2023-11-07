const INITIAL_VALUE = {
  productSearchedList: [],
};

export default function GetProductsSearchedListReducer(state = INITIAL_VALUE, action) {
 
  switch (action.type) {
    case "GET_PRODUCTS_BY_FILTER":
      return {
        ...state,
        productSearchedList: action.payload,
      };

   
    default:
      return state;
  }
}
