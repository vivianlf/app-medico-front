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
      const response = await Axios.post(`http://localhost:3000/sono/${Number(values.pacienteId)}`, {
        pacienteId: Number(values.pacienteId),
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
      await Axios.delete(`http://localhost:3000/sono/${pacienteId}`);
      props.setListDomain(
        props.listDomain.filter((value) => value.pacienteId !== pacienteId)
      );
      setMessage('Sono deletado com sucesso!');
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
        pacienteId: Number(values.pacienteId),
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

  const clickGetDados = async () => {
    try {
      const response = await Axios.get(`http://localhost:3000/sono/${encodeURIComponent(Number(values.pacienteId))}`);
      const dados = response.data[0];
      setValues({
        pacienteId: Number(dados.pacienteId),
        qualidadeSono: dados.qualidadeSono,
        horarioSono: dados.horarioSono,
        inducaoSono: dados.inducaoSono,
        manutencaoSono: dados.manutencaoSono,
        despertarSono: dados.despertarSono,
        dormeBem: dados.dormeBem, // Adicione uma vírgula aqui
      });         
      setMessage('Dados do paciente obtidos com sucesso!', values);
    } catch (error) {
      console.log('Erro ao buscar dados do paciente:', error);
      if (error.response && error.response.data) {
        setMessage('Erro ao buscar dados do paciente: ' + JSON.stringify(error.response.data));
      } else {
        setMessage('Erro ao buscar dados do paciente: ' + error.message);
      }
    }
};

  return (
    <div className='create-container'>
      <h1 className='domain-title'>Meu Sono</h1>
      <form onSubmit={(e) => { e.preventDefault(); clickCreate(); }}>
        <label>ID do Paciente:</label>
        <input
          type="text"
          name="pacienteId"
          value={values.pacienteId}
          onChange={handleChange}
          placeholder={values.pacienteId || "Digite o ID do Paciente"}
        />

        <label>Qualidade do Sono:</label>
        <input
          type="text"
          name="qualidadeSono"
          value={values.qualidadeSono}
          onChange={handleChange}
          placeholder={values.qualidadeSono || "Como está a qualidade do sono?"}
        />

        <label>Horário do Sono:</label>
        <input
          type="text"
          name="horarioSono"
          value={values.horarioSono}
          onChange={handleChange}
          placeholder={values.horarioSono || "Informe o horário do sono"}
        />

        <label>Indução do Sono:</label>
        <input
          type="text"
          name="inducaoSono"
          value={values.inducaoSono}
          onChange={handleChange}
          placeholder={values.inducaoSono || "Como ocorre a indução do sono?"}
        />

        <label>Manutenção do Sono:</label>
        <input
          type="text"
          name="manutencaoSono"
          value={values.manutencaoSono}
          onChange={handleChange}
          placeholder={values.manutencaoSono || "Informe sobre a manutenção do sono"}
        />

        <label>Despertar do Sono:</label>
        <input
          type="text"
          name="despertarSono"
          value={values.despertarSono}
          onChange={handleChange}
          placeholder={values.despertarSono || "Como é o despertar do sono?"}
        />

        <label>
          Dificuldade para Dormir:
          <input
            type="checkbox"
            name="dormeBem"
            checked={values.dormeBem}
            onChange={handleChange}
          />
        </label>

        <button type="submit">Criar Registro de Sono</button>
      </form>
      <button onClick={clickRemove}>Deletar Registro de Sono</button>
      <button onClick={clickUpdate}>Atualizar Registro de Sono</button>
      <button onClick={clickGetDados}>Buscar Dados do Paciente</button>
      {message && <p>{message}</p>}
    </div>
  );
}

export default Create;