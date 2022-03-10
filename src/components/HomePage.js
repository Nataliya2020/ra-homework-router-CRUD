import {useContext, useEffect, useState} from "react";
import {NavLink} from "react-router-dom";
import Card from './Card';
import {ContextUserMessage} from "./context/contextUserMessage";

function HomePage(props) {
  const [usersPosts, setUsersPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const {setDel} = useContext(ContextUserMessage);

  useEffect(  () => {
      setDel(false);
      fetch(`${process.env.REACT_APP_URL}/posts`)
        .then((response) => {
        return response.json();
      })
        .then((data) => {
          setUsersPosts(data);
          setLoading(false);
        }).catch((e) => {
        console.log(e);
      });
    },
    [props, setDel]);

  if (loading) {
    return (
      <div>Loading.....
      </div>
    )
  }

  return (
    <div className="page">
      <div className="menu-item">
        <NavLink to="/ra-homework-router-CRUD/posts/new">
          <button className="button button-new-card">Создать</button>
        </NavLink>
      </div>
      <Card usersPosts={usersPosts}/>
    </div>
  )
}

export default HomePage;
