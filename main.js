const renderPokemon = async (e) => {

    e.preventDefault();
    clrError();
    
    const pokemonId = + document.getElementById('pokemonId').value.trim();

    if (isValid(pokemonId)) {

        try {
            const dataPokemon = await requestPokemon(pokemonId);
            renderCard(dataPokemon);
            
        } catch (error) {
            clrScreen();
            msgError.textContent=`No existe un Pokemon con ese Id`;
        }
        
    } else {
        clrScreen();
        msgError.textContent = 'Ingresá un id válido (número entero mayor a 0)';
    }
   
}

const requestPokemon = async (id) => {
    const baseUrl = 'https://pokeapi.co/api/v2/pokemon/';
    const response = await fetch(baseUrl + id);
    const data = await response.json();
    console.log(data);
           
    return data;
}

const renderCard = async(data) => {
    const {name, types, sprites :{ other : { dream_world : {front_default : pokemonImg}} }, weight, height} = data; 
    let typesArray= types.map(element => element.type.name);
    
    pokemonInfoContainer.innerHTML  =`<p>${name}</p>`
    typesArray.forEach(typeName => {
        pokemonInfoContainer.innerHTML += `<p>${typeName}</p>`
    });
    pokemonInfoContainer.innerHTML += `<img src="${pokemonImg}" alt="">`
    pokemonInfoContainer.innerHTML += `<p>Peso: ${weight/10}kg</p>`
    pokemonInfoContainer.innerHTML += `<p>Altura: ${height/10}cm</p>`
}

const clrError = () => {
    msgError.textContent = '';
}

const clrScreen = () => {
    pokemonInfoContainer.innerHTML= '';
}

const isValid = (input) => {
    const inputNumberValid = /^[1-9]+[0-9]*$/; 
    return inputNumberValid.test(input);
}

const btnConsult = document.getElementById('btnSubmit');
const pokemonInfoContainer = document.getElementById('pokemonInfoContainer');

const init = () => {
    btnConsult.addEventListener("click", renderPokemon);
};

init();
