import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import logo from '../assets/logo.png';

class Header extends React.Component {
  state = {
    inputValor: '',
  };

  handleChange = (event) => {
    const { onPesquisaChange } = this.props;
    const { value } = event.target;
    this.setState({ inputValor: value });
    if (onPesquisaChange) {
      onPesquisaChange(event);
    }
  };

  render() {
    const { onPesquisaSubmit, carrinhoQuantidade } = this.props;
    const { inputValor } = this.state;

    return (
      <div>
        <header className="bg-sky-800 py-3 px-4 md:px-10 mb-4">
          <nav className="flex flex-col md:flex-row justify-between items-center">
            <Link to="/">
              <img src={ logo } alt="frontend online store logo" className="w-48" />
            </Link>
            <form className="flex justify-between mt-8">
              <div className="flex flex-grow mr-2">
                <input
                  className="w-100% max-w-[50rem] mb-10  flex rounded-sm w-70"
                  data-testid="query-input"
                  value={ inputValor }
                  name="pesquisa"
                  onChange={ this.handleChange }
                  type="text"
                  placeholder="Digite seu produto"
                />
                <button
                  onClick={ onPesquisaSubmit }
                  type="button"
                  data-testid="query-button"
                  className="bg-teal-500 text-white font-bold rounded-sm
                  px-4  max-w-[50rem] mb-10 flex-none"
                >
                  <span
                    className="material-symbols-outlined
                  p-2 font-bold"
                  >
                    search

                  </span>
                </button>
              </div>
            </form>

            <button
              data-testid="shopping-cart-button"
              type="button"
              name="btCarrinho"
              className="ml-4 carrinho md:order-last"
            >
              <Link to="/carrinhodecompras">

                <span
                  className="material-symbols-outlined w- fill-current
                  text-white "
                >
                  shopping_cart
                </span>
                <span
                  className="bg-red-500 px-1 rounded-full
                 text-white font-bold text-sm"
                >
                  {carrinhoQuantidade}
                </span>

              </Link>
            </button>
          </nav>
        </header>
      </div>
    );
  }
}

Header.propTypes = {
  onPesquisaChange: PropTypes.func,
  onPesquisaSubmit: PropTypes.func,
  carrinhoQuantidade: PropTypes.number.isRequired,
};

Header.defaultProps = {
  onPesquisaChange: () => {},
  onPesquisaSubmit: () => {},
};

export default Header;
