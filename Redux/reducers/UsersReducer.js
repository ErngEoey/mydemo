import { Users, UserLogin, UpdateDB } from '../actions/UsersAction';

const db = [{
  id: 0,
  email: "admin@gmail.com",
  password: "12345678",
  username: "myadmin",
  firstname: "Admin",
  lastname: "Admin"
},
{
  id: 1,
  email: "admin1@gmail.com",
  password: "admin123",
  username: "admin12",
  firstname: "Admin1",
  lastname: "Admin1"
}]

export const userLogin = {
  id: "",
  email: "",
  password: "",
  username: "",
  firstname: "",
  lastname: ""
}

const UsersReducer = (state = { db, userLogin }, action) => {
  switch (action.type) {
    case Users:
      return {
        ...state
      }
    case UpdateDB:
      console.log("update db");
      return {
        ...state,
        db: action.db
      }
    case UserLogin:
      console.log("update user login");
      return {
        ...state,
        userLogin: JSON.parse(localStorage.getItem("db"))[action.user_id]
      }
    default:
      return {
        ...state
      }
  }
}

export default UsersReducer
