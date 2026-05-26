import "./ProductList.css";
import ProductCard from "./ProductCard";

function ProductList({ products, isFavorite, toggleFavorite }) {
  return (
    <ul className="product-list">
      {products.map((product) => (
        <li key={product.id} className="product-list-item">
          <ProductCard
            product={product}
            isFavorite={isFavorite(product.id)}
            toggleFavorite={toggleFavorite}
          />
        </li>
      ))}
    </ul>
  );
}

export default ProductList;
