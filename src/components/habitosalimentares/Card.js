import React from 'react';
import './Card.css';
import Axios from 'axios';

function Card(props) {
  const clickRemove = async () => {
    Axios.delete("http://localhost:3000/habitosalimentares/" + props.id)
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
      <p className='card-domain'>Compulsão Alimentar: {props.compulsaoAlimentar}</p>
      <p className='card-domain'>Gosta de Doces/Álcool: {props.gostaDocesAlcool}</p>
      <p className='card-domain'>Fome Noturna: {props.fomeNoturna}</p>
      <p className='card-domain'>Fome Emocional: {props.fomeEmocional}</p>
      <p className='card-domain'>Hábito Beliscador: {props.habitoBeliscador}</p>
    </div>
  );
}

export default Card;