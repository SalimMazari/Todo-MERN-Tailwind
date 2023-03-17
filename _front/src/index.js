import ReactDOM from 'react-dom/client';
import { StrictMode } from 'react';
import App from './App'


//Affiche(=render) le composant App dans la div ROOT de index.html

const rootElement = document.getElementById("root")

ReactDOM.createRoot(rootElement).render(
    <StrictMode>
        <App />
    </StrictMode>
)