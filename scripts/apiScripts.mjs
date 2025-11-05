const pokemon = document.getElementById("pokemon");
const view = document.getElementById("current");

let current = 1;

let from = 0;
let to = 50;

async function setCurrent(newNum){
    try{
        const data = await getApi(`https://pokeapi.co/api/v2/pokemon/${newNum}`);
        current = data.id;
        from = data.id;
        to = from + 50;
        view.innerHTML = `
                        <div class="pokemon">
                            <div>
                                <div><span>Name:</span><span>${data.name}</span></div><br>
                                <div><span>Number:</span><span>${data.id}</span></div>
                                <div class="left"><span>Type(s):</span><span>${data.types.map(t => t.type.name).join(", ")}</span></div>
                                <div class="left"><span>Height:</span><span>${data.height/10}m</span></div>
                                <div class="left"><span>Weight:</span><span>${data.weight/10}kg</span></div>
                                <span>Base Stats:</span>
                                <span class="around">
                                    <div>
                                        <div><span>HP:</span><span>${data.stats[0].base_stat}</span></div>
                                        <div><span>Attack:</span><span>${data.stats[1].base_stat}</span></div>
                                        <div><span>Deffence:</span><span>${data.stats[2].base_stat}</span></div>
                                        <div><span>SP Attack:</span><span>${data.stats[3].base_stat}</span></div>
                                        <div><span>SP Deffence:</span><span>${data.stats[4].base_stat}</span></div>
                                        <div><span>Speed:</span><span></span>${data.stats[5].base_stat}</div>
                                    </div>
                                </span>
                            </div>
                            <img class="mainImg" src="${data.sprites.front_default}">
                        </div>`;
    }catch(error){console.log()}
}

async function getApi(api){
    try{
        const response = await fetch(api);
        if(!response.ok){
            throw new Error("Could not fetch response");
        }
        const data = await response.json();
        const results = data.results;
        let returned = results;
        return returned = results === undefined? data: results;;
    }catch (error){throw Error(1)}
}

async function useApi(api) {
    try{
        const names = await getApi(api);
        
        const pokemons = await Promise.all(
            names.map(poke => getApi(poke.url))
        );

        let toBe = `
                    <button class="pokemon col">
                        <div>name</div>
                        <div class="pokemon">
                            <div>pokemon number</div>
                            <div>types</div>
                            <img class="img" src=""><span>image: hover to expand</span>
                        </div>
                    </button>`;

        pokemons.forEach(async function (info) {
            toBe += `            
            <button class="pokemon col" onclick="setUnits(${info.id})">
                <div>${info.name}</div>
                <div class="pokemon">
                    <div>${info.id}</div>
                    <div>${info.types.map(t => t.type.name).join(", ")}</div>
                    <img class="img" src="${info.sprites.front_default}">
                </div>
            </button>`;
        });

        pokemon.innerHTML = toBe;
    }
    catch(error) {console.error(error)};
}

async function find(){
    let lost = document.getElementById("find")?.value;
    try{
        if (parseInt(lost)){return setCurrent(lost)};
        const info = await getApi(`https://pokeapi.co/api/v2/pokemon?offset=0&limit=2000`);
        
        info.forEach(async (group) => {
            if (group.name === lost.toLowerCase()){
                const info = await getApi(group.url)
                console.log(info);
                return setUnits(info.id)
            }
        });
        view.innerHTML = "<h3>Pokemon not found</h3>";
    }catch(error){console.log(error)}
}

function setUnits(selected){
    setCurrent(selected);
    useApi(`https://pokeapi.co/api/v2/pokemon?offset=${from}&limit=${to}`);
}

function back(){
    from = from - 50 >= 0 ? from - 50 : 0;
    to = from + 50;
    setUnits(from);
}
 
function next(){
    from += 50;
    to += 50;
    setUnits(from);
}
setUnits(current);
