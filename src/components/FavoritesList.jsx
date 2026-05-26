import ProductCard from "./ProductCard";
import "./FavoritesList.css";

function FavoritesList({
  products,
  isFavorite,
  toggleFavorite,
  clearFavorites,
}) {
  return (
    <section className="favorites" aria-labelledby="favorites_title">
      <div className="favorites_header">
        <h2 className="favorites_title" id="favorites_title">
          Обране ({products.length})
        </h2>
        {products.length > 0 && (
          <button
            className="fav_clear-btn"
            type="button"
            onClick={clearFavorites}
          >
            Очистити обране
          </button>
        )}
      </div>
      {products.length === 0 ? (
        <p className="fav_empty">
          Ваше обране поки порожнє. Додайте товари кнопкою «В обране».
        </p>
      ) : (
        <ul className="favorites_list">
          {products.map((product) => (
            <li key={product.id} className="favorite_item">
              <ProductCard
                product={product}
                isFavorite={isFavorite(product.id)}
                toggleFavorite={toggleFavorite}
              />
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
export default FavoritesList;
