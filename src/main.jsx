import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { PostCodeProvider } from '../Contex store/ContextStore.jsx';

createRoot(document.getElementById('root')).render(
  <PostCodeProvider>
    <StrictMode>
      <App />
    </StrictMode>
  </PostCodeProvider>,
)
