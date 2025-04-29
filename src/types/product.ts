
export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
};

// Define the type for items in the cart, extending Product with quantity
export type CartItem = Product & {
  quantity: number;
};
