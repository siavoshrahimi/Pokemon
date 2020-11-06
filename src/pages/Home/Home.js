import React,{useState,useEffect} from 'react';
import {getAllPokemon, getPokemon} from "../../services/pokeman";
import Card from "../../components/Card/Card";
import './Home.scss';
import Search from "../../components/Search/Search";
import Logo from "../../components/Logo/Logo";
import Button from "../../components/Button/Button";


const Home = props => {
    const [pokemonData, setPokemonData] = useState([]);
    const [searchData, setSearchData] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [nextUrl, setNextUrl] = useState('');
    const [prevUrl, setPrevUrl] = useState('');
    const [loading, setLoading] = useState(true);
    const initialUrl = "https://pokeapi.co/api/v2/pokemon";


    //fetch first page data
    useEffect(() => {
        async function fetchData() {
            let response = await getAllPokemon(initialUrl);
            setNextUrl(response.next);
            setPrevUrl(response.previous);
            await loadingPokemon(response.results);
            setLoading(false)
        }

        fetchData();
    }, []);

    //fetch data for the next page
    const next = async () => {
        setLoading(true);
        let response = await getAllPokemon(nextUrl);
        await loadingPokemon(response.results);
        setNextUrl(response.next);
        setPrevUrl(response.previous);
        setLoading(false);
    }

    //fetch data for the prev page
    const prev = async () => {
        if (!prevUrl) return;
        setLoading(true);
        let response = await getAllPokemon(prevUrl);
        await loadingPokemon(response.results);
        setNextUrl(response.next);
        setPrevUrl(response.previous);
        setLoading(false);
    }

    //fetch pokemon's detail
    const loadingPokemon = async data => {
        let _pokemonData = await Promise.all(data.map(async pokemon => {
            return await getPokemon(pokemon.url)
        }));
        setPokemonData(_pokemonData)
    }


    //handling search
    useEffect(() =>{
        let filteredPokemon =pokemonData.filter(pokemon => pokemon.name.includes(inputValue));
        setSearchData(filteredPokemon);
    },[inputValue,pokemonData]);
    const inputHandler = ({target:{value}})=>{
        setInputValue(value);
    }

    //map on different state depends on if it's been searched or not
    let card;
    if(searchData.length  && inputValue){
        card = searchData.map((pokemon, i) => <Card key={i} pokemon={pokemon}/>)
    }if(!searchData.length && inputValue){
        card = <p className='no-search-result'>Sorry we didn't find any result for your search</p>
    }if((!searchData.length && inputValue === '') || (searchData.length === 20 && inputValue === '') ){
        card = pokemonData.map((pokemon, i) => <Card key={i} pokemon={pokemon}/>)
    }


    return (
        <div className='home-wrapper'>
            {
                loading ?
                    <div className='loading-container'>
                        <h1>Loading...</h1>
                    </div> : (
                    <div className='home-grid'>
                        <div className="header-wrapper">
                            <Logo/>
                            <Search onChangeHandler={ inputHandler} value={inputValue}/>
                        </div>

                        {(!searchData.length && inputValue) ?
                            <div/>
                            :<div className='pagination-wrapper'>
                                <Button clicked={prev} disabled={!prevUrl}>Prev </Button>
                                <Button clicked={next} >Next </Button>
                            </div>
                        }
                        <div className='home-pokemon-container'>
                            {card}
                        </div>
                        {(!searchData.length && inputValue) ?
                            <div/>
                            :<div className='pagination-wrapper'>
                                <Button clicked={prev} disabled={!prevUrl}>Prev </Button>
                                <Button clicked={next} >Next </Button>
                            </div>
                        }
                    </div>

                )
            }
        </div>
    )
};

export default Home;