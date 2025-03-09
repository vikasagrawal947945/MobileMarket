let url = `https://openapi.programming-hero.com/api/phones?search=iPhone 13`;
let search = document.querySelector("#search");
let phoneContainer = document.querySelector("#phone-container");
let submitbtn = document.querySelector("#submit");
let loading = document.querySelector("#loading");

// Pehle se hi loading div ko container me rakho, but hide kar do
loading.style.display = "none";

window.addEventListener("load", () =>display(url));

// Fetch new data on search
submitbtn.addEventListener("click", () => {
    let query = search.value.trim();
    search.value = "";
    if (query !== "") {
        let newUrl = `https://openapi.programming-hero.com/api/phones?search=${query}`;
        display(newUrl);
    }
});

async function display(url) {
    phoneContainer.innerHTML = ""; // Clear previous results, but loading already exists
    loading.style.display = "block"; // Show loading message

    const response = await fetch(url);
    console.log(response);
    const data = await response.json();
    console.log(data);
    const phones = data.data;
    console.log(phones);  //array of phones object

    // Hide loading message after data is loaded
    loading.style.display = "none";

 if (phones.length === 0) {
    let p = document.createElement("p");
    p.classList.add("p");
    p.innerText = "No phones found!";
    phoneContainer.innerHTML = ""; // Purana content hatao
    phoneContainer.classList.add("phone");
    phoneContainer.append(p);
    return;
}
    phoneContainer.classList.add(...["grid", "grid-cols-1", "sm:grid-cols-2", "md:grid-cols-3", "gap-10", "justify-items-center"]);

    let fragment = document.createDocumentFragment();
    
    phones.forEach((phone) => {
        let card = document.createElement("div");
        card.classList.add(...["w-72", "bg-base-100", "shadow-xl", "p-6", "text-center", "rounded-lg"]);

    
        let img = document.createElement("img");
        img.src = phone.image;
        img.alt = phone.phone_name;
        img.classList.add(...["w-48", "h-48", "object-contain", "mx-auto", "mt-4"]);
    
        let h3 = document.createElement("h3");
        h3.innerText = phone.phone_name;
        h3.classList.add(...["text-xl", "font-semibold", "mt-4"]);
    
        let p = document.createElement("p");
        p.innerText = "There are many variations of passages available, but the majority have suffered";
        p.classList.add(...["text-lg", "text-gray-400", "mt-2"]);
    
        let showbtn = document.createElement("button");
        showbtn.innerText = "Show Details";
        showbtn.classList.add(...["btn", "bg-indigo-600", "hover:bg-indigo-900", "text-white", "mt-4",  "py-2"]);
        // Event Listener for "Show Details"
        showbtn.addEventListener("click", () => fetchDetails(phone.slug));
        card.append(img, h3, p, showbtn);
        fragment.append(card);
    });
    
    phoneContainer.append(fragment);
}
// Function to fetch and show phone details
async function fetchDetails(phoneId) {
    let detailsUrl = `https://openapi.programming-hero.com/api/phone/${phoneId}`;
    let response = await fetch(detailsUrl);
    let data = await response.json();
    let phoneDetails = data.data;

    // Call function to show modal
    showModal(phoneDetails);
}
function showModal(phone) {
    let modal = document.createElement("div");
    modal.classList.add("fixed", "top-0", "left-0", "w-full",  "bg-gray-900", "bg-opacity-75", "flex", "justify-center", "items-center", "z-50");

    let modalContent = `
        <div class="bg-gray-900 p-6 rounded-lg w-96 text-center">
            <img src="${phone.image}" alt="${phone.name}" class="w-48 h-48 mx-auto">
            <h2 class="text-2xl font-bold my-2">${phone.name}</h2>
            <p class="text-gray-600">Brand: ${phone.brand}</p>
            <p class="text-gray-600">Release Date: ${phone.releaseDate || "Not Available"}</p>
            <p class="text-gray-600">Chipset: ${phone.mainFeatures?.chipSet || "Unknown"}</p>
            <p class="text-gray-600">Display Size: ${phone.mainFeatures?.displaySize || "Unknown"}</p>
            <p class="text-gray-600">Memory: ${phone.mainFeatures?.memory || "Unknown"}</p>
            <p class="text-gray-600">Storage: ${phone.mainFeatures?.storage || "Unknown"}</p>
            <p class="text-gray-600">Sensors: ${phone.mainFeatures?.sensors.join(", ") || "Unknown"}</p>
            <button class="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg close-modal">Close</button>
        </div>
    `;

    modal.innerHTML = modalContent;
    document.body.appendChild(modal);

    // Close modal on button click
    modal.querySelector(".close-modal").addEventListener("click", () => {
        document.body.removeChild(modal);
    });
}
