const renderPokemon = async (e) => {

    e.preventDefault();
    clrError();
    
    const pokemonId = + document.getElementById('pokemonId').value.trim();

    if (isValid(pokemonId)) {

        try {
            const dataPokemon = await requestPokemon(pokemonId);
            clrScreen();
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
    const {id, name, types, sprites :{ other : { dream_world : {front_default : pokemonImg}} }, weight, height} = data;

    let nameUpperCase = name[0].toUpperCase() + name.substring(1);

    let typesArray= types.map(element => element.type.name);
    
    let typesStorage =``;

    typesArray.forEach(typeName => {
                        typesStorage += `<div class="type__${typeName}">
                                            <p>${typeName}</p>
                                        </div>`
                        });

    pokemonInfoContainer.innerHTML += `<div class="cardContainer">
                                        <div class="nameContainer">
                                            <p class="pokemonName">#${id} ${nameUpperCase}</p>
                                        </div>
                                        <div class="imgContainer">
                                            <img src="${pokemonImg}" alt="${pokemonImg}">
                                        </div>
                                        <div class="typesContainer">
                                        ${typesStorage}
                                        </div>
                                        <div class="featuresContainer">
                                            <div class="weightContainer">
                                                <p> Peso: ${weight/10}kg</p>                      
                                            </div>
                                            <div class="heightContainer">
                                                <p> Altura: ${height/10}m</p>                      
                                            </div>
                                        </div>
                                        </div>`

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
