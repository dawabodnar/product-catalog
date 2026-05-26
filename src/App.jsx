import { fetchProducts } from "./utils/api";
import { useEffect, useState, useMemo } from "react";
import ProductList from "./components/ProductList";
import Toolbar from "./components/Toolbar";
import { hasMeaningfulDiscount } from "./utils/product";
import { useFavorites } from "./hooks/useFavorites";
import FavoritesList from "./components/FavoritesList";
import { useCompare } from "./hooks/useCompare";
import CompareTable from "./components/CompareTable";

function App() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState("");
  const [status, setStatus] = useState("loading");

  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [inStockOnly, setInStockOnly] = useState(false);
  const [discountedOnly, setDiscountedOnly] = useState(false);
  const [sortOption, setSortOption] = useState("default");

  const { favoriteId, isFavorite, toggleFavorite, clearFavorites } =
    useFavorites();

  const { compareId, isCompare, toggleCompare, clearCompare, isFull } =
    useCompare();

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setStatus("loading");
      try {
        const data = await fetchProducts();
        if (!cancelled) {
          setProducts(data);
          setStatus("success");
        }
      } catch (error) {
        console.error("Failed to fetch products:", error);
        if (!cancelled) {
          setError(error.message || "Невідома помилка");
          setStatus("error");
        }
      }
    }
    load();
    return () => {
      cancelled = true;
    };
  }, []);

  const categories = useMemo(() => {
    const set = new Set(products.map((p) => p.category));
    return Array.from(set).sort();
  }, [products]);

  const visibleProducts = useMemo(() => {
    let result = products;
    if (searchQuery.trim()) {
      const query = searchQuery.trim().toLowerCase();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(query) ||
          (p.brand && p.brand.toLowerCase().includes(query)) ||
          p.category.toLowerCase().includes(query),
      );
    }
    if (categoryFilter !== "all") {
      result = result.filter((p) => p.category === categoryFilter);
    }
    if (inStockOnly) {
      result = result.filter((p) => p.stock > 0);
    }
    if (discountedOnly) {
      result = result.filter(hasMeaningfulDiscount);
    }
    if (sortOption !== "default") {
      result = [...result];
      switch (sortOption) {
        case "price-asc":
          result.sort((a, b) => a.price - b.price);
          break;

        case "price-desc":
          result.sort((a, b) => b.price - a.price);
          break;

        case "rating-desc":
          result.sort((a, b) => b.rating - a.rating);
          break;

        case "title-asc":
          result.sort((a, b) => a.title.localeCompare(b.title));
          break;
        default:
          break;
      }
    }
    return result;
  }, [
    products,
    searchQuery,
    categoryFilter,
    inStockOnly,
    discountedOnly,
    sortOption,
  ]);

  const favoriteProducts = useMemo(
    () => products.filter((p) => favoriteId.includes(p.id)),
    [products, favoriteId],
  );

  const compareProducts = useMemo(() => {
    return compareId
      .map((id) => products.find((p) => p.id === id))
      .filter(Boolean);
  }, [products, compareId]);

  function handleReset() {
    setSearchQuery("");
    setCategoryFilter("all");
    setInStockOnly(false);
    setDiscountedOnly(false);
    setSortOption("default");
  }
  return (
    <div className="app">
      <header className="app_header">
        <h1>Каталог продукції</h1>
      </header>
      <main className="app_main">
        {status === "loading" && <p>Завантаження…</p>}
        {status === "error" && (
          <p role="alert">Помилка завантаження: {error}</p>
        )}
        {status === "success" && (
          <>
            <Toolbar
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              categories={categories}
              categoryFilter={categoryFilter}
              onCategoryChange={setCategoryFilter}
              inStockOnly={inStockOnly}
              onInStockChange={setInStockOnly}
              discountedOnly={discountedOnly}
              onDiscountedChange={setDiscountedOnly}
              sortOption={sortOption}
              onSortChange={setSortOption}
              Reset={handleReset}
            />
            {visibleProducts.length > 0 ? (
              <ProductList
                products={visibleProducts}
                isFavorite={isFavorite}
                toggleFavorite={toggleFavorite}
                isCompare={isCompare}
                toggleCompare={toggleCompare}
                canAddToCompare={!isFull}
              />
            ) : (
              <p className="app_empty">
                Нічого не знайдено. Спробуйте змінити пошук або скинути фільтри.
              </p>
            )}
            <FavoritesList
              products={favoriteProducts}
              isFavorite={isFavorite}
              toggleFavorite={toggleFavorite}
              clearFavorites={clearFavorites}
              isCompare={isCompare}
              toggleCompare={toggleCompare}
              canAddToCompare={!isFull}
            />
            <CompareTable
              products={compareProducts}
              onRemove={toggleCompare}
              clearCompare={clearCompare}
            />
          </>
        )}
      </main>
    </div>
  );
}

export default App;
