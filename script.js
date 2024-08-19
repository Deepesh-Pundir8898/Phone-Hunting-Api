const input = document.querySelector(".search-input input");
const searchBtn = document.querySelector(".search-btn");
const searchProductContainer = document.querySelector(".mobile-container");

const modal = document.getElementById("phoneModal");
const modalTitle = document.getElementById("modalTitle");
const modalImage = document.getElementById("modalImage");
const modalDescription = document.getElementById("modalDescription");
const modalSlug = document.getElementById("modalSlug");
const closeBtn = document.querySelector(".close");
const modelContent = document.querySelector(".modal-content")

searchBtn.addEventListener("click", () => {
    const searchValue = input.value.trim();
    searchProduct(searchValue);
});

window.addEventListener('load', () => {
    searchProduct();
});

async function searchProduct(value = 'iphone') {
    searchProductContainer.innerHTML = "";
    const response = await fetch(`https://openapi.programming-hero.com/api/phones?search=${value}`);

    const data = await response.json();
    const phones = data['data'];
    createElement(phones);
}

function createElement(phones) {
    phones.forEach(phone => {
        // console.log(phone);
        const phoneCard = document.createElement('div');
        phoneCard.classList = `card`;
        phoneCard.innerHTML = `
            <figure class="px-10 pt-10">
                <img src="${phone.image}" alt="phone" class="mobile-image" />
            </figure>
            <div class="card-body">
                <h2 class="card-title">${phone.phone_name}</h2>
                <p>There are many variations of passages of available, but the majority have suffered</p>
                <div class="card-actions">
                    <button onclick="showDetailsHandler('${phone.phone_name}', '${phone.image}', '${phone.slug}','${phone.brand}')">Show Details</button>
                </div>
            </div>
        `;
        searchProductContainer.appendChild(phoneCard);
    });
}

function showDetailsHandler(name, image, slug , brand) {
    
    modalTitle.textContent = name;
    modalImage.src = image;
    modalSlug.textContent = `Slug: ${slug}`;
    // const features=phone.mainFeatures;
    // //console.log(features.storage);
    // console.log(phone.image);
    // let string="";
    // for (const key in features) {

    //     //detailsSpec.innerHTML=`${features[key]} <br>`;

    //     //detailsSpec.innerText=`${features[key]} <br>`;
    //     //console.log(`${key}:${features[key]}`);
    //     string=string+`${key}: ${features[key]} \n`;

    // }
    // modalDescription.textContent=string;
    modalDescription.innerText = `Brand : ${brand}

        Storage: 64GB storage, microSDXC

    displaySize: 6.5 inches, 102.0 cm2 (~81.1% screen-to-body ratio)
    `;

    modal.style.display = "flex";
    document.body.classList.add("no-scroll"); 
}

closeBtn.onclick = function() {
    modelContent.classList.add("popdown");
    setTimeout(()=>{
        modelContent.classList.remove("popdown");
        modal.style.display="none";
    },1000)
    document.body.classList.remove("no-scroll");
}

// Close the modal when the user clicks anywhere outside of the modal   
// window.onclick = function(event) {
//     if (event.target === modal) {
//         modal.style.display = "none";
//         document.body.classList.remove("no-scroll"); 
//     }
// }
