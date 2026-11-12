import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { addCartItem, cartQuantity, type DemoRole } from "@/lib/marketplace";

interface MarketplaceState {
  role: DemoRole;
  setRole: (role: DemoRole) => void;
  userName: string;
  setUserName: (name: string) => void;
  cart: Record<string, number>;
  quantity: number;
  addToCart: (id: string) => void;
  changeQuantity: (id: string, change: number) => void;
  location: string;
  saveLocation: (location: string) => void;
  locationOpen: boolean;
  setLocationOpen: (open: boolean) => void;
  cartOpen: boolean;
  setCartOpen: (open: boolean) => void;
  favorites: string[];
  toggleFavorite: (id: string) => void;
}
const Context = createContext<MarketplaceState | null>(null);
export function MarketplaceProvider({ children }: { children: ReactNode }) {
  const [role, setRole] = useState<DemoRole>("visitante");
  const [userName, setUserName] = useState("Camila");
  const [cart, setCart] = useState<Record<string, number>>({});
  const [location, setLocation] = useState("Santiago");
  const [locationOpen, setLocationOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [favorites, setFavorites] = useState<string[]>([]);
  useEffect(() => {
    try {
      const saved = localStorage.getItem("amizex-delivery-location");
      if (saved) setLocation(saved);
    } catch {
      /* Private browsing may block storage. */
    }
  }, []);
  const saveLocation = (value: string) => {
    setLocation(value);
    try {
      localStorage.setItem("amizex-delivery-location", value);
    } catch {
      /* Selection still works during this visit. */
    }
    setLocationOpen(false);
  };
  const changeQuantity = (id: string, change: number) =>
    setCart((previous) => {
      const updated = { ...previous, [id]: Math.max(0, (previous[id] || 0) + change) };
      if (!updated[id]) delete updated[id];
      return updated;
    });
  return (
    <Context.Provider
      value={{
        role,
        setRole,
        userName,
        setUserName,
        cart,
        quantity: cartQuantity(cart),
        addToCart: (id) => setCart((prev) => addCartItem(prev, id)),
        changeQuantity,
        location,
        saveLocation,
        locationOpen,
        setLocationOpen,
        cartOpen,
        setCartOpen,
        favorites,
        toggleFavorite: (id) =>
          setFavorites((prev) =>
            prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
          ),
      }}
    >
      {children}
    </Context.Provider>
  );
}
export function useMarketplace() {
  const value = useContext(Context);
  if (!value) throw new Error("MarketplaceProvider is required");
  return value;
}
