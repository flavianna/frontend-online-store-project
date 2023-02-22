import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';

function ItemCard({ item, onAddToCart }) {
  return (
    <div className="item-card">
      <Link
        to={ `/produtodetalhes/${item.id}` }
        data-testid="product-detail-link"
      >
        <div data-testid="product">
          <img alt="Produto" src={ item.thumbnail } />
          <h3>{item.title}</h3>
          <p>{`R$ ${item.price}`}</p>
        </div>
      </Link>
      <button
        type="button"
        data-testid="product-add-to-cart"
        onClick={ () => onAddToCart(item) }
      >
        Comprar
      </button>
    </div>
  );
}

ItemCard.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    thumbnail: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
  }).isRequired,
  onAddToCart: PropTypes.func.isRequired,
};

export default ItemCard;
