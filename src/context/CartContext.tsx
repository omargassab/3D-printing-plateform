import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

export type CartItem = {
  id: string;
  title: string;
  price: number;
  quantity: number;
  imageUrl: string;
  designerName: string;
};

type CartContextType = {
  items: CartItem[];
  addItem: (item: Omit<CartItem, "quantity">) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  itemCount: number;
  totalPrice: number;
};

const CartContext = createContext<CartContextType>({
  items: [],
  addItem: () => {},
  removeItem: () => {},
  updateQuantity: () => {},
  clearCart: () => {},
  itemCount: 0,
  totalPrice: 0,
});

export function useCart() {
  return useContext(CartContext);
}

const CartProvider = ({
  children,
  initialItems = [],
}: {
  children: ReactNode;
  initialItems?: CartItem[];
}) => {
  const [items, setItems] = useState<CartItem[]>(initialItems);
  const [isInitialized, setIsInitialized] = useState(false);

  // Load cart from localStorage or sessionStorage on mount
  const hasLoaded = React.useRef(false);
  useEffect(() => {
    if (hasLoaded.current) return;
    hasLoaded.current = true;

    // First check localStorage
    const savedCart = localStorage.getItem("cart");
    // Then check sessionStorage as backup
    const tempCart = sessionStorage.getItem("tempCart");

    let parsedCart = [];
    let cartSource = null;

    // Try localStorage first
    if (savedCart) {
      try {
        parsedCart = JSON.parse(savedCart);
        cartSource = "localStorage";
      } catch (error) {
        console.error("Error parsing cart from localStorage:", error);
        localStorage.removeItem("cart");
      }
    }

    // If localStorage failed or was empty, try sessionStorage
    if ((!parsedCart || parsedCart.length === 0) && tempCart) {
      try {
        parsedCart = JSON.parse(tempCart);
        cartSource = "sessionStorage";
        // Restore to localStorage
        localStorage.setItem("cart", tempCart);
        // Clear sessionStorage after restoring
        sessionStorage.removeItem("tempCart");
      } catch (error) {
        console.error("Error parsing cart from sessionStorage:", error);
        sessionStorage.removeItem("tempCart");
      }
    }

    if (parsedCart && Array.isArray(parsedCart) && parsedCart.length > 0) {
      console.log(`Loading cart from ${cartSource}:`, parsedCart);
      setItems(parsedCart);
    }

    setIsInitialized(true);
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem("cart", JSON.stringify(items));
      console.log("Saving cart to localStorage:", items);
    }
  }, [items, isInitialized]);

  const addItem = (newItem: Omit<CartItem, "quantity">) => {
    setItems((currentItems) => {
      // Check if item already exists in cart
      const existingItemIndex = currentItems.findIndex(
        (item) => item.id === newItem.id,
      );

      if (existingItemIndex >= 0) {
        // Item exists, increment quantity
        const updatedItems = [...currentItems];
        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex],
          quantity: updatedItems[existingItemIndex].quantity + 1,
        };
        return updatedItems;
      } else {
        // Item doesn't exist, add new item with quantity 1
        return [...currentItems, { ...newItem, quantity: 1 }];
      }
    });
  };

  const removeItem = (id: string) => {
    setItems((currentItems) => currentItems.filter((item) => item.id !== id));
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(id);
      return;
    }

    setItems((currentItems) =>
      currentItems.map((item) =>
        item.id === id ? { ...item, quantity } : item,
      ),
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  // Calculate total item count
  const itemCount = items.reduce((total, item) => total + item.quantity, 0);

  // Calculate total price
  const totalPrice = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        itemCount,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// Export as default for Fast Refresh compatibility
export default CartProvider;

// Also export as named export for existing imports
export { CartProvider };
