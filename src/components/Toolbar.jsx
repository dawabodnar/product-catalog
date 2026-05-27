import "./Toolbar.css";

function Toolbar({
  searchQuery,
  onSearchChange,
  categories,
  categoryFilter,
  onCategoryChange,
  inStockOnly,
  onInStockChange,
  discountedOnly,
  onDiscountedChange,
  sortOption,
  onSortChange,
  onReset,
}) {
  return (
    <div className="toolbar">
      <div className="toolbar_row">
        <label className="toolbar_field toolbar_field--search">
          <span className="toolbar_label">Пошук</span>
          <input
            type="search"
            className="toolbar_input"
            placeholder="Назва, бренд або категорія"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </label>
        <label className="toolbar_field">
          <span className="toolbar_label">Категорія</span>
          <select
            className="toolbar_select"
            value={categoryFilter}
            onChange={(e) => onCategoryChange(e.target.value)}
          >
            <option value="all">Всі категорії</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </label>
        <label className="toolbar_field">
          <span className="toolbar_label">Сортування</span>
          <select
            className="toolbar_select"
            value={sortOption}
            onChange={(e) => onSortChange(e.target.value)}
          >
            <option value="default">За замовчуванням</option>
            <option value="price-asc">Ціна: від низької до високої</option>
            <option value="price-desc">Ціна: від високої до низької</option>
            <option value="rating-desc">
              Рейтинг: від високого до низького
            </option>
            <option value="title-asc">Назва: А-Я</option>
          </select>
        </label>
      </div>

      <div className="toolbar_row toolbar_row--checks">
        <label className="toolbar_checkbox">
          <input
            type="checkbox"
            checked={inStockOnly}
            onChange={(e) => onInStockChange(e.target.checked)}
          />
          <span>Тільки в наявності</span>
        </label>

        <label className="toolbar_checkbox">
          <input
            type="checkbox"
            checked={discountedOnly}
            onChange={(e) => onDiscountedChange(e.target.checked)}
          />
          <span>Тільки зі знижкою</span>
        </label>
        <button type="button" className="toolbar_reset" onClick={onReset}>
          Скинути фільтри
        </button>
      </div>
    </div>
  );
}

export default Toolbar;
