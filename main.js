// import './src/mocks/handlers';
import { createOrderItem } from './src/components/createOrderItem';
import { useStyle } from '/src/components/styles';
import { kebabCase, addPurchase } from '/src/utils';
import { addLoader, removeLoader } from './src/components/loader';

let events = [];
let currentImgIndex = 0;

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
          <div class="containerFiltered">
            <div id="filterContainer">
                <select id="venueFilter">
                <!-- Options will be populated dynamically -->
                </select>
                <select id="eventTypeFilter">
                <!-- Options will be populated dynamically -->
                </select>
                <button id="filterButton">Filter</button>
            </div>
          </div>
        <div class="events flex items-center justify-center flex-wrap">
      </div>
    `;
}

function getOrdersPageTemplate() {
  return `
  <div id="content">
      <h1 class="text-2xl mb-5 mt-8 text-center" id="purchased-title">Purchased Tickets</h1>
      <div class="purchases m-6 mr-6" id="purchases">
        <div class="bg-white px-4 py-3 gap-x-4 flex font-bold">
          <div class="flex-1">
            <span>Order ID</span>
          </div>
          <div class="flex-1">
            <span>Name</span>
          </div>
          <div class="flex-1">
            <span>Nr Tickets</span>
          </div>
          <div class="flex-1">
            <span>Category</span>
          </div>
          <div class="flex-1 md:flex">
            <span>Date</span>
          </div>
          <div>
            <span>Price</span>
          </div>
          <div class="w-28 sm:w-8"></div>
        </div>
        <div id="purchases-content"></div>
      </div>
    </div>
  `;
}

function liveSearch() {
  const filterInput = document.querySelector('#searchInput');
  if (filterInput) {
    const searchValue = filterInput.value;

    if (searchValue !== undefined) {
      const filteredEvents = events.filter((event) =>
        event.name.toLowerCase().includes(searchValue.toLowerCase())
      );
      addEvents(filteredEvents);
    }
  }
}

function setupFilterEvents() {
  const nameFilterInput = document.querySelector('#searchInput');
  nameFilterInput.addEventListener('keyup', liveSearch);
}



async function applyFilter() {
  const selectedVenue = document.querySelector('#venueFilter').value;
  const selectedEventType = document.querySelector('#eventTypeFilter').value;

  const response = await fetch(
    `http://localhost:8080/eventsByVenueLocationAndEventType?eventType=${encodeURIComponent(selectedEventType)}&venue=${encodeURIComponent(selectedVenue)}`
  );
  const filteredEvents = await response.json();
  addEvents(filteredEvents);

}



