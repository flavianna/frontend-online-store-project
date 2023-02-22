import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';

class HeaderSecundario extends React.Component {
  render() {
    return (
      <div>
        <header className="bg-sky-800 py-3 px-4 md:px-10 mb-4">
          <nav className="flex justify-between items-center flex-wrap">
            <Link to="/">
              <img src={ logo } alt="frontend online store logo" className="w-48 ml-14" />
            </Link>

            <div className="flex">
              <button
                data-testid="shopping-cart-button"
                type="button"
                name="btCarrinho"
                className="mr-11"
              >
                <Link to="/carrinhodecompras">
                  <span
                    className="material-symbols-outlined w- fill-current text-white "
                  >
                    shopping_cart

                  </span>
                </Link>
              </button>
            </div>
          </nav>
        </header>
      </div>
    );
  }
}

export default HeaderSecundario;
