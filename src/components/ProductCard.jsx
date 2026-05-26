
import './ProductCard.css';
function ProductCard({product}){
    const{
        title,
        brand,
        category,
        price,
        discountPercentage,
        rating,
        stock,
        thumbnail,
    } = product;

    const inStock = stock > 0;
    const hasDiscount = discountPercentage > 0;

    return(
<article className="product-card">
<img
className="product-card-img"
src={thumbnail}
alt={title}
loading = "lazy"
/>
<div className="product-card-body">
<h3 className="product-card-title"> 
    {title}
</h3>
{brand && <p className="product-card-brand">{brand}</p>}
<p className="product-card-category">{category}</p>
<div className="wrapper-price">
<span>${price}</span>
{hasDiscount && (<span className="product-card-discount">-{Math.round(discountPercentage)}%</span>
)}
</div>
<p className="product-card-rating" aria-label={`Рейтинг ${rating}`}>★{rating.toFixed(2)}</p>
<p className={'product-card-stock' + (inStock ? 'product-card-stock-in' : 'product-card-stock-out')}
>{inStock ? 'В наявності' : 'Немає в наявності'}</p>
</div>
</article>
    );

}

export default ProductCard;