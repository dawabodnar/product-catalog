import "./ProductList.css";
import ProductCard from "./ProductCard";

function ProductList({
  products,
  isFavorite,
  toggleFavorite,
  isCompare,
  toggleCompare,
  canAddToCompare,
}) {
  return (
    <ul className="product-list">
      {products.map((product) => (
        <li key={product.id} className="product-list-item">
          <ProductCard
            product={product}
            isFavorite={isFavorite(product.id)}
            toggleFavorite={toggleFavorite}
            isCompare={isCompare(product.id)}
            toggleCompare={toggleCompare}
            canAddToCompare={canAddToCompare}
          />
        </li>
      ))}
    </ul>
  );
}

export default ProductList;
