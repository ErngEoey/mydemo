//action type
export const Users = 'Users'
export const UserLogin = 'UserLogin'
export const UpdateDB = 'UpdateDB'

//action create
export const getUsers = () => ({
  type: Users
})

export const updateDB = (db) => {
  return async (dispatch) => {
    dispatch({
      type: UpdateDB,
      db
    })
  }
}

export const updateUserLogin = (user_id) => ({
  type: UserLogin,
  user_id
})