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
       <div class="rounded-xl bg-white w-50 shadow-sm ">
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
     <div class="btn rounded-xl bg-[#15803D]">Add to Cart</div>
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
       <div class="rounded-xl bg-white w-50 shadow-sm ">
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
     <div class="btn rounded-xl bg-[#15803D]">Add to Cart</div>
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

    // Construct the HTML for the modal content
    const plantDetailsHTML = `
        <h3 class="text-2xl font-bold mb-4">${plant.name}</h3>
        <img src="${plant.image}" alt="${plant.name}" class="w-full h-64 object-cover rounded-xl mb-4"/>
        <p class="text-sm text-gray-600 mb-2"><strong>Category:</strong> ${plant.category}</p>
        <p class="text-sm text-gray-600 mb-2"><strong>Price:</strong> $${plant.price}</p>
        <p class="mb-4">${plant.description}</p>
    `;

    // Insert the HTML content into the designated container
    modalContent.innerHTML = plantDetailsHTML;

    // Show the modal
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

