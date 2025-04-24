const React = require('react');
const ReactDOM = require('react-dom/client');
const { BrowserRouter } = require('react-router-dom');
const App = require('./App');
require('./index.css');

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
); 