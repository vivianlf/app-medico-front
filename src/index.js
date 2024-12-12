import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css';
import Home from './components/home/home'; // Tela inicial
import List from './components/habitosalimentares/List'; // Tela de listagem
import ListUpdate from './components/habitosalimentares/ListUpdate';
import ListSono from './components/sono/List';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<Home />} /> {/* Tela inicial */}
        <Route path="/habitos/list" element={<List />} /> {/* Tela de listagem */}
        <Route path="/habitos/create" element={<List />} /> {/* Tela de criação */}
        <Route path="/habitos/update" element={<ListUpdate />} /> {/* Tela de atualização */}
        <Route path="/sono" element={<ListSono />} /> {/* Tela de listagem */}
      </Routes>
    </Router>
  </React.StrictMode>
);
