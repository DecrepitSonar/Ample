import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/index.css'
import './styles/index.css';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from "react-redux"
import { store } from './utils/store';


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>
  </StrictMode>,
)
