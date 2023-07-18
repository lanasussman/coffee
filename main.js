const allBeveragesBtn = document.getElementById("allBeveragesBtn");
const hotBtn = document.getElementById("hotBtn");
const icedBtn = document.getElementById("icedBtn");
const beveragesContainer = document.querySelector(".beverages");

allBeveragesBtn.addEventListener("click", function () {
    filterBeverages("allBeverages");
    allBeveragesBtn.classList.add("active");
    hotBtn.classList.remove("active");
    icedBtn.classList.remove("active");
});

hotBtn.addEventListener("click", function () {
    filterBeverages("hot");
    hotBtn.classList.add("active");
    allBeveragesBtn.classList.remove("active");
    icedBtn.classList.remove("active");
});

icedBtn.addEventListener("click", function () {
    filterBeverages("cold");
    icedBtn.classList.add("active");
    allBeveragesBtn.classList.remove("active");
    hotBtn.classList.remove("active");
});

function filterBeverages(filterType) {
    fetchBeverages(filterType)
        .then(function (beverages) {
            displayBeverages(beverages);
        })
        .catch(function (error) {
            console.log("Error fetching beverages:", error);
        });
}

async function fetchBeverages(filterType) {
    const apiUrl = filterType === "allBeverages"
        ? ["https://api.sampleapis.com/coffee/hot", "https://api.sampleapis.com/coffee/iced"]
        : filterType === "hot"
            ? ["https://api.sampleapis.com/coffee/hot"]
            : ["https://api.sampleapis.com/coffee/iced"];

    const promises = apiUrl.map(url => fetch(url).then(response => response.json()));

    const results = await Promise.all(promises);
    const beverages = results.flat();
    return beverages;
}

function displayBeverages(beverages) {
    beveragesContainer.innerHTML = "";

    beverages.forEach(function (beverage) {
        const beverageCard = createBeverageCard(beverage);
        beveragesContainer.appendChild(beverageCard);
    });
}

function createBeverageCard(beverage) {
    const card = document.createElement("div");
    card.classList.add("beverage-card");
    card.id = beverage.id;

    const title = document.createElement("h3");
    title.textContent = beverage.title;
    card.appendChild(title);

    const image = document.createElement("img");
    image.src = beverage.image;
    image.alt = beverage.title;
    card.appendChild(image);

    const ingredients = document.createElement("p");
    ingredients.textContent = "Ingredients: " + beverage.ingredients.join(", ");
    card.appendChild(ingredients);

    const description = document.createElement("p");
    description.textContent = beverage.description;
    card.appendChild(description);

    const learnMoreBtn = document.createElement("button");
    learnMoreBtn.textContent = "Learn more...";
    learnMoreBtn.classList.add("primary-btn");

    card.appendChild(learnMoreBtn);

    return card;
}

filterBeverages("allBeverages");
