// import './src/mocks/handlers';
import {useStyle} from '/src/components/styles';
import {kebabCase, addPurchase} from '/src/utils';

const imgUrls = [
  'https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?cs=srgb&dl=pexels-wendy-wei-1190298.jpg&fm=jpg',
  'https://images.mlssoccer.com/image/private/t_q-best/prd-league/nkiijghg8wni2aodsyvb.jpg',
  'https://images.ctfassets.net/8x8155mjsjdj/1af9dvSFEPGCzaKvs8XQ5O/a7d4adc8f9573183394ef2853afeb0b6/Copy_of_Red_Wine_Blog_Post_Header.png',
  'https://images.theconversation.com/files/497498/original/file-20221128-24-3ldy04.jpg?ixlib=rb-1.1.0&rect=7%2C845%2C5071%2C2535&q=45&auto=format&w=1356&h=668&fit=crop'
];


// Navigate to a specific URL
function navigateTo(url) {
  history.pushState(null, null, url);
  renderContent(url);
}

// HTML templates
function getHomePageTemplate() {
  return `
      <div id="content">
        <div class="header-image-container">
        <img src="./src/assets/Liveevent-general.jpg" alt="Header Image" id="headerImage">
        <input type="text" id="searchInput" placeholder="  Search events...">
        <ul id="searchResults"></ul>
        </div>
        <div class="events flex items-center justify-center flex-wrap">
      </div>
    `;
}

function getOrdersPageTemplate() {
  return `
    <div id="content">
    <h1 class="text-2xl mb-4 mt-8 text-center">Purchased Tickets</h1>
      <div class = "purchases m1-6 mr-6">
        <div class"bg-white px-4 py-3 gap-x-4 flex font-bold">
          <span >Name</span>
          <span class="flex-1">Nr Tickets</span>
          <span class="flex-1">Category</span>
          <span class="flex-1"md:flex">Date</span>
          <span>Price</span>
          <span class="w-28 sm:w-8"></span>
        </div>
        <div id="purchases-content">
        </div>
      </div>
    </div>
  `;
}

function setupNavigationEvents() {
  const navLinks = document.querySelectorAll('nav a');
  navLinks.forEach((link) => {
    link.addEventListener('click', (event) => {
      event.preventDefault();
      const href = link.getAttribute('href');
      navigateTo(href);
    });
  });
}

function setupMobileMenuEvent() {
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mobileMenu = document.getElementById('mobileMenu');

  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });
  }
}

function setupPopstateEvent() {
  window.addEventListener('popstate', () => {
    const currentUrl = window.location.pathname;
    renderContent(currentUrl);
  });
}

function setupInitialPage() {
  const initialUrl = window.location.pathname;
  renderContent(initialUrl);
}

function renderHomePage() {
  const mainContentDiv = document.querySelector('.main-content-component');
  mainContentDiv.innerHTML = getHomePageTemplate();

  console.log('function', fetchTicketEvents());
  fetchTicketEvents().then((data) => {
  console.log('data', data);
  addEvents(data);
   });
}


async function fetchTicketEvents(){
  //java api
  const response = await fetch('http://localhost:8080/getEvents');
  //const response = await fetch('https://localhost:7068/api/Event/GetAll');
  const data = await response.json();
  return data;
}

async function fetchOrders(){
  //java api
  const response = await fetch('http://localhost:8080/allOrders');
  //const response = await fetch('https://localhost:7068/api/Event/GetAll');
  const data = await response.json();
  return data;
}



const addEvents = (events) =>{
  const eventDiv = document.querySelector('.events');
  eventDiv.innerHTML = 'No events';
  if(events.length){
    eventDiv.innerHTML = '';
    events.forEach(event => {
      eventDiv.appendChild(createEvent(event));
    });
  }
}



