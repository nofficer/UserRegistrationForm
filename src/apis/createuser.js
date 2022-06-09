import axios from 'axios'


const instance = axios.create({
  baseURL: 'https://ideatheorem-test.herokuapp.com/api/users/create'
})

export default instance;
