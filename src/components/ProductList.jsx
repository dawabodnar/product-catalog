import "./ProductList.css";
import ProductCard from "./ProductCard";

function ProductList({ products }) {
  return (
    <ul className="product-list">
      {products.map((product) => (
        <li key={product.id} className="product-list-item">
          <ProductCard product={product} />
        </li>
      ))}
    </ul>
  );
}

export default ProductList;
