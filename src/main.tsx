import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  RouterProvider,
  createBrowserRouter,
  Route,
  createRoutesFromElements,
} from 'react-router-dom';
import './index.css';
import Home from './pages/home';
import Header from './components/header';
import Footer from './components/footer';

const router = createBrowserRouter(
  createRoutesFromElements(
    <React.Fragment>
      <Route path="/" element={<Home />} />
    </React.Fragment>
  )
);

const rootElement = document.getElementById('root');
if (rootElement) {
  rootElement.style.height = "100vh";
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <Header />
      <RouterProvider router={router} />
      <Footer />
    </React.StrictMode>
  );
}
