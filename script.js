let cart = [];
const toggleBtn = (id) => {
    const btns = document.querySelectorAll('.btn-t');

    btns.forEach((btn) => {
        
        btn.classList.remove('text-white', 'bg-[#15803dFF]');
        btn.classList.add('text-black' , 'bg-transparent');
    });

    const toggle = document.querySelector(`#${id}`);

    toggle.classList.remove('text-black' , 'bg-transparent');
    toggle.classList.add('text-white', 'bg-[#15803dFF]');
    

    
};
            // button toggling ends 
const loadModal = async (id) => {

    const url = `https://openapi.programming-hero.com/api/plant/${id}`;
    const res = await fetch(url);
    const data = await res.json();
   
    displayModal(data.plants);
    document.querySelector('#my_modal_5').showModal();
}


const loadCategory = async () =>{
    const url = 'https://openapi.programming-hero.com/api/categories';
    const res = await fetch(url);
    const data = await res.json();
    displayCatergory(data.categories)
};
const loadPlants = async (id) => {

    const url = `https://openapi.programming-hero.com/api/category/${id}`;
    const res = await fetch(url);
    const data = await res.json();

    displayPlants(data.plants);
};

const loadAllPlants = async () => {
    const url = 'https://openapi.programming-hero.com/api/plants';
    const res = await fetch(url);
    const data = await res.json();
    displayPlants(data.plants);
}

const displayCatergory = (categories) => {

    const categoryContainer = document.querySelector('#rest-btn');
    categories.forEach(category => {
        
        categoryContainer.innerHTML += `
        <button id="btn-${category.id}" onclick="loadPlants('${category.id}'); toggleBtn('btn-${category.id}')"  class="btn btn-t w-full flex justify-start bg-transparent border-0 text-black  mb-2">
            ${category.category_name}
        </button>
        `
    });

};

const displayPlants = (plants) => {

    const plantContainer = document.querySelector('#plant-container');

    plantContainer.innerHTML = '';

    plants.forEach((plant) => {
        
        plantContainer.innerHTML += ` <div class="card bg-base-100 w-[345px]  h-[382px] shadow-sm rounded-xl " >
                            <figure class="w-full " onclick="loadModal('${plant.id}'); ">
                                <img
                                src="${plant.image}"
                                alt="${plant.name}"
                                class="rounded-t-xl" />
                            </figure>
                              <div class="card-body items-center text-center">
                                <h2 class="card-title">${plant.name}</h2>
                                <p class="line-clamp-2">${plant.description}</p>
                                <div class="card-actions w-full">
                                <button class="cart  btn  bg-[#15803dFF] text-white w-full rounded-3xl" onclick ="add2cart(${plant.id  },'${plant.name}', ${plant.price})">Add to Cart</button>
                                </div>
                              </div>
                            </div>`;

    });

};

const displayModal = (plant) => {

    const modalContainer = document.querySelector('.modal');

    modalContainer.innerHTML=`
        <div class="modal-box w-[400px] h-[500px] p-0 shadow-sm rounded-xl">
             <div class="card h-[500px] shadow-sm rounded-xl ">
                <figure class="w-full ">
                    <img
                    src="${plant.image}"
                    alt="${plant.name}"
                    class="rounded-t-xl w-full" />
                </figure>
                    <div class="card-body items-center text-center">
                        <h2 class="card-title">${plant.name}</h2>
                            <p>${plant.description}</p>
                            <div class="flex w-[350px] justify-between items-center">
                                <span class="bg-green-100 border-green-700 text-green-700 px-3 py-2 rounded-full">   ${plant.category}</span>
                                <span class="bg-green-100 border-green-700  text-green-700 px-8 py-2 rounded-full ">ট ${plant.price}</span>
                            </div>
                            <div class="card-actions w-full flex justify-between">
                            <form method="dialog">
                      
                            <button class="btn  bg-[#af1717] text-white  rounded-3xl">Close</button>
                            </form>
                             <button class="cart btn  bg-[#15803dFF] text-white  rounded-3xl " onclick ="add2cart(${plant.id  },'${plant.name}', ${plant.price})">Add to Cart</button>
                            </div>
                        </div>


                    </div>
                </div>
        </div>
    `
};

const add2cart  = (id,name,price) => {
   
    let excisting = cart.find( item => item.id === id);

    if(excisting){

        excisting.quantity= excisting.quantity+1;
    }
    else{

                cart.push({
            id,
            name,
            price,
            quantity:1,
        })
    };

    displayCart(); 


};

const displayCart = () => {

    const cartContainer = document.querySelector('#cart-details');
    const total = document.querySelector('.total');
    let count = 0; 
    console.log(cart);
    cartContainer.innerHTML = '';
    cart.forEach((e)=>{
        console.log(e.name,e.id,e.price);
        if(e.quantity > 0){

            count = count + (e.price * e.quantity);
        };
        
        cartContainer.innerHTML += `
                         <div class=" bg-green-100 flex justify-between items-center p-2 rounded-2xl">
                            <div class="bg-green-50">
                                <h4 class="text-xl ">${e.name} </h4>
                                <p class="text-gray-400 ">${e.price} <i class="fa-solid fa-xmark"></i> ${e.quantity}</p>
                            </div>
                            <div onclick="removeCart(${e.id})">
                                <i class="fa-solid fa-xmark delete"></i>
                            </div>
                        </div>
        `;

    });

    if(count > 0){
    total.innerText = `Total : ${count}`;}
    else{
        total.innerText ='';
    }
};


const removeCart = (id) => {

let newCart = cart.filter(i => i.id!== id);

cart = newCart;

displayCart();
   
}
loadCategory();
loadAllPlants();
