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
    await api.delete(`/repositories/${id}`)
    const index = repositories.findIndex(item => item.id === id)
    if (index !== -1) {
      repositories.splice(index, 1)
      const array = [...repositories]
      setRepositories(array)
    }
  }

  return (
    <div>
      <ul data-testid="repository-list">
        { repositories.map(item => {

          return (
          <li key={item.id}>
            {item.title}
  
            <button onClick={() => handleRemoveRepository(item.id)}>
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
