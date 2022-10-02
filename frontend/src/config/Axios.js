import axios from 'axios';

const protocol = "http";
const server = "localhost";
const port = "3306"

const conection = axios.create({baseURL:`${protocol}://${server}:${port}`});

export default conection;