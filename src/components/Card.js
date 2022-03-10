import CardData from './CardData'

function Card(props) {

  if (!props.usersPosts) {
    throw new Error("Ошибка!");
  }

  return (
    <div>
      {props.usersPosts.map(item => {

        const date = new Date(item.created);

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

        return (
          <CardData key={item.id} item={item} dateMessage={dateMessage}/>
        )
      })}
    </div>
  );
}

export default Card;
