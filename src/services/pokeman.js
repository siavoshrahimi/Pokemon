import axios from 'axios';

export async function getAllPokemon(url) {
   let res = await axios.get(url);
   return res.data;
}

export async function getPokemon(url) {
    let res = await axios.get(url);
    return res.data;
}