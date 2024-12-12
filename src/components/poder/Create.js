import React, { useState } from 'react';
import './Create.css';
import Axios from 'axios';

function Create(props) {
  const [values, setValues] = useState({
    pacienteId: '', // Campo para armazenar o ID do paciente
    compulsaoAlimentar: false,
    gostaDocesAlcool: false,
    fomeNoturna: false,
    fomeEmocional: false,
    habitoBeliscador: false,
  });

  const [message, setMessage] = useState('');

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setValues({
      ...values,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const clickCreate = async () => {
    try {
      const response = await Axios.post('http://localhost:3000/habitosalimentares', {
        pacienteId: Number(values.pacienteId), // Convertendo para número
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
        props.listDomain.filter((value) => {
          return value.pacienteId !== Number(values.pacienteId);
        })
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

      props.setListDomain((prevListDomain) => {
        return prevListDomain.map((item) => {
          if (item.pacienteId === Number(values.pacienteId)) {
            return response.data;
          }
          return item;
        });
      });
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

  return (
    <div className='create-container'>
      <h1 className='domain-title'>Cadastro de Hábitos Alimentares</h1>
      <form onSubmit={(e) => { e.preventDefault(); clickCreate(); }}>
        <input
          type="text"
          name="pacienteId"
          value={values.pacienteId}
          onChange={handleChange}
          placeholder="ID do Paciente"
        />
        <label>
          Compulsão Alimentar:
          <input
            type="checkbox"
            name="compulsaoAlimentar"
            checked={values.compulsaoAlimentar}
            onChange={handleChange}
          />
        </label>
        <label>
          Gosta de Doces/Álcool:
          <input
            type="checkbox"
            name="gostaDocesAlcool"
            checked={values.gostaDocesAlcool}
            onChange={handleChange}
          />
        </label>
        <label>
          Fome Noturna:
          <input
            type="checkbox"
            name="fomeNoturna"
            checked={values.fomeNoturna}
            onChange={handleChange}
          />
        </label>
        <label>
          Fome Emocional:
          <input
            type="checkbox"
            name="fomeEmocional"
            checked={values.fomeEmocional}
            onChange={handleChange}
          />
        </label>
        <label>
          Hábito Beliscador:
          <input
            type="checkbox"
            name="habitoBeliscador"
            checked={values.habitoBeliscador}
            onChange={handleChange}
          />
        </label>
        <button type="submit">Criar Hábito Alimentar</button>
      </form>
      <button onClick={clickRemove}>Limpar Hábitos Alimentares</button>
      <button onClick={clickUpdate}>Atualizar Hábitos Alimentares</button>
      {message && <p>{message}</p>}
    </div>
  );
}

export default Create;