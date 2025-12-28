// --- TOP SEASONS LOGIC ---

const topSeasons = [
    { 
        title: "Indigo League", 
        ep: "Season 1", 
        img: "images/season1.jpeg", 
        desc: "The classic start! Ash Ketchum leaves Pallet Town, meets Pikachu for the first time, and challenges the Kanto Gym Leaders to become a Pokemon Master." 
    },
    { 
        title: "XYZ", 
        ep: "Season 19", 
        img: "images/xyz.jpeg", 
        desc: "Considered one of the best seasons ever. Ash travels Kalos, unlocks the mysterious 'Bond Phenomenon' with Greninja, and fights to save the world from Team Flare." 
    },
    { 
        title: "Galactic Battles", 
        ep: "Season 12", 
        img: "images/galactic battles.jpeg", 
        desc: "Deep in the Sinnoh region, Ash and Dawn face off against the dangerous Team Galactic, who are trying to remake the universe using legendary Pokemon." 
    },
    { 
        title: "Sun & Moon", 
        ep: "Season 20", 
        img: "images/sun-moon.jpeg", 
        desc: "A total change of pace! Ash goes to school in the tropical Alola region, learns Z-Moves, and eventually competes in the very first Alola Pokemon League." 
    },
    { 
        title: "Journeys", 
        ep: "Season 23", 
        img: "images/journeys.jpeg", 
        desc: "Ash travels across every single region (not just one!) with his new friend Goh, catching old favorites and battling towards the World Coronation Series." 
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
    try{
        const pokemon = document.getElementById("pokemon").value.toLowerCase();
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
        const spinner = document.getElementById("loading-spinner");
        spinner.style.display = "block";
        if (!response.ok) {
        throw new Error("Pokemon not found! Please check the name and try again.");
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
}

    catch(error){
        spinner.style.display = "none";
        console.error("Error fetching Pokemon data:", error);
    }
        
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

