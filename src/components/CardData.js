import {NavLink} from 'react-router-dom';
import {useContext} from 'react';
import {ContextUserMessage} from './context/contextUserMessage';

function CardData(props) {
  const data = useContext(ContextUserMessage);

  const handlerClickCard = () => {
    data.id = props.item.id;
    data.content = props.item.content;
  }

  const date = new Date(props.item.created);

  const dateMessage = {
    year: date.getFullYear(),
    day: date.getDate(),
    month: date.getMonth() + 1,
    hour: date.getHours(),
    minute: date.getMinutes()
  }

  if (dateMessage.day < 10) {
    dateMessage.day = `0${dateMessage.day}`;
  }

  if (dateMessage.month < 10) {
    dateMessage.month = `0${dateMessage.month}`
  }

  if (dateMessage.hour < 10) {
    dateMessage.hour = `0${dateMessage.hour}`
  }

  if (dateMessage.minute < 10) {
    dateMessage.minute = `0${dateMessage.minute}`
  }

  const dateCreate = `${dateMessage.day}.${dateMessage.month}.${dateMessage.year} ${dateMessage.hour}:${dateMessage.minute}`;
  data.created = dateCreate;

  return (
    <NavLink to={`/ra-homework-router-CRUD/posts/${props.item.id}`} className={"link-to"}>
      <div className={"content-user-data content-user-data-card"} onClick={handlerClickCard}>
        <div className={"user-data"}>
          <div className={"user-data-avatar"} title={"аватар пользователя"}/>
          <div><span className={"user-name"}>
                Имя пользователя
              </span>
            <div
              className={"time"}>{dateCreate}</div>
          </div>
        </div>
        {props.item.content}
      </div>
    </NavLink>
  );
}

export default CardData;
