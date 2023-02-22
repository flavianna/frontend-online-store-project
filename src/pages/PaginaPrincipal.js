import PropTypes from 'prop-types';
import React from 'react';
import Header from '../components/Header';
import ItemCard from '../components/ItemCard';
import Footer from '../components/Footer';

import {
  getCategories,
  getProductsFromCategoryAndQuery,
} from '../services/api';

class PaginaPrincipal extends React.Component {
  state = {
    pesquisa: '',
    categoriaID: '',
    categorias: [],
    itensLoja: [],
    mostrarItens: true,
    carrinho: [],
    carrinhoQuantidade: 0,
    categoriaAtiva: '',
  };

  async componentDidMount() {
    this.setState({ categorias: await getCategories() });
  }

  calcularCarrinhoQuantidade = () => {
    const { carrinho } = this.state;
    return carrinho.reduce((quantidade, item) => quantidade + item.quantidade, 0);
  };

  handleChange = ({ target }) => {
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;

    this.setState({
      [name]: value,
    });
  };

  renderizaItens = async () => {
    const { categoriaID, pesquisa } = this.state;
    const resultadoPesquisa = await
    getProductsFromCategoryAndQuery(categoriaID, pesquisa);
    this.setState({
      itensLoja: resultadoPesquisa.results,
      mostrarItens: true,
    });
  };

  clickCategoria = (item) => {
    this.setState({ categoriaID: item, categoriaAtiva: 'btn-category-active' }, () => {
      this.renderizaItens();
    });
  };

  addCarrinhoAsync = () => {
    const { carrinho } = this.state;
    localStorage.setItem('carrinhoLocalStorage', JSON.stringify(carrinho));
    this.setState({ carrinhoQuantidade: this.calcularCarrinhoQuantidade() });
  };

  addCarrinho = (item) => {
    item.quantidade = 1;
    this.setState((prevState) => ({
      carrinho: [...prevState.carrinho, item],
    }), this.addCarrinhoAsync);
  };

  render() {
    const { pesquisa,
      categorias,
      itensLoja,
      mostrarItens,
      carrinhoQuantidade } = this.state;
    return (
      <>
        <Header
          pesquisa={ pesquisa }
          onPesquisaChange={ this.handleChange }
          onPesquisaSubmit={ this.renderizaItens }
          carrinhoQuantidade={ carrinhoQuantidade }
        />
        <ul className="categorias-container">
          <hr className="mt-2 mb-2" />
          <h1 className="font-bold break-before-column">Explore as Categorias</h1>
          {categorias.map((item) => (
            <button
              key={ item.id }
              onClick={ () => this.clickCategoria(item.id) }
              className={ this.state.categoriaID === item.id
                ? this.state.categoriaAtiva : '' }
              data-testid="category"
              name={ item.name }
              type="button"
            >
              {item.name}
            </button>
          ))}

        </ul>

        <div className="items-container flex flex-wrap items-center bg-gray-200">
          {itensLoja.length > 1 && mostrarItens === true ? (
            itensLoja.map((item) => (
              <ItemCard
                key={ item.id }
                item={ item }
                onAddToCart={ this.addCarrinho }
              />
            ))
          ) : (
            <p>Nenhum produto foi encontrado.</p>
          )}
        </div>
        <footer className=" bottom-0 w-full">
          <Footer />
        </footer>
      </>

    );
  }
}

PaginaPrincipal.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default PaginaPrincipal;
