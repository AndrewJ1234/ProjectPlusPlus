# ProjectPlusPlus

backend routes

/db

  add user
    /users POST body={username, email, password, ...}

  get all users
    /users GET

  get user by username
    /users/:username GET

  update user fields
    /users/:username PUT body={newUsername, newEmail, ...}

  delete user by usernaem
    /users/:username/delete

