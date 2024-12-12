import React, { useState, useEffect } from 'react';
import './List.css';
import Axios from 'axios';
import Card from './Card';
import Create from './Create';

function List() {
  const [listDomain, setListDomain] = useState([]);
  
  useEffect(() => {
    Axios.get('http://localhost:3000/sono/all')
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
              qualidadeSono={value.qualidadeSono}
              horarioSono={value.horarioSono}
              inducaoSono={value.inducaoSono}
              manutencaoSono={value.manutencaoSono}
              despertarSono={value.despertarSono}
              dormeBem={value.dormeBem}
              listDomain={listDomain}
              setListDomain={setListDomain}
            />
          );
        })}
    </div>
  );
}

export default List;