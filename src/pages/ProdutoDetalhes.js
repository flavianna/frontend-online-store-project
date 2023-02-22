import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import HeaderSecundario from '../components/HeaderSecundario';
import { getProductById } from '../services/api';
import Footer from '../components/Footer';

export default class ProdutoDetalhes extends Component {
  state = {
    produtoId: '',
    carrinho: [],
    email: '',
    rating: '',
    comment: '',
  };

  async componentDidMount() {
    const { history } = this.props;
    const { pathname } = history.location;
    const urlString = 17;
    const pathId = pathname.substring(urlString);
    const products = await getProductById(pathId);

    if (JSON.parse(localStorage.getItem('carrinhoLocalStorage') !== null)) {
      this.setState({
        carrinho: JSON.parse(localStorage.getItem('carrinhoLocalStorage')),
      });
    }

    this.setState({
      produtoId: products,
    });
  }

  handleChange = ({ target }) => {
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;

    this.setState({
      [name]: value,
    });
  };

  addCarrinhoAsync = () => {
    const { carrinho } = this.state;
    localStorage.setItem('carrinhoLocalStorage', JSON.stringify(carrinho));
  };

  addCarrinho = (item) => {
    item.quantidade = 1;
    this.setState((prevState) => ({
      carrinho: [...prevState.carrinho, item],
    }), this.addCarrinhoAsync);
  };

  render() {
    const { produtoId, email, comment, rating } = this.state;
    console.log(rating);
    return (

      <section className=" bg-gray-200 min-h-screen ">
        <HeaderSecundario />

        <div className="flex product-container">

          <div className="item-card">
            <Link to="/CarrinhoDeCompras" data-testid="product-detail-link">
              <div
                data-testid="product-detail-image"
                className="item-card img"
              >
                <img
                  className="product-image"
                  alt="Produto"
                  src={ produtoId.thumbnail }
                />
              </div>
            </Link>
          </div>
          <div />
          <div className="flex flex-col items-center">

            <h3
              className="product-name"
              data-testid="product-detail-name"
            >
              {produtoId.title}

            </h3>
            <p
              className="product-price"
              data-testid="product-detail-price"
            >
              {`Preço: ${produtoId.price}`}

            </p>

          </div>
          <button
            type="button"
            data-testid="product-detail-add-to-cart"
            onClick={ () => this.addCarrinho(produtoId) }
            className="buy-button rounded-sm"

          >
            Adicionar ao carrinho

          </button>
        </div>
        <form className="review-form">
          <label htmlFor="emailInput">

            <input
              onChange={ this.handleChange }
              name="email"
              data-testid="product-detail-email"
              id="emailInput"
              type="text"
              value={ email }
              className="email-input"
              placeholder="Email"
            />
          </label>

          <label htmlFor="commentForm">

            <textarea
              className="comment-input"
              onChange={ this.handleChange }
              name="comment"
              data-testid="product-detail-evaluation"
              id="commentForm"
              type="text"
              placeholder="Comentarios"
              value={ comment }
            />
          </label>
          <div className="flex">

            <label className="rating-label" htmlFor="nota1">
              <input
                className="rating-input"
                onClick={ () => {
                  this.setState({
                    rating: 1,
                  });
                } }
                data-testid="1-rating"
                type="radio"
                id="nota1"
                name="rating"
              />
              1
            </label>
            <label className="rating-label" htmlFor="nota2">
              {' '}
              <input
                className="rating-input"
                onClick={ () => {
                  this.setState({
                    rating: 2,
                  });
                } }
                data-testid="2-rating"
                type="radio"
                id="nota2"
                name="rating"
              />
              2
            </label>
            <label className="rating-label" htmlFor="nota3">
              <input
                className="rating-input"
                onClick={ () => {
                  this.setState({
                    rating: 3,
                  });
                } }
                data-testid="3-rating"
                type="radio"
                id="nota3"
                name="rating"

              />
              3
            </label>
            <label className="rating-label" htmlFor="nota4">
              <input
                className="rating-input"
                onClick={ () => {
                  this.setState({
                    rating: 4,
                  });
                } }
                data-testid="4-rating"
                type="radio"
                id="nota4"
                name="rating"
              />
              4
            </label>
            <label className="rating-label" htmlFor="nota5">
              {' '}
              <input
                className="rating-input"
                onClick={ () => {
                  this.setState({
                    rating: 5,
                  });
                } }
                data-testid="5-rating"
                type="radio"
                id="nota5"
                name="rating"
              />
              5
            </label>
          </div>
          <button
            className="submit-button rounded-sm"
            type="submit"
            data-testid="submit-review-btn"
          >
            Enviar

          </button>
        </form>
        <Footer />
      </section>

    );
  }
}

ProdutoDetalhes.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
    location: PropTypes.string,
  }).isRequired,
};
