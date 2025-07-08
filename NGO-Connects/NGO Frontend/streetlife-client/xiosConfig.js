import axios from 'axios';

const instance = axios.post("http://localhost:8080/api/admin/login", {
  email: formData.email,
  password: formData.password,
})
