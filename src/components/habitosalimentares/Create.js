import React, { useState } from 'react';
import './Create.css';
import Axios from 'axios';
import habitosIcon from '../../assets/habitosicon.png';

function Create(props) {
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
      clickCreate();
    }
  };

  const goToPreviousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };



  const clickCreate = async () => {
    try {
      const response = await Axios.post(`http://localhost:3000/habitosalimentares/${Number(values.pacienteId)}`, {
        pacienteId: Number(values.pacienteId),
        compulsaoAlimentar: values.compulsaoAlimentar,
        gostaDocesAlcool: values.gostaDocesAlcool,
        fomeNoturna: values.fomeNoturna,
        fomeEmocional: values.fomeEmocional,
        habitoBeliscador: values.habitoBeliscador,
      });

      props.setListDomain((prevListDomain) => [...prevListDomain, response.data]);
      setMessage('Hábito alimentar criado com sucesso!');
    } catch (error) {
      console.log(error);
      if (error.response && error.response.data) {
        setMessage('Erro ao criar hábito alimentar: ' + JSON.stringify(error.response.data));
      } else {
        setMessage('Erro ao criar hábito alimentar: ' + error.message);
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

  const handleCaptureId = () => {
    console.log('ID Capturado:', values.pacienteId);
    alert(`ID Capturado: ${values.pacienteId}`);
    // Aqui você pode implementar qualquer outra lógica para capturar o ID do paciente
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
      <h1 className="domain-title">Cadastro de Hábitos Alimentares</h1>


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
        <button onClick={clickCreate} className="btn-save">
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

      {message && <p className="message">{message}</p>}
    </div>
  );
}

export default Create;
