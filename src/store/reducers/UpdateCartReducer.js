const INITIAL_VALUE = {
  cartList: [],
};

export default function UpdateCartReducer(state = INITIAL_VALUE, action) {
  switch (action.type) {
    case "ADD_CART":
      const existingProductIndexAdd = state.cartList.findIndex(
        (product) => product.id === action.payload.id
      );

      if (existingProductIndexAdd !== -1) {
        const updatedCartList = [...state.cartList];
        updatedCartList[existingProductIndexAdd].quantity += 1;

        return {
          ...state,
          cartList: updatedCartList,
        };
      } else {
        const newProduct = {
          ...action.payload,
          quantity: 1,
        };

        return {
          ...state,
          cartList: [...state.cartList, newProduct],
        };
      }

    case "REM_CART":
      const existingProductIndexRem = state.cartList.findIndex(
        (product) => product.id === action.payload.id
      );
      if (existingProductIndexRem !== -1) {
        const updatedCartList = state.cartList.filter(
          (product) => product.id !== action.payload.id
        );
        return {
          ...state,
          cartList: updatedCartList,
        };
      } else {
        return state;
      }

    case "MIN_CART":
      console.log("we are in MIN Case");

      const existingProductIndexReduce = state.cartList.findIndex(
        (product) => product.id === action.payload.id
      );

      if (existingProductIndexReduce !== -1) {
        const updatedCartList = [...state.cartList];
        if (updatedCartList[existingProductIndexReduce].quantity === 1) {
          const userConfirmed = window.confirm(
            "Are you sure you want to remove this item from your cart?"
          );
          if (userConfirmed) {
            const updatedCartList = state.cartList.filter(
              (product) => product.id !== action.payload.id
            );
            return {
              ...state,
              cartList: updatedCartList,
            };
          } else {
            return state;
          }
        } else {
          console.log("we are in else if the qu is not 1");
          updatedCartList[existingProductIndexReduce].quantity -= 1;
          return {
            ...state,
            cartList: updatedCartList,
          };
        }
      }

    default:
      return state;
  }
}
