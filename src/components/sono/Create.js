import React, { useState } from 'react';
import './Create.css';
import Axios from 'axios';

function Create(props) {
  const [values, setValues] = useState({
    pacienteId: '', 
    qualidadeSono: '', 
    horarioSono: '',
    inducaoSono: '',
    manutencaoSono: '',
    despertarSono: '',
    dormeBem: false, 
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
      const response = await Axios.post('http://localhost:3000/sono', {
        pacienteId: Number(values.pacienteId), // Convertendo para número
        qualidadeSono: values.qualidadeSono,
        horarioSono: values.horarioSono,
        inducaoSono: values.inducaoSono,
        manutencaoSono: values.manutencaoSono,
        despertarSono: values.despertarSono,
        dormeBem: values.dormeBem,
      });

      props.setListDomain((prevListDomain) => [...prevListDomain, response.data]);
      setMessage('Registro de sono criado com sucesso!');
    } catch (error) {
      console.log(error);
      if (error.response && error.response.data) {
        setMessage('Erro ao criar registro de sono: ' + JSON.stringify(error.response.data));
      } else {
        setMessage('Erro ao criar registro de sono: ' + error.message);
      }
    }
  };

  const clickRemove = async () => {
    try {
      const pacienteId = Number(values.pacienteId);
      console.log('Deleting sono with pacienteId:', pacienteId); 
      await Axios.delete(`http://localhost:3000/sono/${pacienteId}`);
      props.setListDomain(
        props.listDomain.filter((value) => value.pacienteId !== pacienteId)
      );
      setMessage('Sono deletados com sucesso!');
    } catch (error) {
      console.log('Erro ao deletar sono:', error);
      if (error.response && error.response.data) {
        setMessage('Erro ao deletar sono: ' + JSON.stringify(error.response.data));
      } else {
        setMessage('Erro ao deletar sono: ' + error.message);
      }
    }
  };

  const clickUpdate = async () => {
    try {
      const response = await Axios.put(`http://localhost:3000/sono/${Number(values.pacienteId)}`, {
        pacienteId: Number(values.pacienteId), // Convertendo para número
        qualidadeSono: values.qualidadeSono,
        horarioSono: values.horarioSono,
        inducaoSono: values.inducaoSono,
        manutencaoSono: values.manutencaoSono,
        despertarSono: values.despertarSono,
        dormeBem: values.dormeBem,
      });

      props.setListDomain((prevListDomain) => {
        return prevListDomain.map((item) => {
          if (item.pacienteId === Number(values.pacienteId)) {
            return response.data;
          }
          return item;
        });
      });
      setMessage('Sono atualizado com sucesso!');
    } catch (error) {
      console.log('Erro ao atualizar sono:', error);
      if (error.response && error.response.data) {
        setMessage('Erro ao atualizar sono: ' + JSON.stringify(error.response.data));
      } else {
        setMessage('Erro ao atualizar sono: ' + error.message);
      }
    }
  };

  return (
    <div className='create-container'>
      <h1 className='domain-title'>Cadastro de Sono</h1>
      <form onSubmit={(e) => { e.preventDefault(); clickCreate(); }}>
        <input
          type="text"
          name="pacienteId"
          value={values.pacienteId}
          onChange={handleChange}
          placeholder="ID do Paciente"
        />
        <input
          type="text"
          name="qualidadeSono"
          value={values.qualidadeSono}
          onChange={handleChange}
          placeholder="Qualidade do Sono"
        />
        <input
          type="text"
          name="horarioSono"
          value={values.horarioSono}
          onChange={handleChange}
          placeholder="Horário do Sono"
        />
        <input
          type="text"
          name="inducaoSono"
          value={values.inducaoSono}
          onChange={handleChange}
          placeholder="Indução do Sono"
        />
        <input
          type="text"
          name="manutencaoSono"
          value={values.manutencaoSono}
          onChange={handleChange}
          placeholder="Manutenção do Sono"
        />
        <input
          type="text"
          name="despertarSono"
          value={values.despertarSono}
          onChange={handleChange}
          placeholder="Despertar do Sono"
        />
        <label>
          Dificuldade para Dormir:
          <input
            type="checkbox"
            name="dormeBem"
            checked={values.dificuldadeDormir}
            onChange={handleChange}
          />
        </label>
        <button type="submit">Criar Registro de Sono</button>
      </form>
      <button onClick={clickRemove}>Limpar Sono</button>
      <button onClick={clickUpdate}>Atualizar Sono</button>
      {message && <p>{message}</p>}
    </div>
  );
}

export default Create;