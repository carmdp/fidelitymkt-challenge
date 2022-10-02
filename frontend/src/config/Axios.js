import axios from 'axios';

const conection = axios.create({baseURL:"http://192.168.1.10:3005/"});
//const conection = axios.create({baseURL:"https://www.tizusoft.com.ar:3002/"});

export default conection;