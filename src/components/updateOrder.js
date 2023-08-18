export function updateOrder(orderID, nextType, newQuantity){
    return fetch(`http://localhost:8080/updateOrder/${orderID}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            orderID: orderID,
            ticketCategoryID: nextType,
            numberOfTickets: newQuantity,
        })
    }).then((resp) => {
        if(resp.status === 200){
            toastr.success('Successfully updated!');
            window.location.reload();
        } else {
            toastr.error('Error updating order!');
        }
        return resp;
    }).catch((err) => {
        throw new Error(err);
    })
}