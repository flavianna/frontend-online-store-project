import { Component } from 'react';
import HeaderSecundario from '../components/HeaderSecundario';
import Footer from '../components/Footer';

export default class CarrinhoDeCompras extends Component {
  state = { carrinho: [], total: 0 };

  componentDidMount() {
    const carrinhoJson = localStorage.getItem('carrinhoLocalStorage');
    if (carrinhoJson !== null) {
      const carrinho = JSON.parse(carrinhoJson);
      const total = this.calcularTotal(carrinho);
      this.setState({ carrinho, total });
    }
  }

  atualizaCarrinhoLocalStorage = (carrinho) => {
    localStorage.setItem('carrinhoLocalStorage', JSON.stringify(carrinho));
  };

  calcularTotal = (carrinho) => carrinho
    .reduce((total, item) => total + item.price * item.quantidade, 0);

  addItem = (item) => {
    const magicNumber = 1;
    const { carrinho } = this.state;
    const index = carrinho.findIndex((e) => e.id === item.id);
    if (index !== -magicNumber) {
      carrinho[index].quantidade += 1;
    } else {
      carrinho.push({ ...item, quantidade: 1 });
    }
    const total = this.calcularTotal(carrinho);
    this.setState({ carrinho, total }, () => {
      localStorage.setItem('carrinhoLocalStorage', JSON.stringify(carrinho));
    });
  };

  decreaseItem = (item) => {
    // const magicNumber = 1;
    const { carrinho } = this.state;
    const index = carrinho.findIndex((e) => e.id === item.id);
    if (index >= 0) {
      if (carrinho[index].quantidade > 1) {
        carrinho[index].quantidade -= 1; // diminui a quantidade em 1
      } // não precisa do else, já que se a quantidade for igual a 1 não faz nada
      const total = this.calcularTotal(carrinho);
      this.setState({ carrinho, total }, () => {
        localStorage.setItem('carrinhoLocalStorage', JSON.stringify(carrinho));
      });
    }
  };

  removeItem = (item) => {
    const { carrinho } = this.state;
    const novoCarrinho = carrinho.filter((carrinhoItem) => carrinhoItem.id !== item.id);
    const total = this.calcularTotal(novoCarrinho);
    this.setState({ carrinho: novoCarrinho, total }, () => {
      this.atualizaCarrinhoLocalStorage(novoCarrinho);
    });
  };

  render() {
    const { carrinho, total } = this.state;
    return (
      <div className="carrinho-de-compras">
        <HeaderSecundario />
        {carrinho.length === 0 ? (
          <p data-testid="shopping-cart-empty-message">Seu carrinho está vazio</p>
        ) : (
          <section className="product-container">
            <div className="flex flex-col items-start ml-5">
              {carrinho.map((item) => (
                <div key={ item.id }>
                  <div className="flex items-center">
                    <img alt="Produto" src={ item.thumbnail } />
                    <p data-testid="shopping-cart-product-name ">{item.title}</p>
                  </div>
                  <div className="flex justify-center items-center">
                    <p className="font-bold">{`R$ ${item.price}`}</p>
                    <div className="flex items-center">

                      <button
                        onClick={ () => this.addItem(item) }
                        type="button"
                        data-testid="product-increase-quantity"
                        className="text-teal-500 font-semibold
                        rounded p-1 px-3 mr-1  max-w-[50rem]"
                      >
                        +
                      </button>
                      <p
                        data-testid="shopping-cart-product-quantity"
                        className="font-semibold text-sm"
                      >

                        {`${item.quantidade}`}

                      </p>
                      <button
                        onClick={ () => this.decreaseItem(item) }
                        type="button"
                        data-testid="product-decrease-quantity"
                        className=" text-red-400 font-semibold rounded
                        p-1 px-3 mr-1  max-w-[50rem] "
                      >
                        -
                      </button>
                      <button
                        onClick={ () => this.removeItem(item) }
                        type="button"
                        data-testid="remove-product"
                        className="fill-current text-red-600 mt-1  max-w-[50rem] "
                      >
                        <span className="material-symbols-outlined">
                          delete_forever
                        </span>
                      </button>
                    </div>
                  </div>
                  <hr className="mt-4 mb-4" />
                </div>
              ))}
            </div>
            <h1 className=" text-xl font-bold">
              Valor total:
              {` US$ ${total}`}
            </h1>
          </section>
        )}
        <Footer />
      </div>
    );
  }
}
