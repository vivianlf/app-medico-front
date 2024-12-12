import React, { useState } from 'react';
import './List.css';
import Card from './Card';
import Update from './Update';

function ListUpdate() {
  const [listDomain, setListDomain] = useState([]);

  return (
    <div className='list-container'>
      <Update listDomain={listDomain} setListDomain={setListDomain} />
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

export default ListUpdate;
