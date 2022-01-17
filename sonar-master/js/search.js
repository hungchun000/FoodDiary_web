const charactersList = document.getElementById('charactersList');
const searchBar = document.getElementById('searchBar');
let hpCharacters = [];

searchBar.addEventListener('keyup', (e) => {
    const searchString = e.target.value.toLowerCase();

    const filteredCharacters = hpCharacters.filter((character) => {
        return (
            character.name.toLowerCase().includes(searchString) ||
            character.house.toLowerCase().includes(searchString)
        );
    });
    displayCharacters(filteredCharacters);
});

const loadCharacters = async () => {
    try {
        const res = await fetch('https://run.mocky.io/v3/e490ac1d-1339-40d4-a064-9d075f56356a');
        hpCharacters = await res.json();
        displayCharacters(hpCharacters);
    } catch (err) {
        console.error(err);
    }
};

const displayCharacters = (characters) => {
    const htmlString = characters
        .map((character) => {
            return `
            <li class="character">
                <h2>${character.name}</h2>
                <p>House: ${character.house}</p>
            <div style = "background-image:  url('${character.image}') no-repeat; margin: 0 auto; display: block;">
                <img class="effectfront" src="${character.image}" style="width:100px;" />
            </div>
                <a href="${character.recipe} styles = 'color:black;'">菜單</a>
   
            </li>
        `;
    
        })
        .join('');
        
    charactersList.innerHTML = htmlString;
};

loadCharacters();
