import { useState, type FormEvent, type ReactNode } from "react";
import { Link, useLocation, useNavigate } from "@tanstack/react-router";
import {
  ArrowRight,
  Bell,
  ChevronDown,
  CreditCard,
  Headphones,
  Instagram,
  MapPin,
  Menu,
  Minus,
  Plus,
  Search,
  ShieldCheck,
  ShoppingBag,
  ShoppingCart,
  Store,
  Truck,
  User,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { Sheet, SheetContent, SheetDescription, SheetTitle } from "@/components/ui/sheet";
import { categories, money, normalize, roleNavigation, type DemoRole } from "@/lib/marketplace";
import { useMarketplace } from "./context";
import { products } from "./products";

export function Brand() {
  return (
    <Link to="/" className="brand" aria-label="AMIZEX, inicio">
      <span className="brand-mark">A</span>AMIZEX
    </Link>
  );
}
function CategoryLinks({ close }: { close?: () => void }) {
  return (
    <>
      {categories.map((category) => (
        <Link
          key={category.slug}
          to="/catalogo"
          search={{ category: category.slug }}
          onClick={close}
        >
          {category.name}
        </Link>
      ))}
    </>
  );
}
function SearchBox() {
  const [query, setQuery] = useState("");
  const [focused, setFocused] = useState(false);
  const navigate = useNavigate();
  const suggestions = [
    ...products.map((p) => ({ label: p.name, kind: "Producto", query: p.name })),
    ...["Samsung", "Apple", "Sony"].map((label) => ({ label, kind: "Marca", query: label })),
    ...["Tecno Chile", "Digital Store", "Audio Chile"].map((label) => ({
      label,
      kind: "Tienda",
      query: label,
    })),
  ]
    .filter((item) => normalize(item.label).includes(normalize(query)))
    .slice(0, 5);
  const search = (value: string) => {
    setQuery(value);
    setFocused(false);
    navigate({ to: "/catalogo", search: { q: value } });
  };
  return (
    <div className="search-box">
      <form
        className="search-form"
        onSubmit={(e: FormEvent) => {
          e.preventDefault();
          search(query);
        }}
      >
        <input
          aria-label="Buscar productos, marcas y tiendas"
          placeholder="Buscar productos, marcas y tiendas"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setTimeout(() => setFocused(false), 180)}
          onKeyDown={(e) => {
            if (e.key === "Escape") setFocused(false);
          }}
        />
        <Button variant="ghost" size="icon" type="submit" aria-label="Buscar">
          <Search className="size-5" />
        </Button>
      </form>
      {focused && query && (
        <div className="dropdown-panel w-full" aria-label="Sugerencias de búsqueda">
          {suggestions.length ? (
            suggestions.map((item) => (
              <Button
                variant="ghost"
                key={item.label}
                className="menu-item justify-between h-auto"
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => search(item.query)}
              >
                <span className="truncate">{item.label}</span>
                <span className="text-xs text-muted-foreground">{item.kind}</span>
              </Button>
            ))
          ) : (
            <p className="p-3 text-sm text-muted-foreground">
              Presiona Enter para buscar “{query}”.
            </p>
          )}
        </div>
      )}
    </div>
  );
}
function Header() {
  const state = useMarketplace();
  const nav = roleNavigation(state.role);
  const routeLocation = useLocation();
  const pathname = routeLocation.pathname;
  const currentMode = (routeLocation.search as { mode?: string }).mode;
  const [menuOpen, setMenuOpen] = useState(false);
  const [categoriesOpen, setCategoriesOpen] = useState(false);
  const [notifications, setNotifications] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  return (
    <header className="market-header">
      <div className="container-main header-top">
        <Button
          variant="nav"
          size="icon"
          className="mobile-menu-button"
          aria-label="Abrir menú"
          onClick={() => setMenuOpen(true)}
        >
          <Menu />
        </Button>
        <Brand />
        <SearchBox />
        <div className="header-account">
          {nav.showGuestLinks ? (
            <>
              <Button asChild variant="nav" className="nav-text">
                <Link to="/cuenta" search={{ mode: "registro" }}>
                  Crea tu cuenta
                </Link>
              </Button>
              <Button asChild variant="nav" className="nav-text">
                <Link to="/cuenta">Ingresa</Link>
              </Button>
            </>
          ) : (
            <div className="dropdown-wrap nav-text">
              <Button
                variant="nav"
                className="nav-text"
                aria-expanded={accountOpen}
                onClick={() => setAccountOpen(!accountOpen)}
              >
                <User />
                {state.userName}
                <ChevronDown />
              </Button>
              {accountOpen && (
                <div className="dropdown-panel right-0">
                  {["Mi cuenta", "Mis direcciones", "Mis reclamos"].map((label, i) => (
                    <Link
                      key={label}
                      to="/cuenta"
                      search={{ tab: ["cuenta", "direcciones", "reclamos"][i] }}
                      onClick={() => setAccountOpen(false)}
                    >
                      {label}
                    </Link>
                  ))}
                  <Button
                    variant="ghost"
                    className="menu-item"
                    onClick={() => {
                      state.setRole("visitante");
                      setAccountOpen(false);
                    }}
                  >
                    Cerrar sesión
                  </Button>
                </div>
              )}
            </div>
          )}
          <Button asChild variant="nav" className="nav-text">
            <Link to="/compras">Mis compras</Link>
          </Button>
          <div className="dropdown-wrap notification-wrap">
            <Button
              variant="nav"
              size="icon"
              aria-label="Notificaciones"
              aria-expanded={notifications}
              onClick={() => setNotifications(!notifications)}
            >
              <Bell />
              <span className="notification-dot" />
            </Button>
            {notifications && (
              <div className="dropdown-panel right-0 w-72">
                <h3 className="text-sm font-bold p-2">Notificaciones</h3>
                <p className="text-xs p-3 leading-relaxed">
                  Las ofertas en tecnología ya están aquí. Descubre los productos destacados de hoy.
                </p>
                <Link
                  to="/catalogo"
                  search={{ mode: "ofertas" }}
                  onClick={() => setNotifications(false)}
                >
                  Ver ofertas <ArrowRight className="size-4 ml-auto" />
                </Link>
              </div>
            )}
          </div>
          <Button
            variant="nav"
            size="icon"
            className="relative"
            aria-label={`Carrito, ${state.quantity} productos`}
            onClick={() => state.setCartOpen(true)}
          >
            <ShoppingCart className="size-5" />
            <span className="cart-counter" aria-live="polite">
              {state.quantity}
            </span>
          </Button>
        </div>
      </div>
      <div className="header-second">
        <nav className="container-main header-bottom" aria-label="Navegación principal">
          <Button
            variant="nav"
            className="location-button h-auto px-0"
            onClick={() => state.setLocationOpen(true)}
          >
            <MapPin className="size-5" />
            <span className="text-left text-[11px] leading-4">
              <span className="block opacity-70">Enviar a</span>
              <strong className="font-medium">{state.location}</strong>
            </span>
          </Button>
          <div
            className="dropdown-wrap"
            onMouseEnter={() => setCategoriesOpen(true)}
            onMouseLeave={() => setCategoriesOpen(false)}
          >
            <Button
              variant="nav"
              className="nav-link px-0"
              aria-expanded={categoriesOpen}
              onClick={() => setCategoriesOpen(!categoriesOpen)}
            >
              Categorías
              <ChevronDown className="size-3" />
            </Button>
            {categoriesOpen && (
              <div className="dropdown-panel category-menu">
                <h3 className="px-3 py-2 text-xs text-primary font-bold">TECNOLOGÍA</h3>
                <CategoryLinks close={() => setCategoriesOpen(false)} />
              </div>
            )}
          </div>
          <Link
            to="/catalogo"
            search={{ mode: "ofertas" }}
            className={`nav-link ${pathname === "/catalogo" && currentMode === "ofertas" ? "active" : ""}`}
          >
            Ofertas
          </Link>
          <Link
            to="/catalogo"
            search={{ mode: "mas-vendidos" }}
            className={`nav-link ${pathname === "/catalogo" && currentMode === "mas-vendidos" ? "active" : ""}`}
          >
            Más vendidos
          </Link>
          <Link to="/vender" className={`nav-link ${pathname === "/vender" ? "active" : ""}`}>
            {nav.sellerLabel}
          </Link>
          <span className="ml-auto text-[10px] opacity-75 hidden lg:flex items-center gap-2">
            <ShieldCheck className="size-3.5" />
            Tu tecnología, con confianza
          </span>
        </nav>
      </div>
      <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
        <SheetContent side="left" className="overflow-y-auto">
          <SheetTitle>AMIZEX</SheetTitle>
          <SheetDescription>Encuentra tu próxima tecnología.</SheetDescription>
          <div className="flex flex-col gap-1 mt-6">
            <Button
              variant="ghost"
              className="justify-start"
              onClick={() => {
                setMenuOpen(false);
                state.setLocationOpen(true);
              }}
            >
              <MapPin />
              Enviar a {state.location}
            </Button>
            <details className="p-3">
              <summary className="font-semibold text-sm cursor-pointer">Tecnología</summary>
              <div className="flex flex-col gap-3 text-xs pt-4">
                <CategoryLinks close={() => setMenuOpen(false)} />
              </div>
            </details>
            <Button asChild variant="ghost" className="justify-start">
              <Link to="/catalogo" search={{ mode: "ofertas" }} onClick={() => setMenuOpen(false)}>
                Ofertas
              </Link>
            </Button>
            <Button asChild variant="ghost" className="justify-start">
              <Link
                to="/catalogo"
                search={{ mode: "mas-vendidos" }}
                onClick={() => setMenuOpen(false)}
              >
                Más vendidos
              </Link>
            </Button>
            <Button asChild variant="ghost" className="justify-start">
              <Link to="/vender" onClick={() => setMenuOpen(false)}>
                {nav.sellerLabel}
              </Link>
            </Button>
            <Button asChild variant="ghost" className="justify-start">
              <Link to="/compras" onClick={() => setMenuOpen(false)}>
                Mis compras
              </Link>
            </Button>
            <Button asChild variant="ghost" className="justify-start">
              <Link to="/cuenta" onClick={() => setMenuOpen(false)}>
                {nav.showGuestLinks ? "Ingresa" : "Mi cuenta"}
              </Link>
            </Button>
            {nav.showGuestLinks && (
              <Button asChild variant="default">
                <Link to="/cuenta" search={{ mode: "registro" }} onClick={() => setMenuOpen(false)}>
                  Crea tu cuenta
                </Link>
              </Button>
            )}
          </div>
        </SheetContent>
      </Sheet>
    </header>
  );
}
export function TrustBand() {
  return (
    <div className="trust-band">
      <div className="container-main trust-row">
        {[
          [Truck, "Envíos a todo Chile", "Desde Arica a Punta Arenas"],
          [ShieldCheck, "Compra con confianza", "Tus compras, protegidas"],
          [CreditCard, "Paga a tu manera", "Tarjetas y cuotas sin interés"],
          [Headphones, "Estamos para ayudarte", "Atención cercana, de verdad"],
        ].map(([Icon, title, text]) => {
          const Component = Icon as typeof Truck;
          return (
            <div className="trust-item" key={String(title)}>
              <Component />
              <div>
                <strong>{String(title)}</strong>
                <small>{String(text)}</small>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
function Footer() {
  const { role, setRole } = useMarketplace();
  return (
    <footer className="footer">
      <div className="container-main footer-main">
        <div className="footer-about">
          <Brand />
          <p>
            La tecnología que quieres.
            <br />
            La confianza que necesitas.
          </p>
          <div className="flex items-center gap-3 mt-4 text-primary">
            <Instagram className="size-4" />
            <span className="text-xs">Hecho para conectar Chile.</span>
          </div>
        </div>
        {[
          {
            title: "Conoce AMIZEX",
            links: ["Quiénes somos", "Vende en AMIZEX", "Tiendas y marcas"],
          },
          {
            title: "Te ayudamos",
            links: ["Centro de ayuda", "Compras y envíos", "Cambios y devoluciones"],
          },
          {
            title: "Compra con confianza",
            links: ["Términos y condiciones", "Privacidad", "Compra protegida"],
          },
        ].map((group) => (
          <div key={group.title}>
            <h3>{group.title}</h3>
            {group.links.map((label) => (
              <Link
                key={label}
                to={label === "Vende en AMIZEX" ? "/vender" : "/ayuda"}
                search={label === "Vende en AMIZEX" ? {} : { tema: label }}
              >
                {label}
              </Link>
            ))}
          </div>
        ))}
      </div>
      <div className="container-main footer-bottom">
        <span>© 2026 AMIZEX. Todos los derechos reservados. · Chile</span>
        <label className="demo-bar">
          <span>Vista de demostración</span>
          <select
            aria-label="Rol de demostración"
            value={role}
            onChange={(e) => setRole(e.target.value as DemoRole)}
          >
            <option value="visitante">Visitante</option>
            <option value="comprador">Comprador</option>
            <option value="vendedor">Vendedor</option>
          </select>
        </label>
      </div>
    </footer>
  );
}
function MarketplaceDialogs() {
  const state = useMarketplace();
  const [region, setRegion] = useState("Metropolitana de Santiago");
  const [commune, setCommune] = useState("Santiago");
  const regions: Record<string, string[]> = {
    "Metropolitana de Santiago": [
      "Santiago",
      "Providencia",
      "Las Condes",
      "Ñuñoa",
      "Maipú",
      "La Florida",
      "Puente Alto",
      "San Miguel",
    ],
    Valparaíso: ["Valparaíso", "Viña del Mar", "Quilpué"],
    Biobío: ["Concepción", "Talcahuano", "Los Ángeles"],
    "Otras regiones": [
      "Arica",
      "Iquique",
      "Antofagasta",
      "Copiapó",
      "La Serena",
      "Rancagua",
      "Talca",
      "Chillán",
      "Temuco",
      "Valdivia",
      "Puerto Montt",
      "Coyhaique",
      "Punta Arenas",
    ],
  };
  const cartRows = products.filter((p) => state.cart[p.id]);
  const total = cartRows.reduce((sum, p) => sum + p.price * (state.cart[p.id] || 0), 0);
  return (
    <>
      <Dialog open={state.locationOpen} onOpenChange={state.setLocationOpen}>
        <DialogContent className="max-w-md w-[calc(100%-32px)] rounded-lg">
          <DialogTitle>¿Dónde recibes tus compras?</DialogTitle>
          <DialogDescription>Elige tu región y comuna de despacho.</DialogDescription>
          <label className="form-field">
            Región
            <select
              className="form-input"
              value={region}
              onChange={(e) => {
                setRegion(e.target.value);
                setCommune(regions[e.target.value]?.[0] || "Santiago");
              }}
            >
              {Object.keys(regions).map((name) => (
                <option key={name}>{name}</option>
              ))}
            </select>
          </label>
          <label className="form-field">
            Comuna
            <select
              className="form-input"
              value={commune}
              onChange={(e) => setCommune(e.target.value)}
            >
              {(regions[region] || []).map((name) => (
                <option key={name}>{name}</option>
              ))}
            </select>
          </label>
          <Button variant="purchase" onClick={() => state.saveLocation(commune)}>
            Guardar ubicación
          </Button>
        </DialogContent>
      </Dialog>
      <Sheet open={state.cartOpen} onOpenChange={state.setCartOpen}>
        <SheetContent className="w-full sm:max-w-md overflow-y-auto">
          <SheetTitle className="flex items-center gap-2">
            <ShoppingCart className="size-5" />
            Tu carrito ({state.quantity})
          </SheetTitle>
          <SheetDescription>Productos de demostración. No se realizan cobros.</SheetDescription>
          {cartRows.length ? (
            <>
              <div className="mt-6 space-y-5">
                {cartRows.map((p) => (
                  <div className="flex gap-3 border-b pb-5" key={p.id}>
                    <img
                      src={p.image}
                      alt={p.name}
                      className="w-20 h-20 object-contain"
                      width={80}
                      height={80}
                    />
                    <div className="flex-1">
                      <h3 className="text-xs leading-5">{p.name}</h3>
                      <strong className="text-sm">{money(p.price)}</strong>
                      <div className="flex items-center gap-2 mt-2">
                        <Button
                          variant="outline"
                          size="icon"
                          className="size-7"
                          aria-label={`Quitar uno de ${p.name}`}
                          onClick={() => state.changeQuantity(p.id, -1)}
                        >
                          <Minus />
                        </Button>
                        <span className="text-xs w-5 text-center">{state.cart[p.id]}</span>
                        <Button
                          variant="outline"
                          size="icon"
                          className="size-7"
                          aria-label={`Agregar uno de ${p.name}`}
                          onClick={() => state.changeQuantity(p.id, 1)}
                        >
                          <Plus />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="size-7 ml-auto"
                          aria-label={`Eliminar ${p.name}`}
                          onClick={() => state.changeQuantity(p.id, -(state.cart[p.id] || 0))}
                        >
                          <X />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex justify-between mt-6 font-bold">
                <span>Total</span>
                <span>{money(total)}</span>
              </div>
              <Button
                variant="purchase"
                className="w-full mt-5"
                onClick={() => state.setCartOpen(false)}
              >
                Seguir explorando
                <ArrowRight />
              </Button>
            </>
          ) : (
            <div className="py-20 text-center">
              <ShoppingBag className="size-12 mx-auto text-primary mb-4" />
              <h3 className="font-bold">Tu próxima tecnología te espera</h3>
              <p className="text-sm text-muted-foreground mt-2 mb-5">
                Aún no tienes productos en tu carrito.
              </p>
              <Button onClick={() => state.setCartOpen(false)}>Explorar productos</Button>
            </div>
          )}
        </SheetContent>
      </Sheet>
    </>
  );
}
export function MarketplaceShell({ children }: { children: ReactNode }) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
      <MarketplaceDialogs />
    </>
  );
}
