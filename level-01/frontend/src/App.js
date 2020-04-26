import React, { useEffect, useState } from "react";
import api from "./services/api";

import "./styles.css";

function App() {
  const [repostiories, setRepositories] = useState([]);

  useEffect(() => {
    async function getRepositories() {
      const { status, data } = await api.get("/repositories");

      if (status === 200) setRepositories(data);
    }

    getRepositories();
  }, []);

  async function handleAddRepository() {
    const body = {
      title: `Desafio React ${Math.random().toFixed(5)}`,
      techs: ["Axios", "React"],
      url: "https://github.com/melquisedecfelipe",
    };

    const { data } = await api.post("repositories", body);

    setRepositories([...repostiories, data]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`/repositories/${id}`);

    const updatedRepostiories = repostiories.filter(
      (repository) => repository.id !== id
    );

    setRepositories(updatedRepostiories);
  }

  return (
    <div>
      <button onClick={handleAddRepository}>Adicionar</button>

      <ul data-testid="repository-list">
        {repostiories.map((repository) => (
          <li key={repository.id}>
            {repository.title}
            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
