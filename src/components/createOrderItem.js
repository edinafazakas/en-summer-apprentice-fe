import { kebabCase } from "../utils";
import { useStyle } from "./styles";

export const createOrderItem = (categories, order) =>{
    const purchase = document.createElement('div');
    purchase.id = `purchase-${order.id}`;
    purchase.classList.add(...useStyle('purchase'));


    const purchaseTitle = createParagraph(...useStyle('purchaseTitle'));
    purchaseTitle.innerText = kebabCase(order.event.name);
    purchase.appendChild(purchaseTitle);
}