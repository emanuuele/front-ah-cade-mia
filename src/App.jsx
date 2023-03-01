import { router } from './routes'
import { RouterProvider } from 'react-router-dom';
import './style.css'
import Header from './components/Header';
function App() {
  return (
    <div className="App">
      <Header/>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
