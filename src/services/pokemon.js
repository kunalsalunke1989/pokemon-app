//Get all Pokemon
export async function getAllPokemon(url) {
    return new Promise((resolve, reject) => {
        fetch(url)
            .then(res => res.json())
            .then(data => {
                resolve(data)
            })
    })
}

//Get a Pokemon
export async function getPokemon(url) {
    const res = await fetch(url);
    const data = await res.json();
    return data;
}
