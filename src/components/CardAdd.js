import {useState} from 'react';
import {Navigate} from 'react-router-dom';

const CardAdd = () => {
  const [message, setMessage] = useState(localStorage.getItem("userMessageAdd") || '');
  const [enterErrorStatus, setEnterErrorStatus] = useState(false);
  const [error, setError] = useState(false);
  const [clickSubmit, setClickSubmit] = useState(false);
  const [close, setClose] = useState(false);

  const handlerMessage = (e) => {
    setEnterErrorStatus(false);
    setMessage(e.target.value);
    localStorage.setItem("userMessageAdd", message);
  }

  const handlerSubmit = (e) => {
    e.preventDefault();

    if (message.trim() === '') {
      setEnterErrorStatus(true);
      return;
    }

    const form = document.querySelector('#form');

    const params = new FormData(form);
    params.append('id', '0');

    let body = {};
    for (let key of params.keys()) {
      body[key] = params.get(key);
    }

    fetch(`${process.env.REACT_APP_URL}/posts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body)
    }).then(response => {
      if (!response.ok) {
        throw new Error("Ошибка!");
      } else if (response.status === 204) {
        setError(false);
      }
    }).then(() => {
      setMessage('');
      setClickSubmit(true);
    })
      .catch((e) => {
        console.log(e);
      })

    localStorage.removeItem('userMessageAdd');
  }

  const handlerClose = (e) => {
    e.preventDefault();

    if (!message) {
      localStorage.setItem("userMessageAdd", '')
    } else {
      localStorage.setItem("userMessageAdd", message)
    }

    setClose(true);
  }

  return (
    <div className="card">
      <div className={"card-content"}>
        <nav className={"nav-card"}>
          <button className={"button button-close"} onClick={handlerClose}>X{close ?
            <Navigate to={"/ra-homework-router-CRUD"}/> : null}</button>
        </nav>
        <form className="form" id={"form"} onSubmit={handlerSubmit}>
          {error && <div>Ошибка</div>}
          {enterErrorStatus && <span className={"error"}>Нельзя отправить пустое сообщение. Введите текст.</span>}
          <label>
            <span className="visually-hidden">Поле ввода сообщения</span>
            <textarea className="enter-user-message" name={"content"} value={message}
                      onChange={handlerMessage}/>
          </label>
          <button className={"button button-add"} type={"submit"}>Опубликовать{clickSubmit ?
            <Navigate to={"/ra-homework-router-CRUD"}/> : null}</button>
        </form>
      </div>
    </div>
  );
}

export default CardAdd;
