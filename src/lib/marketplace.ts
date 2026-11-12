export const categories = [
  { slug: "celulares", name: "Celulares y smartphones", short: "Celulares" },
  { slug: "notebooks", name: "Notebooks y computadores", short: "Notebooks" },
  { slug: "audio", name: "Audífonos y audio", short: "Audio" },
  { slug: "televisores", name: "Televisores y pantallas", short: "Televisores" },
  { slug: "gaming", name: "Gaming y consolas", short: "Gaming" },
  { slug: "accesorios", name: "Accesorios y cargadores", short: "Accesorios" },
  { slug: "hogar", name: "Hogar inteligente", short: "Hogar inteligente" },
  { slug: "camaras", name: "Cámaras y drones", short: "Cámaras" },
  { slug: "wearables", name: "Smartwatch y wearables", short: "Smartwatch" },
];

export type DemoRole = "visitante" | "comprador" | "vendedor";
export function roleNavigation(role: string) {
  return {
    showGuestLinks: role === "visitante",
    sellerLabel: role === "vendedor" ? "Mi tienda" : "Vender",
    showAdministration: false,
  };
}
export interface Product {
  id: string;
  name: string;
  brand: string;
  store: string;
  category: string;
  price: number;
  oldPrice: number;
  sales: number;
  rating: number;
  reviews: number;
  image: string;
}
export const money = (value: number) => "$" + new Intl.NumberFormat("es-CL").format(value);
export const normalize = (value: string) =>
  value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
export function filterCatalog(
  products: Product[],
  filters: {
    q?: string | undefined;
    category?: string | undefined;
    mode?: string | undefined;
    sort?: string | undefined;
  },
) {
  const query = normalize(filters.q || "");
  const selected = products.filter(
    (p) =>
      (!query || normalize(`${p.name} ${p.brand} ${p.store}`).includes(query)) &&
      (!filters.category || filters.category === p.category) &&
      (filters.mode !== "ofertas" || p.oldPrice > p.price),
  );
  if (filters.mode === "mas-vendidos" || filters.sort === "ventas")
    return selected.sort((a, b) => b.sales - a.sales);
  if (filters.sort === "precio-asc") return selected.sort((a, b) => a.price - b.price);
  if (filters.sort === "precio-desc") return selected.sort((a, b) => b.price - a.price);
  return selected;
}
export function addCartItem(cart: Record<string, number>, id: string) {
  return { ...cart, [id]: (cart[id] || 0) + 1 };
}
export function cartQuantity(cart: Record<string, number>) {
  return Object.values(cart).reduce((sum, qty) => sum + qty, 0);
}
