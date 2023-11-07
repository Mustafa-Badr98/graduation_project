const INITIAL_VALUE = {
  productList: [],
  found: true,
};

export default function GetProductsListReducer(state = INITIAL_VALUE, action) {
  const filteredProductList = [];
  switch (action.type) {
    case "GET_PRODUCTS":
    
    return {
      ...state,
      productList: action.payload.properties,
    };

   
    case "SEARCH":
      let searchWord = action.payload;
      const resultArray = state.productList.filter((product) =>
        product.Title.toLowerCase().includes(searchWord.toLowerCase())
      );
      if (resultArray.length > 0) {
        return {
          ...state,
          productList: resultArray,
          found: true,
        };
      } else {
        return {
          ...state,
          productList: resultArray,
          found: false,
        };
      }
    case "ADD_TO_PRODUCT_LIST":
      return {
        ...state,
        productList: [action.payload, ...state.productList],
      };

    case "EDIT_PRODUCT_LIST":
      const updatedList = state.productList.map((item) =>
        item.id === action.payload.id ? action.payload : item
      );

      return {
        ...state,
        productList: updatedList,
      };

    case "DELETE_FROM_PRODUCTS_LIST":
      const filteredList = state.productList.filter(
        (item) => item.id !== action.payload.id
      );

      return {
        ...state,
        productList: filteredList,
      };
    default:
      return state;
  }
}
