import {
  hasMeaningfulDiscount,
  getStockState,
  getStockLabel,
} from "../utils/product";
import { MAX_COMPARE } from "../hooks/useCompare";
import "./CompareTable.css";

function CompareTable({ products, clearCompare, onRemove }) {
  return (
    <section className="compare" aria-labelledby="compare_title">
      <div className="compare_header">
        <h2 className="compare_title" id="compare_title">
          Порівняння ({products.length})/{MAX_COMPARE}
        </h2>
        {products.length > 0 && (
          <button
            type="button"
            className="compare_clear"
            onClick={clearCompare}
          >
            Очистити порівняння
          </button>
        )}
      </div>

      {products.length === 0 ? (
        <p className="compare_empty">
          Виберіть товари для порівняння — до {MAX_COMPARE}
        </p>
      ) : (
        <div className="compare_table-wrap">
          <table className="compare_table">
            <thead>
              <tr>
                <th scope="col">Характеристика</th>
                {products.map((p) => (
                  <th key={p.id} scope="col">
                    <div className="compare_product">
                      <span className="compare_product-title">{p.title}</span>
                      <button
                        type="button"
                        onClick={() => onRemove(p.id)}
                        className="compare_remove"
                        aria-label={`Прибрати ${p.title} з порівняння`}
                      >
                        ✕
                      </button>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">Категорія</th>
                {products.map((p) => (
                  <td key={p.id}>{p.category}</td>
                ))}
              </tr>
              <tr>
                <th scope="row">Ціна</th>
                {products.map((p) => (
                  <td key={p.id}>${p.price}</td>
                ))}
              </tr>
              <tr>
                <th scope="row">Знижка</th>
                {products.map((p) => (
                  <td key={p.id}>
                    {hasMeaningfulDiscount(p)
                      ? `-${Math.round(p.discountPercentage)}%`
                      : "-"}
                  </td>
                ))}
              </tr>
              <tr>
                <th scope="row">Рейтинг</th>
                {products.map((p) => (
                  <td key={p.id}>★{p.rating.toFixed(2)}</td>
                ))}
              </tr>
              <tr>
                <th scope="row">Наявність</th>
                {products.map((p) => (
                  <td key={p.id}>{getStockLabel(getStockState(p))}</td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
export default CompareTable;
