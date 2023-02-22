import React from 'react';

export default class Footer extends React.Component {
  render() {
    return (
      <div className="flex items-center flex-col mt-40 mb-10">
        <span className="font-bold mb-2">Desenvolvido por</span>
        <ul className="text-center md:flex md:gap-4">
          <li className="hover:underline">
            <h1>Gabriel Palhares</h1>
          </li>
          <li className="hover:underline">
            <h1>Gilmara Lopes</h1>
          </li>
          <li className="hover:underline">
            <h1>Kayo Henricky</h1>
          </li>
          <li className="hover:underline">
            <h1>Flavianna Bezerra</h1>
          </li>
          <li className="hover:underline">
            <h1>Roger Pontes</h1>
          </li>
        </ul>
      </div>
    );
  }
}
