import { router } from './routes'
import { RouterProvider } from 'react-router-dom';
import './style.css'
function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
