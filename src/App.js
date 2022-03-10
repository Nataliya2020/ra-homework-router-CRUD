import './App.css';
import CardAdd from './components/CardAdd';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import HomePage from './components/HomePage';
import {useState} from 'react';
import ItemCard from "./components/ItemCard";
import EditCard from "./components/EditCard";
import {ContextUserMessage} from './components/context/contextUserMessage'

function App() {
  const [del, setDel] = useState(false);

  const delCard = (e, id) => {
    e.preventDefault();
    localStorage.removeItem('userMessage');

    fetch(`${process.env.REACT_APP_URL}/posts/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(id)
    }).then((response) => {
      if (!response.ok) {
        throw new Error("Ошибка!");
      }
    }).then(() => {
        setDel(true);
      }
    )
  }

  return (
    <ContextUserMessage.Provider value={{
      delCard,
      del,
      setDel,
      id: null,
      content: null,
      created: null,
      reload: false,
    }}>
      <Router>
        <Routes>
          <Route path="/ra-homework-router-CRUD" element={<HomePage/>}/>
          <Route path="/ra-homework-router-CRUD/posts/new" element={<CardAdd/>}/>
          <Route path="/ra-homework-router-CRUD/posts/:id" element={<ItemCard/>}/>
          <Route path="/ra-homework-router-CRUD/posts/edit" element={<EditCard/>}/>
        </Routes>
      </Router>
    </ContextUserMessage.Provider>
  );
}

export default App;
