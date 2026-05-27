import { hasMeaningfulDiscount } from "../utils/product";
import "./ProductCard.css";
import { getStockState, getStockLabel } from "../utils/product";
function ProductCard({
  product,
  isFavorite,
  onToggleFavorite,
  isCompared,
  onToggleCompare,
  canAddToCompare,
}) {
  const {
    title,
    brand,
    category,
    price,
    discountPercentage,
    rating,
    thumbnail,
  } = product;

  const stockState = getStockState(product);
  const stockLabel = getStockLabel(stockState);
  const hasDiscount = hasMeaningfulDiscount(product);
  const compareDisabled = !isCompared && !canAddToCompare;
  return (
    <article className="product-card">
      <div className="product-card-img-wrap">
        <img
          className="product-card-img"
          src={thumbnail}
          alt={title}
          loading="lazy"
        />
        {hasDiscount && (
          <span className="product-card-discount">
            -{Math.round(discountPercentage)}%
          </span>
        )}
      </div>
      <div className="product-card-body">
        <h3 className="product-card-title">{title}</h3>
        {brand && <p className="product-card-brand">{brand}</p>}
        <p className="product-card-category">{category}</p>
        <div className="wrapper-price">
          <span className="product-card-price">${price}</span>
        </div>
        <p className="product-card-rating" aria-label={`Рейтинг ${rating}`}>
          ★{rating.toFixed(2)}
        </p>
        <p className={`product-card__stock product-card__stock--${stockState}`}>
          <span aria-hidden="true" className="product-card__stock-dot" />
          {stockLabel}
        </p>
        <button
          type="button"
          className={`fav-btn ${isFavorite ? "fav-btn--active" : ""}`}
          onClick={() => onToggleFavorite(product.id)}
          aria-pressed={isFavorite}
          aria-label={
            isFavorite
              ? `Видалити ${title} з обраного`
              : `Додати ${title} в обране`
          }
        >
          {isFavorite ? "♥ В обраному" : "♡ В обране"}
        </button>

        <button
          type="button"
          className={`compare-btn ${isCompared ? "compare-btn--active" : ""}`}
          onClick={() => onToggleCompare(product.id)}
          aria-pressed={isCompared}
          disabled={compareDisabled}
          aria-label={
            isCompared
              ? `Прибрати ${title} з порівняння`
              : compareDisabled
                ? `Не можна додати ${title}: вже обрано 3 товари`
                : `Додати ${title} до порівняння`
          }
        >
          {isCompared ? "⇄ У порівнянні" : "⇄ Порівняти"}
        </button>
      </div>
    </article>
  );
}

export default ProductCard;
