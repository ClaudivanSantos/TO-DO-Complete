import axios from 'axios';


const baseURL = 'https://db-to-do.herokuapp.com/';


export const api = axios.create({

    baseURL: baseURL,  

    headers: {

            'Content-type': 'application/json',

    }

});