const createEvent = (eventData) =>{
  const title = kebabCase(eventData.eventType.name);
  const eventElement = createEventElement(eventData, title);
  return eventElement;
 };

 let currentImgIndex = 0;



 const createEventElement = (eventData, title) => {
  const { eventID, description, name, ticketCategories } = eventData;
  const imgURL = imgUrls[currentImgIndex % imgUrls.length];
  currentImgIndex++;
  const eventDiv = document.createElement('div');
  const eventWrapperClasses = useStyle('eventWrapper');
  const actionsWrapperClasses = useStyle('actionsWrapper');
  const quantityClasses = useStyle('quantity');
  const inputClasses = useStyle('input');
  const quantityActionsClasses = useStyle('quantityActions');
  const increaseBtnClasses = useStyle('increaseBtn');
  const decreaseBtnClasses = useStyle('decreaseBtn');
  const addToCartBtnClasses = useStyle('addToCartBtn');

  //Set up event wrapper
  eventDiv.classList.add(...eventWrapperClasses);

  //Create the event content markup
  const contentMarkup = `
    <div class="content">
      <h2 class="event-title text-2xl font-bold margin-bottom : 20px;">${name}</h2>
      <img src="${imgURL}" alt="${name}" class="event-image">
      <p>&nbsp;</p>
      <p>&nbsp;</p>
      <p class="description text-gray-700">${description}</p>
    </div>
  `;
  eventDiv.innerHTML = contentMarkup;

//Create ticket type selection and quantity input
const actions = document.createElement('div');
actions.classList.add(...actionsWrapperClasses);

const categoriesOptions = ticketCategories.map(
  (ticketCategory) =>
  `<option value=${ticketCategory.id}>${ticketCategory.description}</option>`
);

const ticketTypeMarkup = `
  <h2 class="ticket-type-text text-lg font-bold mb-2">Choose Ticket Type:</h2>
  <select id="ticketType" name="ticketType" class="select ${title}-ticket-type">
    ${ticketCategories.map(ticketCategory => 
      `<option value="${ticketCategory.ticketCategoryID}">${ticketCategory.description}</option>`
    ).join('')}
  </select>
`;

actions.innerHTML = ticketTypeMarkup;

const quantity = document.createElement('div');
quantity.classList.add(...quantityClasses);

const input = document.createElement('input');
input.classList.add(...inputClasses);
input.type = 'number';
input.min = '0';
input.value = '0';

input.addEventListener('blur', () => {
  if(!input.value){
    input.value = 0;
  }
  else{

  }
});

input.addEventListener('input', () => {
  const currentQuantity = parseInt(input.value);
  if(currentQuantity > 0){
    addToCart.disabled = false;
  }
  else{
    addToCart.disabled = true;
  }
});

quantity.appendChild(input);

const quantityActions = document.createElement('div');
quantityActions.classList.add(...quantityActionsClasses);

const increase = document.createElement('button');
increase.classList.add(...increaseBtnClasses);
increase.innerText = '+';
increase.addEventListener('click', () => {
  input.value = parseInt(input.value) + 1;
  const currentQuantity = parseInt(input.value);
  if(currentQuantity > 0){
    addToCart.disabled = false;
  }
  else{
    addToCart.disabled = true;
  }
});

const decrease = document.createElement('button');
decrease.classList.add(...decreaseBtnClasses);
decrease.innerText = '-';
decrease.addEventListener('click', () => {
  input.value = parseInt(input.value) - 1;
  const currentQuantity = parseInt(input.value);
  if(currentQuantity > 0){
    addToCart.disabled = false;
  }
  else{
    addToCart.disabled = true;
  }
});

quantityActions.appendChild(increase);
quantityActions.appendChild(decrease);

quantity.appendChild(quantityActions);
actions.appendChild(quantity);
eventDiv.appendChild(actions);

//Create the event footer with "Add to cart" button
const eventFooter = document.createElement('footer');
const addToCart = document.createElement('button');
addToCart.classList.add(...addToCartBtnClasses);
addToCart.innerText = 'Add To Cart';
addToCart.disabled = true;

addToCart.addEventListener('click', () => {
  const eventID = eventData.eventID; // Use the event ID from eventData
  console.log("eventID: ", eventID);
  handleAddToCart(title, eventID, input, addToCart);
});

eventFooter.appendChild(addToCart);
eventDiv.appendChild(eventFooter);

return eventDiv;
}




const handleAddToCart = (title, eventID, input, addToCart) => {
  const ticketCategoryID = parseInt(document.querySelector(`.${kebabCase(title)}-ticket-type`).value);
  const numberOfTickets = parseInt(input.value);

  if (numberOfTickets > 0) {
    const requestBody = {
      eventID: eventID,
      ticketCategoryID: ticketCategoryID,
      numberOfTickets: numberOfTickets,
    };

    fetch('http://localhost:8080/createOrder', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Something went wrong...');
      }
      return response.json();
    })
    .then(data => {
      console.log('Order created successfully:', data);
      input.value = 0;
      addToCart.disabled = true;
    })
    .catch(error => {
      console.error('Error creating order:', error);
    });
  } else {
    console.log('Number of tickets must be greater than 0.');
  }
};


function renderOrdersPage(categories) {
  const mainContentDiv = document.querySelector('.main-content-component');
  mainContentDiv.innerHTML = getOrdersPageTemplate();

  const purchaseDiv = document.querySelector('.purchases');
  const purchasesContent = document.getElementById('purchases-content');
  if(purchaseDiv){
    fetchOrders().then((orders) => {
      if(orders.length()){
        orders.forEach((order)=>{
          const newOrder = createOrderItem(categories, order);
          purchasesContent.appendChild(newOrder);
        });
        purchaseDiv.appendChild(purchasesContent);
      }
    })
  }
}

// Render content based on URL
function renderContent(url) {
  const mainContentDiv = document.querySelector('.main-content-component');
  mainContentDiv.innerHTML = '';

  if (url === '/') {
    renderHomePage();
  } else if (url === '/orders') {
    renderOrdersPage();
  }
}

// Call the setup functions
setupNavigationEvents();
setupMobileMenuEvent();
setupPopstateEvent();
setupInitialPage();
