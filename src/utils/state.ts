import { create } from "zustand";
import { Book } from "./apis/books";

interface CartState {
  cart: Book[];
  addBook: (book: Book) => void;
  removeBook: (book: Book) => void;
  clearCart: () => void;
}

const useBorrowStore = create<CartState>()((set) => ({
  cart: [],
  addBook: (book) => set((state) => ({ cart: [...state.cart, book] })),
  removeBook: (book) =>
    set((state) => {
      const newCart = state.cart.filter((item) => item.id !== book.id);
      return { cart: newCart };
    }),
  clearCart: () => set(() => ({ cart: [] })),
}));

export default useBorrowStore;