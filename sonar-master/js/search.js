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
        const res = await fetch('https://run.mocky.io/v3/26fbbcef-db42-4d2f-ba6e-7287a1b56e16');
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
              
                    <img class="effectfront" src="${character.image2}" style="width:500%; " />
                    <img class="" src="${character.image}" style="width:200px; " />
        
                <a href="${character.recipe} styles = 'color:red;'">直接看菜單</a>
   
            </li>
        `;
    
        })
        .join('');
        
    charactersList.innerHTML = htmlString;
};

loadCharacters();
