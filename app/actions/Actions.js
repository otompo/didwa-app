export const ACTIONS = {
  ADD_CART: "ADD_CART",
  ADD_ORDERS: "ADD_ORDERS",
};

export const addToCart = (product, cart, amount, extraInfo) => {
  // if (Number(amount) >= product.minAmount) {
  //   return alert("Input Amount Is Less");
  // }
  const check = cart.every((item) => {
    // console.log(item);
    return item._id !== product._id;
  });

  // if (cart.name) return alert("The product has been added to cart.");

  // toast.success(`${product.name} Added to cart`);

  return {
    type: "ADD_CART",
    payload: [
      ...cart,
      { ...product, amount: Number(amount), extraInfo: extraInfo },
    ],
  };
};

export const decrease = (data, id) => {
  const newData = [...data];
  newData.forEach((item) => {
    if (item._id === id) item.count -= 1;
  });

  return { type: "ADD_CART", payload: newData };
};

export const increase = (data, id) => {
  const newData = [...data];
  newData.forEach((item) => {
    if (item._id === id) item.count += 1;
  });
  return { type: "ADD_CART", payload: newData };
};

export const removeFromCart = (data, id) => {
  const newData = [...data];

  newData.forEach((item, index) => {
    if (item._id === id) {
      newData.splice(index, 1);
    }
  });
  alert(`item remove from cart`);
  return { type: "ADD_CART", payload: newData };
};
