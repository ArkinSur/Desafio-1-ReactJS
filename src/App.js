import React, { useState, useEffect } from "react";
import api from './services/api';

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([])

  useEffect(() => {
    api.get('/repositories').then(response => {
      setRepositories(response.data)
    })
  }, [])

  async function handleAddRepository() {
    const obj = { 
      title: 'Novo Repositório', 
      url: 'https://github.com/ArkinSur/RepostApp', 
      techs: ['React Native', 'Firebase'] }
  const response = await api.post('/repositories', obj)
   const array = [...repositories, response.data]
   setRepositories(array)
  }

  async function handleRemoveRepository(id) {
    // TODO
  }

  return (
    <div>
      <ul data-testid="repository-list">
        { repositories.map(item => {

          return (
          <li key={item.id}>
            {item.title}
  
            <button onClick={() => handleRemoveRepository(1)}>
              Remover
            </button>
          </li>)
        }) }
        
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
