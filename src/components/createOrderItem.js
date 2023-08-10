import { kebabCase } from "../utils";
import { useStyle } from "./styles";
import { getTicketCategories } from '../components/getTicketCategories';

export const createOrderItem = (categories, order) => {
    const purchase = document.createElement('div');
    purchase.id = `purchase-${order.orderID}`;
    purchase.classList.add(...useStyle('purchase'));


    const orderID = createDiv(...useStyle('orderID'));
    orderID.innerText = `${order.orderID}`; 
    purchase.appendChild(orderID);

    // Create and append purchase title
    const purchaseTitle = createParagraph(...useStyle('purchaseTitle'));
    purchaseTitle.innerText = kebabCase(order.ticketCategory.event.name ?? "Unknown event");
    purchase.appendChild(purchaseTitle);

    // Create and append purchase quantity
    const purchaseQuantity = createInput(...useStyle('purchaseQuantity'));
    purchaseQuantity.type = 'number';
    purchaseQuantity.min = '1';
    purchaseQuantity.value = `${order.numberOfTickets ?? 0}`;
    purchaseQuantity.disabled = true;
    const purchaseQuantityWrapper = createDiv(...useStyle('purchaseQuantity'));
    purchaseQuantityWrapper.append(purchaseQuantity);
    purchase.appendChild(purchaseQuantityWrapper);

    // Create and append purchase type
    const purchaseType = createSelect(...useStyle('purchaseTypeWrapper'));
    purchaseType.setAttribute('disabled', 'true');
    purchaseType.innerHTML = `<option value="${order.ticketCategory.ticketCategoryID}">${order.ticketCategory.description}</option>`;
    const purchaseTypeWrapper = createDiv(...useStyle('purchaseTypeWrapper'));
    purchaseTypeWrapper.append(purchaseType);
    purchase.appendChild(purchaseTypeWrapper);

    // Create and append purchase date
    const purchaseDate = createDiv(...useStyle('purchaseDate'));
    purchaseDate.innerText = new Date(order.orderedAt).toLocaleDateString();
    purchase.appendChild(purchaseDate);

    // Create and append purchase price
    const purchasePrice = createDiv(...useStyle('purchasePrice'));
    purchasePrice.innerText = order.totalPrice;
    purchase.appendChild(purchasePrice);

    // Create and append actions buttons
    const actions = createDiv(...useStyle('actions'));
    const editButton = createButton([...useStyle(['actionButton', 'editButton'])], '<i class="fa-solid fa-pencil"></i>', editHandler);
    const saveButton = createButton([...useStyle(['actionButton', 'hiddenButton', 'saveButton'])], '<i class="fa-solid fa-check"></i>', saveHandler);
    const cancelButton = createButton([...useStyle(['actionButton', 'hiddenButton', 'cancelButton'])], '<i class="fa-solid fa-xmark"></i>', cancelHandler);
    const deleteButton = createButton([...useStyle(['actionButton', 'deleteButton'])], '<i class="fa-solid fa-trash-can"></i>', deleteHandler);

    actions.appendChild(editButton);
    actions.appendChild(saveButton);
    actions.appendChild(cancelButton);
    actions.appendChild(deleteButton);

    purchase.appendChild(actions);

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

    function editHandler() {
        if (saveButton.classList.contains('hidden') && cancelButton.classList.contains('hidden')) {
            editButton.classList.add('hidden');
            saveButton.classList.remove('hidden');
            cancelButton.classList.remove('hidden');
            purchaseType.removeAttribute('disabled');
            purchaseQuantity.removeAttribute('disabled');
        }
    }

    function saveHandler() {
        const newType = purchaseType.value;
        const newQuantity = purchaseQuantity.value;
        if (newType != order.tickets[0].ticketCategory.id || newQuantity != order.tickets.length) {
            addLoader();
            updateOrder(order.id, newType, newQuantity)
                .then((res) => {
                    if (res.status === 200) {
                        res.json().then((data) => {
                            order = data;
                            purchasePrice.innerText = order.totalPrice;
                            purchaseDate.innerText = new Date(order.orderDate).toLocaleDateString();
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
        deleteOrder(order.id);
    }

    return purchase;
};