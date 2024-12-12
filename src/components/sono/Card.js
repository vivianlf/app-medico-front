import React from 'react';
import './Card.css';
import Axios from 'axios';

function Card(props) {
  const clickRemove = async () => {
    Axios.delete("http://localhost:3000/sono/" + props.id)
      .then(() => {
        props.setListDomain(
          props.listDomain.filter((value) => {
            return value.id !== props.id;
          })
        );
      })
      .catch(function (error) {
        console.log(error.response.data);
      });
  };

  return (
    <div className='card-container'>
      <button className='card-domain' onClick={clickRemove}>
        Remover
        </button>
      <p className='card-domain'>Qualidade do Sono: {props.qualidadeSono}</p>
      <p className='card-domain'>Horário do Sono: {props.horarioSono}</p>
      <p className='card-domain'>Indução do Sono: {props.inducaoSono}</p>
      <p className='card-domain'>Manutenção do Sono: {props.manutencaoSono}</p>
      <p className='card-domain'>Despertar do Sono: {props.despertarSono}</p>
      <p className='card-domain'>Dorme Bem: {props.dormeBem}</p>
    </div>
  );
}

export default Card;