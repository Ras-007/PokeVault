// --- TOP SEASONS LOGIC ---

const topSeasons = [
    { 
        title: "Indigo League", 
        ep: "Season 1", 
        img: "images/season1.jpeg", 
         
    },
    { 
        title: "XYZ", 
        ep: "Season 19", 
        img: "images/xyz.jpeg", 
         
    },
    { 
        title: "Galactic Battles", 
        ep: "Season 12", 
        img: "images/galactic battles.jpeg", 
    },
    { 
        title: "Sun & Moon", 
        ep: "Season 20", 
        img: "images/sun-moon.jpeg", 
    },
    { 
        title: "Journeys", 
        ep: "Season 23", 
        img: "images/journeys.jpeg", 
    }
];

const seasonContainer = document.getElementById('season-grid');

// Loop through and create HTML
topSeasons.forEach((season, index) => {
    const card = `
        <div class="season-card" style="animation-delay: ${index * 0.2}s">
            <img src="${season.img}" class="season-img">
            <h3>${season.title}</h3>
            <p style="color: #666;">${season.ep}</p>
        </div>
    `;
    seasonContainer.innerHTML += card;
});

// ... Your existing fetchPokemonData function stays below ...



async function fetchPokemonData() {
    const searchInput = document.getElementById('pokemon');
    const name = searchInput.value.toLowerCase().trim();
    const spinner = document.getElementById('spinner'); // Make sure ID matches your HTML

    if (!name) {
        alert("Please enter a Pokemon name!"); // <--- Your message here
        return; // 🛑 STOP! Do not run the rest of the code.
    }
    try{
        const pokemon = document.getElementById("pokemon").value.toLowerCase();
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
        const spinner = document.getElementById("loading-spinner");
        spinner.style.display = "block";
        if (!response.ok) {
        throw new Error("Pokemon not found! Please check the name and try again.");
    } catch(error){
    spinner.style.display = "none";
    console.error("Error fetching Pokemon data:", error);
       
    }
        

    

    const data = await response.json();
    const pokemonSprite = data.sprites.front_default;
    const imgElement = document.getElementById("pokemonSprite");

    imgElement.src = pokemonSprite;
    imgElement.style.display = "block";
    spinner.style.display = "none";
    // Clear previous stats
    // --- STATS ---
    const statsElement = document.getElementById("pokemonStats");
    statsElement.innerHTML = "<h2>Stats:</h2>";
    data.stats.forEach(stat => {
        const statDiv = document.createElement("div");
        statDiv.textContent = `${stat.stat.name.toUpperCase()}: ${stat.base_stat}`;
        statsElement.appendChild(statDiv);
    });

    const typesElement = document.getElementById("pokemonTypes");
typesElement.innerHTML = ""; // Clear previous types

// API returns an array (some pokemon have 1 type, some have 2)
data.types.forEach(typeInfo => {
    const typeName = typeInfo.type.name;
    
    // Create a span for the badge
    const typeHTML = `<span class="type-badge ${typeName}">${typeName}</span>`;
    
    // Add it to the container
    typesElement.innerHTML += typeHTML;
});
    }catch(error){
    spinner.style.display = "none";
    console.error("Error fetching Pokemon data:", error);
       
    } alert(error.message);

        
}

function openPokedex() {
    // Show the Overlay
    const overlay = document.getElementById('pokedex-view');
    overlay.style.display = 'flex'; // Use flex to activate the centering CSS
}

function closePokedex() {
    // Hide the Overlay
    const overlay = document.getElementById('pokedex-view');
    overlay.style.display = 'none';
    
    // Optional: Clear the search when closing?
    // document.getElementById('pokemon').value = "";
    // document.getElementById('pokemonSprite').style.display = "none";
}








