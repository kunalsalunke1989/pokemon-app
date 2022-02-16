import React, { useState, useEffect } from 'react';
import { getAllPokemon, getPokemon } from '../../services/pokemon';
import Card from '../../components/Card';
import './style.css';

function App() {
    //Set state and state mutator function
    const [pokemonData, setPokemonData] = useState([]);
    //Set Urls of the next and previous batch of Pokemon that we need to fetch
    const [nextUrl, setNextUrl] = useState('');
    const [prevUrl, setPrevUrl] = useState('');
    //Set loading state
    const [loading, setLoading] = useState(true);
    //Set the number of Pokemon to display
    const [pokemonNumber, setPokemonNumber] = useState('10');
    //Set the sorting order of Pokemon
    const [sortPokemon, setSortPokemon] = useState('0');
    //Set landing page Url
    let initialUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=' + pokemonNumber;
    //Set Url to search Pokemon through their abilities
    const abilityUrl = 'https://pokeapi.co/api/v2/ability/';
    //Set Pokemon to search
    const [pokemonName, setPokemonName] = useState('');
    //Set if Pokemon found or not
    const [pokemonFound, setPokemonFound] = useState(false);
    //Cache sorting orders of Pokemon
    const [ascendingPokemonData, setAscendingPokemonData] = useState([]);
    const [descendingPokemonData, setDescendingPokemonData] = useState([]);
    //Hide/Show elements according to state
    const [showDisplay, setShowDisplay] = useState(true);
    const [showSort, setShowSort] = useState(true);
    const [showPrevNext, setShowPrevNext] = useState(true);
    const [showBackToResults, setShowBackToResults] = useState(false);
    //Toggle App state 
    const [appState, setAppState] = useState(false);

    //Takes two arguments, first will be a function that runs after the component mounts to the page.
    //The second argument will be a dependency array. It will run each time state when the corresponding state changes
    useEffect(() => {
        async function fetchData() {
            //Set Url to fetch all Pokemon if sort order is either Ascending or Descending
            if (sortPokemon != "0")
                initialUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=1118';
            //Get 'n' number of Pokemon from the endpoint as per value set in pokemonNumber dropdown
            let response = await getAllPokemon(initialUrl);
            //Set Url for next and previous batches of Pokemon
            setNextUrl(response.next);
            setPrevUrl(response.previous);
            //Get the results array which contains details of all Pokemon
            let newRes;
            if (sortPokemon == "0") {
                //If sort value is None, show results as is with pagination
                newRes = response.results;
                setShowDisplay(true);
                setShowPrevNext(true);
                setShowSort(true);
            }//If sort value is Ascending or Descending, sort results and show them without pagination
            else if (sortPokemon == "1") {
                //Check to see if Pokemon have already been sorted in Descending order
                if (descendingPokemonData.length != 0) {
                    //If yes, simply reverse order of Descending Pokemon
                    newRes = descendingPokemonData.reverse();
                }
                else {
                    //Sort in Ascending order
                    newRes = response.results.sort((a, b) => (a.name > b.name ? 1 : -1));
                }
                setShowDisplay(false);
                setShowPrevNext(false);
                setShowSort(true);
                setAscendingPokemonData(newRes);
            }
            else {
                //Check to see if Pokemon have already been sorted in Ascending order
                if (ascendingPokemonData.length != 0) {
                    //If yes, simply reverse order of Descending Pokemon
                    newRes = ascendingPokemonData.reverse();
                }
                else {
                    //Sort in Descending order
                    newRes = response.results.sort((a, b) => (a.name < b.name ? 1 : -1));
                }
                setShowDisplay(false);
                setShowPrevNext(false);
                setShowSort(true);
                setDescendingPokemonData(newRes);
            }

            let pokemon = await loadingPokemon(newRes);
            //console.log(pokemon);    
            //Hide Loading text     
            setLoading(false);
            if (sortPokemon != "0")
                document.getElementById("sortBy").value = sortPokemon;
        }

        fetchData();
    }, [pokemonNumber, sortPokemon, appState])

    const next = async () => {
        setLoading(true);
        let data = await getAllPokemon(nextUrl);
        await loadingPokemon(data.results);
        setNextUrl(data.next);
        setPrevUrl(data.previous);
        setLoading(false);
        if (pokemonNumber)
            document.getElementById("pokemonNumber").value = pokemonNumber;
    }

    const prev = async () => {
        if (!prevUrl) return;
        setLoading(true);
        let data = await getAllPokemon(prevUrl);
        await loadingPokemon(data.results);
        setNextUrl(data.next);
        setPrevUrl(data.previous);
        setLoading(false);
        if (pokemonNumber)
            document.getElementById("pokemonNumber").value = pokemonNumber;
    }

    const loadingPokemon = async (data) => {
        let _pokemonData = await Promise.all(data.map(async pokemon => {
            let pokemonRecord = await getPokemon(pokemon.url);
            return pokemonRecord;
        }));

        setPokemonData(_pokemonData);
    }

    const getPokemonName = async () => {
        let alphabets = /^[A-Za-z]+$/;
        //Check if input is empty or non alphabets
        if(!pokemonName || !pokemonName.match(alphabets))
            return;
        setLoading(true);
        let pokemon, pokemonAbility;
        const initialUrl = 'https://pokeapi.co/api/v2/pokemon/';
        try {
            pokemon = await getPokemon(initialUrl + pokemonName);
        }
        catch (e) {
            console.log("Pokemon not found");
            try {
                pokemonAbility = await getPokemon(abilityUrl + pokemonName);
            }
            catch (e) {
                console.log("Pokemon ability not found");
            }
        }
        if (pokemon) {
            //console.log(pokemonData);
            setPokemonData([pokemon]);
            setShowDisplay(false);
            setShowPrevNext(false);
            setShowSort(false);
            setShowBackToResults(true);
        }
        else if (pokemonAbility) {
            //console.log(pokemonData);
            let newPokemonData = [];
            let newPokemonRecord;
            for (let poke of pokemonAbility.pokemon) {
                newPokemonRecord = await getPokemon(poke.pokemon.url);
                newPokemonData.push(newPokemonRecord);
            }
            setPokemonData(newPokemonData);
            setShowDisplay(false);
            setShowPrevNext(false);
            setShowSort(false);
            setShowBackToResults(true);
        }
        //console.log(pokemon);
        setLoading(false);
        return pokemon;
    }

    const getPokemonNumber = async (number) => {
        //console.log(number);
        setPokemonNumber(number);
    }

    const sortPokemonBy = async (value) => {
        setLoading(true);
        //console.log(value);
        setSortPokemon(value);
    }

    const toggleAppState = async () => {
        setLoading(true);
        setShowBackToResults(false);
        setAppState(!appState);
    }

    return (
        <div className="App">
            {
                loading ? <h1 style={{ textAlign: 'center' }}>Loading...</h1> :
                    (
                        <div>
                            <div className="content">
                                {showDisplay &&
                                    <div>
                                        <span className="inputSpan">Display</span>
                                        <select name="pokemonNumber" id="pokemonNumber" onChange={event => getPokemonNumber((event.target.value))}>
                                            <option value="10">10</option>
                                            <option value="20">20</option>
                                            <option value="50">50</option>
                                        </select>
                                        <span className="inputSpan">Pokemon</span>
                                    </div>}
                                {showSort &&
                                    <div>
                                        <span className="inputSpan">Sort:</span>
                                        <select name="sortBy" id="sortBy" onChange={event => sortPokemonBy((event.target.value))}>
                                            <option value="0">None</option>
                                            <option value="1">Ascending</option>
                                            <option value="2">Descending</option>
                                        </select>
                                    </div>}
                                <div className="btn">
                                    <input type="text" onChange={event => setPokemonName((event.target.value).toLowerCase())} />
                                    <button onClick={getPokemonName}>Search</button>
                                </div>
                                {showBackToResults &&
                                    <div className="btn">
                                        <button onClick={toggleAppState}>Back To Results</button>
                                    </div>
                                }
                            </div>
                            {showPrevNext &&
                                <div className="btn">
                                    <button onClick={prev}>Prev</button>
                                    <button onClick={next}>Next</button>
                                </div>
                            }
                            <div className="grid-container">
                                {
                                    pokemonData.map((pokemon) => {
                                        return <Card key={pokemon.id} pokemon={pokemon} />;
                                    })
                                }
                            </div>
                            {showPrevNext &&
                                <div className="btn">
                                    <button onClick={prev}>Prev</button>
                                    <button onClick={next}>Next</button>
                                </div>
                            }
                            )
                        </div>
                    )
            }
        </div>
    );
}

export default App;
