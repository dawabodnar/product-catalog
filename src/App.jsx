import {fetchProducts} from './utils/api';
import {useEffect, useState} from 'react';
import ProductList from './components/ProductList';

function App() {
const [products, setProducts] = useState([]);
const [error, setError]= useState("");
const [status, setStatus]=useState('loading');

useEffect(()=> {
  let cancelled = false;

  async function load (){
  setStatus('loading');
  try{
    const data = await fetchProducts();
    if(!cancelled){
      setProducts(data);
      setStatus('success');
    }
  } catch (error){
    if(cancelled) {
      setError(error.message);
      setStatus('error');
    }
  }
  }
  load();
  return () =>{
     cancelled = true;
  };
}, []);

  return (
   <div className="app">
    <header className="app-header">
      <h1>Каталог продукції</h1>
    </header>
    <main className="app-main"> 
      {status === 'loading' && <p>Завантаження…</p>}
      {status === 'error' && <p role="alert">Помилка завантаження: {error}</p>}
      {status === 'success' && <ProductList products={products}/>}
    </main>
   </div>
  )
}

export default App
