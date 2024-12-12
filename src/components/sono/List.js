import React, { useState } from 'react';
import Create from './Create';

const ListSono = () => {
  const [listDomain, setListDomain] = useState([]);

  // Remova ou comente o código relacionado à requisição GET
  /*
  useEffect(() => {
    Axios.get('http://localhost:3000/sono')
      .then(function (response) {
        setListDomain(response.data);
      })
      .catch(function (error) {
        console.log(error.response.data);
      });
  }, []);
  */

  return (
    <div className='list-container'>
      <Create listDomain={listDomain} setListDomain={setListDomain} />
      {listDomain.length > 0 && (
        <ul>
          {listDomain.map((item) => (
            <li key={item.id}>{item.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ListSono;