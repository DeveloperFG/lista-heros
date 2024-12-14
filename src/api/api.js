import axios from "axios";

// https://fullheros.onrender.com

export default axios.create({
    baseURL: `http://localhost:3000/`
})