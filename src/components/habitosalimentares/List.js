import React, { useState, useEffect } from 'react';
import './ListHabitos.css';
import Axios from 'axios';
import Card from './Card';
import Create from './Create';

function List() {
  const [listDomain, setListDomain] = useState([]);
  
  useEffect(() => {
    Axios.get('http://localhost:3000/habitosalimentares/all')
      .then(function (response) {
        setListDomain(response.data);
      })
      .catch(function (error) {
        console.log(error.response.data);
      });
  }, []);

  return (
    <div className='list-container'>
      <Create listDomain={listDomain} setListDomain={setListDomain} />
      {listDomain.length > 0 &&
        listDomain.map((value) => {
          return (
            <Card
              key={value.id}
              compulsaoAlimentar={value.compulsaoAlimentar}
              gostaDocesAlcool={value.gostaDocesAlcool}
              fomeNoturna={value.fomeNoturna}
              fomeEmocional={value.fomeEmocional}
              habitoBeliscador={value.habitoBeliscador}
              listDomain={listDomain}
              setListDomain={setListDomain}
            />
          );
        })}
    </div>
  );
}

export default List;