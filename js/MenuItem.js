const params = new URLSearchParams(window.location.search);
const dishId = params.get('id');
const container = document.querySelector('.itemcontainer');
const url = `https://food-delivery.kreosoft.ru/api/dish/${dishId}`;
fetch(url, {
  method: 'GET',
  headers: {
    'Accept': 'application/json'
  }
})
  .then(response => response.json())
  .then(dish => {
    container.innerHTML = '';
    const dishElem = document.createElement('div');
    let Veg = '';
    if(`${dish.vegetarian}`){
      Veg += "Vegetarian";
    }
    else{
      Veg += "Not Vegetarian"
    }
    dishElem.className = 'row-md-4 mb-3';
    dishElem.innerHTML = `
      <div class="card" data-id="${dish.id}">
      <h5 class="text-uppercase">${dish.name}</h5>
        <img src="${dish.image}" class="card-img-top">
        <div class="card-body">
        <p>Dish category - ${dish.category}</p>
        <p>${Veg}</p>
        <div class="rating card-body">
      </div>
          <p class="card-text">${dish.description}</p>
          <div class="container-price text-black ">
            <span>Price-${dish.price}₽/dish</span>
          </div>
        </div>
      </div>
    `;
    const starsContainer = dishElem.querySelector('.rating');
    const rating = dish.rating;
    
    starsContainer.innerHTML = '';
    for (let i = 0; i < Math.floor(rating); i++) {
      const star = document.createElement('div');
      star.classList.add('star', 'gold');
      starsContainer.appendChild(star);
    }
    
    if (rating % 1 !== 0) {
      const halfStar = document.createElement('div');
      halfStar.classList.add('star', 'half');
      starsContainer.appendChild(halfStar);
    }
    
    const emptyStarsCount = 10 - Math.ceil(rating);
    
    for (let i = 0; i < emptyStarsCount; i++) {
      const emptyStar = document.createElement('div');
      emptyStar.classList.add('star');
      starsContainer.appendChild(emptyStar);
    }
    container.appendChild(dishElem);

    })
  
  .catch(error => console.error(error)
);

