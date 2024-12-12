import React, { useState } from 'react';
import './Create.css';
import Axios from 'axios';
import habitosIcon from '../../assets/habitosicon.png';

function Update(props) {
  const [values, setValues] = useState({
    pacienteId: '',
    compulsaoAlimentar: false,
    gostaDocesAlcool: false,
    fomeNoturna: false,
    fomeEmocional: false,
    habitoBeliscador: false,
  });

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [message, setMessage] = useState('');

  const questions = [
    { id: 'compulsaoAlimentar', text: 'Você tem compulsão alimentar?' },
    { id: 'gostaDocesAlcool', text: 'Você gosta de doces ou consome álcool com frequência?' },
    { id: 'fomeNoturna', text: 'Você sente fome noturna frequentemente?' },
    { id: 'fomeEmocional', text: 'Você sente fome emocional?' },
    { id: 'habitoBeliscador', text: 'Você tem o hábito de beliscar alimentos ao longo do dia?' },
  ];

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setValues({
      ...values,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleAnswer = (answer) => {
    const currentId = questions[currentQuestion].id;
    setValues({ ...values, [currentId]: answer });
  };

  const goToNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      clickUpdate();
    }
  };

  const goToPreviousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

 const clickGet = async () => {
    try {
        const response = await Axios.get(`http://localhost:3000/habitosalimentares/${encodeURIComponent(Number(values.pacienteId))}`);

      console.log("resposta:", response);
  
      // Verifica se há dados retornados no array
      if (response.data.length > 0) {
        const habito = response.data[0]; // Obtém o primeiro hábito do array
        setValues({
          pacienteId: habito.pacienteId,
          compulsaoAlimentar: habito.compulsaoAlimentar,
          gostaDocesAlcool: habito.gostaDocesAlcool,
          fomeNoturna: habito.fomeNoturna,
          fomeEmocional: habito.fomeEmocional,
          habitoBeliscador: habito.habitoBeliscador,
        });
  
        setMessage('Dados do hábito alimentar carregados com sucesso!');
        console.log('Hábito alimentar carregado:', habito);
        return habito; // Retorna o JSON com os dados
      } else {
        setMessage('Nenhum hábito alimentar encontrado para o paciente.');
      }
    } catch (error) {
      console.log('Erro ao buscar hábito alimentar:', error);
      if (error.response && error.response.status === 404) {
        setMessage('Nenhum hábito alimentar encontrado para o paciente.');
      } else if (error.response && error.response.data) {
        setMessage('Erro ao buscar hábito alimentar: ' + JSON.stringify(error.response.data));
      } else {
        setMessage('Erro ao buscar hábito alimentar: ' + error.message);
      }
    }
  };
  

  const clickRemove = async () => {
    try {
      await Axios.delete(`http://localhost:3000/habitosalimentares/${Number(values.pacienteId)}`);
      props.setListDomain(
        props.listDomain.filter((value) => value.pacienteId !== Number(values.pacienteId))
      );
      setMessage('Hábitos alimentares deletados com sucesso!');
    } catch (error) {
      console.log('Erro ao deletar hábitos alimentares:', error);
      if (error.response && error.response.data) {
        setMessage('Erro ao deletar hábitos alimentares: ' + JSON.stringify(error.response.data));
      } else {
        setMessage('Erro ao deletar hábitos alimentares: ' + error.message);
      }
    }
  };

  const clickUpdate = async () => {
    try {
      const response = await Axios.put(`http://localhost:3000/habitosalimentares/${Number(values.pacienteId)}`, {
        pacienteId: Number(values.pacienteId),
        compulsaoAlimentar: values.compulsaoAlimentar,
        gostaDocesAlcool: values.gostaDocesAlcool,
        fomeNoturna: values.fomeNoturna,
        fomeEmocional: values.fomeEmocional,
        habitoBeliscador: values.habitoBeliscador,
      });

      props.setListDomain((prevListDomain) =>
        prevListDomain.map((item) => item.pacienteId === Number(values.pacienteId) ? response.data : item)
      );
      setMessage('Hábito alimentar atualizado com sucesso!');
    } catch (error) {
      console.log('Erro ao atualizar hábito alimentar:', error);
      if (error.response && error.response.data) {
        setMessage('Erro ao atualizar hábito alimentar: ' + JSON.stringify(error.response.data));
      } else {
        setMessage('Erro ao atualizar hábito alimentar: ' + error.message);
      }
    }
  };

  const handleCaptureId = async () => {
    if (!values.pacienteId) {
      alert('Por favor, insira um ID válido antes de capturar.');
      return;
    }
  
    console.log('ID Capturado:', values.pacienteId);
    alert(`ID Capturado: ${values.pacienteId}`);
  
    await clickGet();
  };

  return (
    <div className="questionario-container">

      <div className="paciente-id-container">
        <label htmlFor="pacienteId">ID do Paciente:</label>
        <input
          type="text"
          id="pacienteId"
          value={values.pacienteId}
          onChange={handleChange}
          name="pacienteId"
          placeholder="Digite o ID do paciente"
          className="input-field"
        />
        <button
          onClick={handleCaptureId}
          className="btn-capture-id"
        >
          Capturar
        </button>
      </div>
      <h1 className="domain-title">Atualizar Hábitos Alimentares</h1>


      {currentQuestion < questions.length ? (
        <>
          <h2 className="question-text">{questions[currentQuestion].text}</h2>
          <div className="button-container">
            <button
              onClick={() => handleAnswer(true)}
              className={`btn-sim ${values[questions[currentQuestion].id] === true ? 'active' : ''}`}
            >
              Sim
            </button>
            <button
              onClick={() => handleAnswer(false)}
              className={`btn-nao ${values[questions[currentQuestion].id] === false ? 'active' : ''}`}
            >
              Não
            </button>

          </div>
        </>
      ) : (
        <button onClick={clickUpdate} className="btn-save">
          Salvar
        </button>
      )}

      <div className="icon-container">
        <img src={habitosIcon} alt="Hábitos Alimentares" className="habitos-icon" />
      </div>

      <div className="navigation-container">
        <button
          onClick={goToPreviousQuestion}
          className="btn-navegacao"
          disabled={currentQuestion === 0}
        >
          Anterior
        </button>
        <button
          onClick={goToNextQuestion}
          className="btn-navegacao"
        >
          {currentQuestion < questions.length - 1 ? "Próximo" : "Finalizar"}
        </button>

      </div>

      <div className="button-container">
          <p
            onClick={clickRemove}
            className="limpar-dados"
          >
            Limpar meus dados
          </p>

        </div>

      {message && <p className="message">{message}</p>}
    </div>
  );
}

export default Update;
