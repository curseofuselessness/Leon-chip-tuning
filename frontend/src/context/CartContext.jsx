import { createContext, useState, useContext, useEffect } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem('cart');
    return saved ? JSON.parse(saved) : [];
  });

  const [addedItems, setAddedItems] = useState(() => {
    const saved = localStorage.getItem('addedItems');
    return saved ? JSON.parse(saved) : {};
  });

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('addedItems', JSON.stringify(addedItems));
  }, [addedItems]);

  /**
   * Добавляет товар в корзину или увеличивает количество, если уже есть.
   */
  const addToCart = (firmware) => {
    setCart((prev) => {
      const exists = prev.find((item) => item.id === firmware.id);
      if (exists) {
        return prev.map((item) =>
          item.id === firmware.id
            ? { ...item, quantity: (item.quantity || 1) + 1 }
            : item
        );
      }
      return [...prev, { ...firmware, quantity: 1 }];
    });
  };

  /**
   * Удаляет товар из корзины и сбрасывает флаг "добавлено".
   */
  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
    setAddedItems((prev) => {
      const newState = { ...prev };
      delete newState[id];
      return newState;
    });
  };

  const clearCart = () => {
    setCart([]);
    setAddedItems({});
  };

  const markAsAdded = (id) => {
    setAddedItems((prev) => ({
      ...prev,
      [id]: true,
    }));
  };

  const isAdded = (id) => !!addedItems[id];

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        clearCart,
        addedItems,
        markAsAdded,
        isAdded,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}