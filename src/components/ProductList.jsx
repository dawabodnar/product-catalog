import "./ProductList.css";
import ProductCard from "./ProductCard";

function ProductList({
  products,
  isFavorite,
  onToggleFavorite,
  isCompared,
  onToggleCompare,
  canAddToCompare,
}) {
  return (
    <ul className="product-list">
      {products.map((product) => (
        <li key={product.id} className="product-list-item">
          <ProductCard
            product={product}
            isFavorite={isFavorite(product.id)}
            onToggleFavorite={onToggleFavorite}
            isCompared={isCompared(product.id)}
            onToggleCompare={onToggleCompare}
            canAddToCompare={canAddToCompare}
          />
        </li>
      ))}
    </ul>
  );
}

export default ProductList;
