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
        productList: action.payload,
      };

    case "GET_PRODUCTS_BY_FILTER":
      console.log(action.payload);
      console.log(parseInt(action.payload));

      for (const key in state.productList) {
        if (
          parseInt(state.productList[key]["Property size:"]) <
          parseInt(action.payload)
        ) {
          let holder = state.productList[key];
          filteredProductList.push(holder);
          console.log(state.productList[key]);
          console.log("found");
        }
      }
      return {
        ...state,
        productList: filteredProductList,
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

    default:
      return state;
  }
}
