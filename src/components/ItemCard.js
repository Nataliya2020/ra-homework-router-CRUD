import {ContextUserMessage} from "./context/contextUserMessage";
import {useContext} from 'react';
import {Navigate, NavLink} from 'react-router-dom';

function ItemCard() {
  const {delCard, del, id, content, created} = useContext(ContextUserMessage);

  localStorage.setItem("userMessage", content || '');

  if (!id) {
    return (
      <Navigate to="/ra-homework-router-CRUD"/>
    )
  }

  return (
    <div className={"card"}>
      <div className={"content-user-data"}>
        <div className={"user-data"}>
          <div className={"user-data-avatar"} title={"аватар пользователя"}/>
          <div>
          <span className={"user-name"}>
                Имя пользователя
          </span>
            <div className={"time"}>
              {created}
            </div>
          </div>
        </div>
        <div className={"item-content"}>
          {content}
        </div>
        <div className={"button-container"}>
          <NavLink to="/ra-homework-router-CRUD/posts/edit">
            <button className={"button button-edit"}>
              Изменить
            </button>
          </NavLink>
          <button className={"button button-del"} onClick={(e) => {
            delCard(e, id)
          }}>Удалить{del ? <Navigate to={"/ra-homework-router-CRUD"}/> : null}</button>
        </div>
      </div>
    </div>
  );
}

export default ItemCard;
