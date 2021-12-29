import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from "react-redux";
import { getUsers, updateDB, updateUserLogin } from '../Redux/actions/UsersAction';
import axios from 'axios';

const Account = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [user, setUser] = useState(useSelector((state) => state.users.userLogin))
  const [poke, setPoke] = useState('bulbasaur');
  const [name, setName] = useState('bulbasaur');
  const [height, setHeight] = useState('N/A');
  const [weight, setWeight] = useState('N/A');
  const [abilit, setAbilit] = useState([{}, {}]);
  // const db = useSelector((state) => state.users.db);

  useEffect(() => {
    if (JSON.parse(localStorage.getItem("token"))) {
      setUser(JSON.parse(localStorage.getItem("token")));
    } else {
      router.push('/signin')
    }
  }, [])

  useEffect(() => {
    axios.get(`https://pokeapi.co/api/v2/pokemon/${poke}`)
      .then(response => {
        setName(response.data.name);
        setAbilit(response.data.abilities);
        setHeight(response.data.height);
        setWeight(response.data.weight);
      });
  }, [poke, name])

  // useEffect(() => {
  //   axios.get(`https://pokeapi.co/api/v2/pokemon`)
  //     .then(response => {
  //       console.log(response.data);
  //       setPokemons(response.data.results);
  //     });
  // }, [])

  function logOut() {
    localStorage.removeItem('token');
    router.push('/signin');
  }

  return (
    <div>
      <center>
        <h1 style={{ margin: 30 }}>Hello, {user?.firstname}</h1>
        <select
          value={poke}
          onChange={(event) => {
            setPoke(event.target.value);
          }}>
          <option value='bulbasaur'>Bulbasaur</option>
          <option value='charmander'>Charmander</option>
          <option value='squirtle'>Squirtle</option>
          <option value='togepi'>Togepi</option>
          <option value='jirachi'>Jirachi</option>
        </select>
      </center>

      <div className='card' style={{ margin: 30, backgroundColor: 'white', height: 300, width: 500 }}>
        <div className='card-header'>
          <h2>{name}</h2>
        </div>
        <div style={{ margin: 20 }}>
          <h3>Height: {height}</h3>
          <h3>Weight: {weight}</h3>
          <h3>Abilities</h3>
          <ul>
            {abilit.map((abi, i) => (
              <li key={i}>{abi.ability?.name}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* <div>
        <ul>
          {pokemons.map((po, i) => (
            <li key={i}>{po?.name}</li>
          ))}
        </ul>
      </div> */}

      <center>
        <button type="button" onClick={logOut}>Sign Out</button>
      </center>
    </div >
  )
}

export default Account