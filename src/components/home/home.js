import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home-container">
        <div className="button-container">
        <h1 className="domain-title">Bem-vindo ao App Médico</h1>
        </div>
      <div className="button-container">
        <button
          className="btn-navegacao"
          onClick={() => navigate('/habitos/create')}
        >
          Cadastrar Hábitos Alimentares
        </button>
        <button
          className="btn-navegacao"
          onClick={() => navigate('/habitos/update')}
        >
          Atualizar Hábitos Alimentares
        </button>
        <button
          className="btn-navegacao"
          onClick={() => navigate('/sono')}
        >
          Sono
        </button>
      </div>
    </div>
  );
};

export default Home;
