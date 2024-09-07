import accessKey from "./secretFile.js";

const formElement = document.querySelector("form");
const inputElement = document.querySelector("input");
const searchResults = document.querySelector(".search-results");
const showMore = document.getElementById("show-more-button");

let inputSearch = "";
let page = 1;

async function searchImages() {

    inputSearch = inputElement.value;

    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputSearch}&client_id=${accessKey}`;

    const response = await fetch(url);
    const data = await response.json();

    const results = await data.results;

    if(page === 1)  {
        searchResults.innerHTML = "";
    }

    results.map((result) => {

        const imageWrapper = document.createElement("div");
        imageWrapper.classList.add("search-result");
        const image = document.createElement("img");
        image.src = result.urls.small;
        image.alt = result.description;
        const imageLink = document.createElement("a");
        imageLink.href = result.links.html;
        imageLink.target = "_blank";
        imageLink.textContent = result.description;

        imageWrapper.appendChild(image);
        imageWrapper.appendChild(imageLink);
        searchResults.appendChild(imageWrapper);

        page++;
        if(page > 1)    {
            showMore.style.display = "block";
        }
    })
}

formElement.addEventListener('submit', (e) =>   {

    e.preventDefault();
    page = 1;
    searchImages();
});

showMore.addEventListener('click', (e) =>   {
    searchImages();
});