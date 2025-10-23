let pokemon = document.getElementById("pokemon").innerHTML;
let current = document.getElementById("current");
let numStrt = document.getElementById("numStrt");
let numNd = document.getElementById("numNd");
let btn = document.getElementById("btn");

async function apiMulti (from, to) {
    try {
        const api = await fetch(`https://pokeapi.co/api/v2/pokemon?offset=${from}&limit=${to}`);
        if (!api.ok) {
            throw new Error(`Response status; ${api.status}`)
        }

        const data = await api.json();
        return data.results;
    } catch (error) {
        console.error(error.message);
    }
}

function addHtml (addHtml) {
    console.log(addHtml);
    return pokemon = `<li>&${addHtml}</li>`;
} 

function addApiInfo (strt, nd) {
    for (let i = strt; i < nd-1; i++) {
        if (i != 0) {
            console.log(apiMulti(i, i));
            addHtml(apiMulti(i, i));
        } else {
            console.log(apiMulti(i, 1));
            addHtml(apiMulti(i,1));
        }
    }
}