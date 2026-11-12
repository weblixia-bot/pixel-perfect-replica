import { describe, expect, it } from "vitest";
import {
  addCartItem,
  cartQuantity,
  categories,
  filterCatalog,
  roleNavigation,
  type Product,
} from "@/lib/marketplace";
const rows: Product[] = [
  {
    id: "phone",
    name: "Teléfono",
    brand: "Nova",
    store: "Tecno Chile",
    category: "celulares",
    price: 100,
    oldPrice: 150,
    sales: 3,
    rating: 5,
    reviews: 1,
    image: "",
  },
  {
    id: "audio",
    name: "Audífonos",
    brand: "Sound",
    store: "Audio Chile",
    category: "audio",
    price: 200,
    oldPrice: 200,
    sales: 20,
    rating: 5,
    reviews: 1,
    image: "",
  },
];
describe("AMIZEX prototype rules", () => {
  it("offers exactly the nine technology subcategories", () => {
    expect(categories.map((c) => c.name)).toEqual([
      "Celulares y smartphones",
      "Notebooks y computadores",
      "Audífonos y audio",
      "Televisores y pantallas",
      "Gaming y consolas",
      "Accesorios y cargadores",
      "Hogar inteligente",
      "Cámaras y drones",
      "Smartwatch y wearables",
    ]);
  });
  it("shows guest links only to visitors", () => {
    expect(roleNavigation("visitante").showGuestLinks).toBe(true);
    expect(roleNavigation("comprador").showGuestLinks).toBe(false);
  });
  it("sellers see Mi tienda", () => {
    expect(roleNavigation("vendedor").sellerLabel).toBe("Mi tienda");
    expect(roleNavigation("comprador").sellerLabel).toBe("Vender");
  });
  it("keeps administration out of every public demo role", () => {
    for (const role of ["visitante", "comprador", "vendedor", "administrador"])
      expect(roleNavigation(role).showAdministration).toBe(false);
  });
  it("increments the cart counter on every added product", () => {
    const cart = addCartItem(addCartItem({}, "phone"), "phone");
    expect(cart["phone"]).toBe(2);
    expect(cartQuantity(cart)).toBe(2);
  });
  it("offers contain only discounted products", () => {
    expect(filterCatalog(rows, { mode: "ofertas" }).map((p) => p.id)).toEqual(["phone"]);
  });
  it("best sellers are ordered by sales", () => {
    expect(filterCatalog(rows, { mode: "mas-vendidos" }).map((p) => p.id)).toEqual([
      "audio",
      "phone",
    ]);
  });
  it("filters a selected subcategory", () => {
    expect(filterCatalog(rows, { category: "audio" }).map((p) => p.id)).toEqual(["audio"]);
  });
  it("searches products, brands and stores without accents", () => {
    expect(filterCatalog(rows, { q: "telefono" }).map((p) => p.id)).toEqual(["phone"]);
    expect(filterCatalog(rows, { q: "Sound" }).map((p) => p.id)).toEqual(["audio"]);
    expect(filterCatalog(rows, { q: "Tecno Chile" }).map((p) => p.id)).toEqual(["phone"]);
  });
});
