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
    
        card.append(img, h3, p, showbtn);
        fragment.append(card);
    });
    
    phoneContainer.append(fragment);
}