function populateFilters() {
  const venues = [...new Set(events.map(event => event.venue.location))];
  const eventTypes = [...new Set(events.map(event => event.eventType.name))];

  const venueFilter = document.querySelector('#venueFilter');
  venues.forEach(venue => {
    const option = document.createElement('option');
    option.value = venue;
    option.textContent = venue;
    venueFilter.appendChild(option);
  });

  const eventTypeFilter = document.querySelector('#eventTypeFilter');
  eventTypes.forEach(eventType => {
    const option = document.createElement('option');
    option.value = eventType;
    option.textContent = eventType;
    eventTypeFilter.appendChild(option);
  });
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




async function renderHomePage() {
  const mainContentDiv = document.querySelector('.main-content-component');
  mainContentDiv.innerHTML = getHomePageTemplate();
  setupFilterEvents();
  applyFilter();

  addLoader();

  try {
    events = await fetchTicketEvents();
    populateFilters();


    const filterButton = document.getElementById('filterButton');
    filterButton.addEventListener('click', applyFilter);
    setTimeout(() => {
      removeLoader();
    }, 300);

    liveSearch();
  } catch (error) {
    console.error('Error fetching events data: ', error);
  }
}

async function fetchTicketEvents() {
  //java api
  const response = await fetch('http://localhost:8080/getEvents');
  //const response = await fetch('https://localhost:7068/api/Event/GetAll');
  const data = await response.json();

  return data;
}

async function fetchOrders() {
  //java api
  const response = await fetch('http://localhost:8080/allOrders');
  const data = await response.json();
  return data;
}

const addEvents = (events) => {
  const eventDiv = document.querySelector('.events');
  eventDiv.innerHTML = 'No events';
  if (events.length) {
    eventDiv.innerHTML = '';
    events.forEach((event) => {
      eventDiv.appendChild(createEvent(event));
    });
  }
};

const createEvent = (eventData) => {
  const title = kebabCase(eventData.eventType.name);
  const eventElement = createEventElement(eventData, title);
  return eventElement;
};

const createEventElement = (eventData, title) => {
  const { eventID, description, name, ticketCategories } = eventData;
  console.log('eventData:', eventData);
  console.log('title:', title);
  console.log('event name', name);
  let imgURL = '';
  console.log('ticketCategories:', ticketCategories);
  const eventDiv = document.createElement('div');
  const eventWrapperClasses = useStyle('eventWrapper');
  const actionsWrapperClasses = useStyle('actionsWrapper');
  const quantityClasses = useStyle('quantity');
  const inputClasses = useStyle('input');
  const quantityActionsClasses = useStyle('quantityActions');
  const increaseBtnClasses = useStyle('increaseBtn');
  const decreaseBtnClasses = useStyle('decreaseBtn');
  const addToCartBtnClasses = useStyle('addToCartBtn');


    if (name === "Untold") {
      imgURL = 'https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?cs=srgb&dl=pexels-wendy-wei-1190298.jpg&fm=jpg';
    } else if (name === "Soccer game") {
      imgURL = 'https://images.mlssoccer.com/image/private/t_q-best/prd-league/nkiijghg8wni2aodsyvb.jpg';
    } else if (name === "Wine Festival"){
      imgURL = 'https://images.ctfassets.net/8x8155mjsjdj/1af9dvSFEPGCzaKvs8XQ5O/a7d4adc8f9573183394ef2853afeb0b6/Copy_of_Red_Wine_Blog_Post_Header.png';
    } else if (name === "Classical concert"){
      imgURL = 'https://images.theconversation.com/files/497498/original/file-20221128-24-3ldy04.jpg?ixlib=rb-1.1.0&rect=7%2C845%2C5071%2C2535&q=45&auto=format&w=1356&h=668&fit=crop';
    } else if (name === "Art exhibition"){
      imgURL =   'https://images.wsj.net/im-700005?width=1280&size=1.77777778';
    } else if (name === "Cinema in the park"){
      imgURL =   'https://dcist.com/wp-content/uploads/sites/3/2022/05/0002_kittner-20150721-2-1500x1001.jpg';
    } else if (name === "Stand-up Night"){
      imgURL =   'https://www.apollotheater.org/app/uploads/2021/11/ComedyClub.jpg';
    } else if (name === "Basketball Match"){
      imgURL =   'https://media.istockphoto.com/id/467634080/photo/basketball-game.jpg?s=612x612&w=0&k=20&c=8BGyRa8U4AXoqstjPXA5t8ukZs6EEUn0PhQsmKOh8Zw=';
    }

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

  // const categoriesOptions = ticketCategories.map(
  //   (ticketCategory) =>
  //     `<option value=${ticketCategory.id}>${ticketCategory.description}</option>`
  // );

  const ticketTypeMarkup = `
    <h2 class="ticket-type-text text-lg font-bold mb-2">Choose Ticket Type:</h2>
    <select id="ticketType" name="ticketType" class="select ${title}-ticket-type">
      ${ticketCategories
      .map(
        (ticketCategory) =>
          `<option value="${ticketCategory.ticketCategoryID}">${ticketCategory.description}</option>`
      )
      .join('')}
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
    if (!input.value) {
      input.value = 0;
    } else {
    }
  });

  input.addEventListener('input', () => {
    const currentQuantity = parseInt(input.value);
    if (currentQuantity > 0) {
      addToCart.disabled = false;
    } else {
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
    if (currentQuantity > 0) {
      addToCart.disabled = false;
    } else {
      addToCart.disabled = true;
    }
  });

  const decrease = document.createElement('button');
  decrease.classList.add(...decreaseBtnClasses);
  decrease.innerText = '-';
  decrease.addEventListener('click', () => {
    input.value = parseInt(input.value) - 1;
    const currentQuantity = parseInt(input.value);
    if (currentQuantity > 0) {
      addToCart.disabled = false;
    } else {
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
  addToCart.innerText = 'Buy Ticket';
  addToCart.disabled = true;

  addToCart.addEventListener('click', () => {
    const eventID = eventData.eventID; // Use the event ID from eventData
    console.log('eventID: ', eventID);
    handleAddToCart(title, eventID, input, addToCart);
  });

  eventFooter.appendChild(addToCart);
  eventDiv.appendChild(eventFooter);

  return eventDiv;
};

const handleAddToCart = (title, eventID, input, addToCart) => {
  const ticketCategoryID = parseInt(
    document.querySelector(`.${kebabCase(title)}-ticket-type`).value
  );
  const numberOfTickets = parseInt(input.value);

  if (numberOfTickets > 0) {
    addLoader();
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
      .then((response) => {
        if (!response.ok) {
          throw new Error('Something went wrong...');
        }
        return response.json();
      })
      .then((data) => {
        console.log('Order created successfully:', data);
        input.value = 0;
        addToCart.disabled = true;
        toastr.success('Order made successfully!');
      })
      .catch((error) => {
        console.error('Error creating order:', error);
      })
      .finally(() => {
        removeLoader();
      });
  } else {
    console.log('Number of tickets must be greater than 0.');
  }
};

function renderOrdersPage(categories) {
  const mainContentDiv = document.querySelector('.main-content-component');
  mainContentDiv.innerHTML = getOrdersPageTemplate();

  const purchasesContent = document.getElementById('purchases-content');
  addLoader();
  setTimeout(() => {
    removeLoader();

    fetchOrders().then((orders) => {
      if (orders.length) {
        orders.forEach((order) => {
          const ticketCategory = order.ticketCategory.ticketCategory;
          const newOrder = createOrderItem(ticketCategory, order);
          purchasesContent.appendChild(newOrder);
        });
      } else {
        purchasesContent.innerHTML = 'No orders found.';
      }
    });
  }, 500);
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
