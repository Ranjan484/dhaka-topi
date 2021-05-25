import { CART_ADD_ITEM } from "../contants/cartConstants";

export const cartReducer = (state = { cartItem: [] }, action) => {
  if (action.type === CART_ADD_ITEM) {
    const item = action.payload;

    const existItem = state.cartItems.find((x) => x.product === item.product);

    if (existItem) {
      return {
        ...state,
        cartItems: state.cartItems.map((x) =>
          x.product === item.product ? item : x
        ),
      };
    } else {
      return { ...state, cartItem: [...state.cartItem, item] };
    }
  }
  return state;
};
