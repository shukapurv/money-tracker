import axios from "axios";

const API_URL = "http://127.0.0.1:8000/v1/auth/";

const register = (username, email, password,first_name,last_name) => {
  return axios.post(API_URL + "register/", {
    username,
    email,
    password,
    first_name,
    last_name
  });
};

const login = (username, password) => {
  return axios({
    method: 'post',
    url: API_URL + 'login/',
    headers: {},
    data: {
      'username': username,
      'password': password
    }
  })
    .then((response) => {
        localStorage.setItem("user", JSON.stringify(response.data));

      return response.data;
    })
    .catch((err)=> {
  console.log(err);
})
};

const logout = () => {
  localStorage.removeItem("user");
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

const AuthService = {
  register,
  login,
  logout,
  getCurrentUser,
}

export default AuthService;
