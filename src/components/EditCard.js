import {ContextUserMessage} from "./context/contextUserMessage";
import {useContext, useState} from "react";
import {Navigate, useNavigate} from "react-router-dom";

function EditCard() {
  const [enterErrorStatus, setEnterErrorStatus] = useState(false);
  const [error, setError] = useState(false);
  const [clickSubmit, setClickSubmit] = useState(false);
  const {id, content} = useContext(ContextUserMessage);

  const [message, setMessage] = useState(String(localStorage.getItem("userMessage") || content));
  const history = useNavigate();

  const handlerMessage = (e) => {
    setEnterErrorStatus(false);
    setMessage(e.target.value);
    localStorage.setItem("userMessage", message);
  }

  const handlerSubmit = (e) => {
    e.preventDefault();

    if (message.trim() === '') {
      setEnterErrorStatus(true);
      return;
    }

    const form = document.querySelector('#form');

    const params = new FormData(form);
    params.append('id', `${id}`);

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
  }

  const saveEdit = () => {
    localStorage.removeItem('userMessage');
  }

  const handlerClose = (e) => {
    e.preventDefault();
    localStorage.setItem("userMessage", message);

    history(-1);
  }

  return (
    <div className={"card"}>
      <div className={"card-content"}>
        <header className={"header"}>
          <div>Редактировать публикацию</div>
          <button className={"button"} onClick={handlerClose}>X</button>
        </header>

        <form className="form" id={"form"} onSubmit={handlerSubmit}>
          {error && <div>Ошибка</div>}
          {enterErrorStatus && <span className={"error"}>Нельзя отправить пустое сообщение. Введите текст.</span>}
          <div className={"edit-content-message"}>
            <div className={"user-data-avatar"} title={"аватар пользователя"}/>
            <label className={"edit-user-message"}>
              <span className="visually-hidden">Поле ввода сообщения</span>
              <textarea className="enter-user-message edit-message" name={"content"} value={message}
                        onChange={handlerMessage}/>
            </label>
          </div>
          <button className={"button button-add"} type={"submit"} onClick={saveEdit}>Сохранить{clickSubmit ?
            <Navigate to={"/ra-homework-router-CRUD"}/> : null}</button>
        </form>

      </div>
    </div>
  )
}

export default EditCard;
