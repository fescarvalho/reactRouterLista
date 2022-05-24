import './App.css';
import { useState, useEffect } from 'react';
import { useFetch } from '../src/hooks/useFetch';

const url = 'http://localhost:3000/products';

function App() {
  const [products, setProducts] = useState([]);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');

  //1 - Resgatando dados
  //4 -custom Hook
  const { data: items, httpConfig, loading, error } = useFetch(url);

  /*   useEffect(() => {
    async function fetchData() {
      const res = await fetch(url);
      const json = await res.json();
      setProducts(json);
    }
    fetchData();
  }, []); */

  //2- Adcionando DADOS
  const handleSubmit = async (e) => {
    e.preventDefault();

    const product = {
      name,
      price,
    };

    /*  const res = await fetch(url, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(product),
    });

    const dataJson = await res.json();

    //3-Carregamento de dados dinamicos
    setProducts((prevProducts) => [...prevProducts, dataJson]); */

    //5 - refatorando POST
    httpConfig(product, 'POST');
    setName('');
    setPrice('');
  };

  const handleDelete = (id) => {
    httpConfig(id, 'DELETE');
  };

  return (
    <div className="App">
      <h1>Lista de Produtos</h1>
      {loading && <p>Carregando de dados...</p>}
      {error ? (
        <p>{error}</p>
      ) : (
        <ul className="lista-container">
          {items &&
            items.map((product) => (
              <li key={product.id}>
                {product.name} - R$ {product.price}
                <button
                  className="button"
                  onClick={() => handleDelete(product.id)}
                >
                  Excluir
                </button>
              </li>
            ))}
        </ul>
      )}

      <div className="add-product">
        <form onSubmit={handleSubmit}>
          <label>
            Nome:
            <input
              type="text"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </label>
          <label>
            Preço:
            <input
              type="number"
              name="price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </label>
          {loading ? (
            <input disabled type="submit" value="Aguarde" />
          ) : (
            <input type="submit" value="Enviar" />
          )}
        </form>
      </div>
    </div>
  );
}

export default App;
