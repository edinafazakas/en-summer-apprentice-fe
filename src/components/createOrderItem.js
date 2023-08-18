import { kebabCase } from "../utils";
import { useStyle } from "./styles";
import { getTicketCategories } from '../components/getTicketCategories';
import { updateOrder } from "./updateOrder";
import { deleteOrder } from "./deleteOrder";
import { addLoader, removeLoader } from "./loader";



export const createOrderCard = (order, ticketCategories) => {
    const orderCardStyles = useStyle('orderCard');

    const orderCard = document.createElement('div');
    orderCard.classList.add(...orderCardStyles);

    const orderCardContent = document.createElement('div');
    orderCardContent.classList.add(...useStyle('orderCardContent'));


    const purchaseTypeSelect = document.createElement('select');
    purchaseTypeSelect.classList.add(...useStyle('purchaseTypeWrapper'));

    ticketCategories.forEach(category => {
        const option = document.createElement('option');
        option.value = category.ticketCategoryID;
        option.textContent = category.description;
        purchaseTypeSelect.appendChild(option);
    });

    purchaseTypeSelect.value = order.ticketCategory.ticketCategoryID; // Set the selected value
    purchaseTypeSelect.setAttribute('disabled', 'true');

    const orderID = createDiv(...useStyle('orderID'));
    orderID.innerText = `${order.orderID}`;
    orderCard.appendChild(orderID);

    const purchaseTitle = createParagraph(...useStyle('purchaseTitle'));
    purchaseTitle.innerText = kebabCase(order.ticketCategory.event?.name ?? "Unknown event");
    orderCard.appendChild(purchaseTitle);

    const purchaseDate = createDiv(...useStyle('purchaseDate'));
    purchaseDate.innerText = new Date(order.orderedAt).toLocaleDateString();
    orderCard.appendChild(purchaseDate);

    
    const purchaseType = createSelect(...useStyle('purchaseTypeWrapper'));
    purchaseType.setAttribute('disabled', 'true');
    purchaseType.innerHTML = `<option value="${order.ticketCategory.ticketCategoryID}">${order.ticketCategory.description}</option>`;
    const purchaseTypeWrapper = createDiv(...useStyle('purchaseTypeWrapper'));
    purchaseTypeWrapper.append(purchaseType);
    orderCard.appendChild(purchaseTypeWrapper);

    const purchaseQuantity = createInput(...useStyle('purchaseQuantity'));
    purchaseQuantity.type = 'number';
    purchaseQuantity.min = '1';
    purchaseQuantity.value = `${order.numberOfTickets ?? 0}`;
    purchaseQuantity.disabled = true;
    const purchaseQuantityWrapper = createDiv(...useStyle('purchaseQuantity'));
    purchaseQuantityWrapper.append(purchaseQuantity);
    orderCard.appendChild(purchaseQuantityWrapper);

    const purchasePrice = createDiv(...useStyle('purchasePrice'));
    purchasePrice.innerText = order.totalPrice;
    orderCard.appendChild(purchasePrice);

    orderCard.appendChild(orderCardContent);
    orderCardContent.appendChild(orderID);
    orderCardContent.appendChild(purchaseTitle);
    orderCardContent.appendChild(purchaseDate);
    orderCardContent.appendChild(purchaseTypeWrapper);
    orderCardContent.appendChild(purchaseQuantityWrapper);
    orderCardContent.appendChild(purchasePrice);

    const actions = document.createElement('div');
    actions.classList.add(...useStyle('orderCardActions'));

    const editButton = createButton([...useStyle(['actionButton', 'editButton'])], '<i class="fa-solid fa-pencil"></i>', editHandler);
    const saveButton = createButton([...useStyle(['actionButton', 'hiddenButton', 'saveButton'])], '<i class="fa-solid fa-check"></i>', saveHandler);
    const cancelButton = createButton([...useStyle(['actionButton', 'hiddenButton', 'cancelButton'])], '<i class="fa-solid fa-xmark"></i>', cancelHandler);
    const deleteButton = createButton([...useStyle(['actionButton', 'deleteButton'])], '<i class="fa-solid fa-trash-can"></i>', deleteHandler);

    actions.appendChild(editButton);
    actions.appendChild(saveButton);
    actions.appendChild(cancelButton);
    actions.appendChild(deleteButton);

    orderCardContent.appendChild(actions);

    function createDiv(...classes) {
        const div = document.createElement('div');
        div.classList.add(...classes);
        return div;
    }

    function createParagraph(...classes) {
        const p = document.createElement('p');
        p.classList.add(...classes);
        return p;
    }

    function createInput(...classes) {
        const input = document.createElement('input');
        input.classList.add(...classes);
        return input;
    }

    function createSelect(...classes) {
        const select = document.createElement('select');
        select.classList.add(...classes);
        return select;
    }

    function createButton(classes, innerHTML, handler) {
        const button = document.createElement('button');
        button.classList.add(...classes);
        button.innerHTML = innerHTML;
        button.addEventListener('click', handler);
        return button;
    }

    function createButton(classes, innerHTML, handler) {
        const button = document.createElement('button');
        button.classList.add(...classes);
        button.innerHTML = innerHTML;
        button.addEventListener('click', handler);
        return button;
    }

    function editHandler() {
        if (saveButton.classList.contains('hidden') && cancelButton.classList.contains('hidden')) {
            editButton.classList.add('hidden');
            saveButton.classList.remove('hidden');
            cancelButton.classList.remove('hidden');
            purchaseType.removeAttribute('disabled');
            purchaseQuantity.removeAttribute('disabled');
            editButton.classList.add('hidden');
        }
    }

    function saveHandler() {
        const newType = purchaseType.value;
        const newQuantity = purchaseQuantity.value;
        if (newType != order.ticketCategory.ticketCategoryID || newQuantity != order.numberOfTickets) {
            addLoader();
            updateOrder(order.orderID, newType, newQuantity)  // Use order.orderID instead of order.id
                .then((res) => {
                    if (res.status === 200) {
                        res.json().then((data) => {
                            order = data;
                            purchasePrice.innerText = order.totalPrice;
                            purchaseDate.innerText = new Date(order.orderedAt).toLocaleDateString();  // Use order.orderedAt instead of order.orderDate
                        });
                    }
                })
                .finally(() => {
                    setTimeout(() => {
                        removeLoader();
                    }, 200);
                });
        }

        saveButton.classList.add('hidden');
        cancelButton.classList.add('hidden');
        editButton.classList.remove('hidden');
        purchaseType.setAttribute('disabled', 'true');
        purchaseQuantity.setAttribute('disabled', 'true');
    }


    function cancelHandler() {
        saveButton.classList.add('hidden');
        cancelButton.classList.add('hidden');
        editButton.classList.remove('hidden');
        Array.from(purchaseType.options).forEach(function (element, index) {
            if (element.value == order.tickets[0].ticketCategory.id) {
                purchaseType.options.selectedIndex = index;
                return;
            }
        });
        purchaseQuantity.value = order.tickets.length;
        purchaseType.setAttribute('disabled', 'true');
        purchaseQuantity.setAttribute('disabled', 'true');
    }

    function deleteHandler() {
        deleteOrder(order.orderID);
    }
    orderCard.appendChild(orderCardContent);

    return orderCard;
};

