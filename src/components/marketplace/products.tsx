import { Heart, ShoppingCart, Star, Truck } from "lucide-react";
import phone from "@/assets/smartphone.jpg";
import notebook from "@/assets/notebook.jpg";
import headphones from "@/assets/headphones.jpg";
import controller from "@/assets/controller.jpg";
import { money, type Product } from "@/lib/marketplace";
import { Button } from "@/components/ui/button";
import { useMarketplace } from "./context";

// Illustrative listings: no live prices, stock or seller claims.
export const products: Product[] = [
  {
    id: "s24",
    name: "Samsung Galaxy S24 5G 256 GB · Gris",
    brand: "Samsung",
    store: "Tecno Chile",
    category: "celulares",
    price: 649990,
    oldPrice: 849990,
    sales: 980,
    rating: 4.8,
    reviews: 124,
    image: phone,
  },
  {
    id: "macbook",
    name: 'Notebook Air 13" M2 · 8 GB · 256 GB',
    brand: "Apple",
    store: "Digital Store",
    category: "notebooks",
    price: 899990,
    oldPrice: 1199990,
    sales: 840,
    rating: 4.9,
    reviews: 86,
    image: notebook,
  },
  {
    id: "sony",
    name: "Audífonos inalámbricos WH-1000XM5",
    brand: "Sony",
    store: "Audio Chile",
    category: "audio",
    price: 249990,
    oldPrice: 349990,
    sales: 1250,
    rating: 4.9,
    reviews: 203,
    image: headphones,
  },
  {
    id: "dualsense",
    name: "Control inalámbrico DualSense · Blanco",
    brand: "PlayStation",
    store: "Game Zone",
    category: "gaming",
    price: 59990,
    oldPrice: 79990,
    sales: 1500,
    rating: 4.8,
    reviews: 157,
    image: controller,
  },
];
export function ProductCard({ product }: { product: Product }) {
  const { addToCart, favorites, toggleFavorite } = useMarketplace();
  const favorite = favorites.includes(product.id);
  return (
    <article className="product-card">
      <div className="product-image">
        <img src={product.image} alt={product.name} width={816} height={816} loading="lazy" />
        <span className="discount-tag">
          −{Math.round((1 - product.price / product.oldPrice) * 100)}%
        </span>
        <Button
          variant="ghost"
          size="icon"
          className="favorite"
          title={favorite ? "Quitar de favoritos" : "Guardar en favoritos"}
          aria-label={`${favorite ? "Quitar" : "Guardar"} ${product.name} en favoritos`}
          aria-pressed={favorite}
          onClick={() => toggleFavorite(product.id)}
        >
          <Heart className={favorite ? "fill-primary text-primary" : "text-muted-foreground"} />
        </Button>
      </div>
      <div className="product-info">
        <p className="product-brand">{product.brand}</p>
        <h3 className="product-name">{product.name}</h3>
        <div className="rating">
          <Star />
          <span>{product.rating}</span>
          <span>({product.reviews})</span>
        </div>
        <p className="old-price">{money(product.oldPrice)}</p>
        <p className="product-price">{money(product.price)}</p>
        <p className="product-installments">
          6 cuotas de {money(Math.round(product.price / 6))} sin interés
        </p>
        <p className="product-shipping">
          <Truck /> Envío gratis
        </p>
        <Button variant="purchase" className="w-full h-9" onClick={() => addToCart(product.id)}>
          <ShoppingCart />
          Agregar al carrito
        </Button>
      </div>
    </article>
  );
}
