//load categories

const loadCategories = () => {
  fetch("https://openapi.programming-hero.com/api/categories")
    .then(response => response.json())
    .then(data => displayCategories(data.categories));
};



//display categories

const displayCategories=(categories)=>{
    //1.get into container
    const categoriesContainer=document.getElementById('categories-container');
    categoriesContainer.innerHTML="";
    //2.get into every categories
    for(let category of categories)
    {
        //3.create elements
       const btnDiv=document.createElement('div');
       btnDiv.innerHTML=`
       <button id="Btn-${category.id}" onclick="load_plants_categories(${category.id})" class="btn btn-outline btn-primary w-full">
       ${category.category_name}
      </button>

       `;
       //4.append into container
       categoriesContainer.append(btnDiv);
    }
}
loadCategories();



//load plants by categories

const load_plants_categories = (id) => {
   manageSpinner(true);
    fetch(`https://openapi.programming-hero.com/api/category/${id}`)
        .then(response => response.json())
        .then(data => {
            // Remove active class from all buttons
            const allBtns = document.querySelectorAll('#categories-container button');
            allBtns.forEach(btn => btn.classList.remove('active'));

            // Add active class to clicked button
            const cleckBtn = document.getElementById(`Btn-${id}`);
            cleckBtn.classList.add("active");

            displayloadPlantsCategories(data.plants);
        }); 
};





//display load plants by categories


const displayloadPlantsCategories=(plantscategories)=>{
    //1.get into container
    const PlantsCategories=document.getElementById('card_container');
    PlantsCategories.innerHTML="";
    //2.get into every categories
    for(let plantscategory of plantscategories)
    {
        //3.create elements
       const btnDiv=document.createElement('div');
       btnDiv.innerHTML=`
       <div class="rounded-xl bg-white grid auto width shadow-sm ">
<figure class="h-48 w-full overflow-hidden">
  <img src="${plantscategory.image}" 
       alt="${plantscategory.name}" 
       class="w-full h-full object-cover rounded-t-xl"/>
</figure>

  <div class="card-body">
     <h2 onclick="load_details(${plantscategory.id})" class="card-title ">
            ${plantscategory.name}
          </h2>
    <p>${plantscategory.description.slice(0, 70)}...</p>
    <div class="flex justify-between mt-2">
      <div class="btn-success whitespace-nowrap badge badge-outline text-[#44c071] bg-[#CFF0DC]">${plantscategory.category}</div>
      <div class="badge badge-outline">${plantscategory.price}</div>
    </div>
     <button onclick="addToCart(${plantscategory.id})" 
        class="btn rounded-xl bg-[#15803D] text-white">
     Add to Cart
     </button>

  </div>
</div>
       `;
       //4.append into container
       PlantsCategories.append(btnDiv);
    }
 manageSpinner(false);
}




//defold all plants load
const load_All_plants = () => {
    fetch(`https://openapi.programming-hero.com/api/plants`)
        .then(response => response.json())

       .then(data => displayAllPlants(data.plants)); 
};




//display all plants in defold

const displayAllPlants=(Allplants)=>{
    //1.get into container
    const AllPlants=document.getElementById('card_container');
    AllPlants.innerHTML="";
    //2.get into every categories
    for(let AllPlant of Allplants)
    {
        //3.create elements
       const btnDiv=document.createElement('div');
       btnDiv.innerHTML=`
       <div class="rounded-xl bg-white grid auto width shadow-sm ">
<figure class="h-48 w-full overflow-hidden">
  <img src="${AllPlant.image}" 
       alt="${AllPlant.name}" 
       class="w-full h-full object-cover rounded-t-xl"/>
</figure>

  <div class="card-body">
    <h2 onclick="load_details(${AllPlant.id})" class="card-title">
  ${AllPlant.name}
</h2>

    <p>${AllPlant.description.slice(0, 70)}...</p>
    <div class="flex justify-between mt-2">
      <div class="btn-success whitespace-nowrap badge badge-outline text-[#44c071] bg-[#CFF0DC]"> ${AllPlant.category}</div>
      <div class="badge badge-outline"> ${AllPlant.price}</div>
    </div>
           <button onclick="addToCart(${AllPlant.id})" 
           class="btn rounded-xl bg-[#15803D] text-white mt-2">
           Add to Cart
          </button>
  </div>
</div>
       `;
       //4.append into container
       AllPlants.append(btnDiv);
    }

}

load_All_plants();





// Load plant details by id

const load_details = async (id) => {
    const url = `https://openapi.programming-hero.com/api/plant/${id}`;
    const res = await fetch(url);
   const data = await res.json();
   displayPlantDetails(data.plants);
};



// Display modal details

const displayPlantDetails = (plant) => {

    const modal = document.getElementById("my_modal_5");
    const modalContent = document.getElementById("details-container");

    const plantDetailsHTML = `
        <h3 class="text-2xl font-bold mb-4">${plant.name}</h3>
        <img src="${plant.image}" alt="${plant.name}" class="w-full h-64 object-cover rounded-xl mb-4"/>
        <p class="text-sm text-gray-600 mb-2"><strong>Category:</strong> ${plant.category}</p>
        <p class="text-sm text-gray-600 mb-2"><strong>Price:</strong> $${plant.price}</p>
        <p class="mb-4">${plant.description}</p>
    `;
    modalContent.innerHTML = plantDetailsHTML;

    modal.showModal();
};




//Spinning loading


const manageSpinner=(status)=>{
if(status==true){
  document.getElementById("spinner").classList.remove("hidden");
  document.getElementById("card_container").classList.add("hidden");
}
else
{
  document.getElementById("card_container").classList.remove("hidden");
 document.getElementById("spinner").classList.add("hidden");
   
}
}




let cart = [];
let totalPrice = 0;
let pendingPlant = null;


const addToCart = async (plantId) => {
  const res = await fetch(`https://openapi.programming-hero.com/api/plant/${plantId}`);
  const data = await res.json();
  const plant = data.plants;

  pendingPlant = plant;

  document.getElementById("modal-message").innerText =
    `${plant.name} has been added to the cart`;
  document.getElementById("cart_modal").showModal();
};

document.getElementById("confirm-add").addEventListener("click", () => {
  if (pendingPlant) {
    cart.push(pendingPlant);
    totalPrice += parseFloat(pendingPlant.price);
    updateCartUI();
    pendingPlant = null;
  }
});

const removeFromCart = (index) => {
  totalPrice -= parseFloat(cart[index].price);
  cart.splice(index, 1);
  updateCartUI();
};

const updateCartUI = () => {
  const cartList = document.getElementById("cart-list");
  cartList.innerHTML = "";

  cart.forEach((item, index) => {
    const li = document.createElement("li");
    li.classList.add("flex", "justify-between", "items-center");

    li.innerHTML = `
      <span>${item.name} <br> $${item.price}</span>
      <button onclick="removeFromCart(${index})" class="text-red-500">❌</button>
    `;

    cartList.appendChild(li);
  });


  const totalContainer = document.getElementById("total-container");
  if (cart.length > 0) {
    totalContainer.classList.remove("hidden");
    document.getElementById("total-price").innerText = totalPrice.toFixed(2);
  } else {
    totalContainer.classList.add("hidden");
    document.getElementById("total-price").innerText = "0";
  }
};
