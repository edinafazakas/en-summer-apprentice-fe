const bookOfStyles = {
  purchase: [
    'bg-white',
    'px-4',
    'py-3',
    'gap-x-4',
    'sm:border-b',
    'sm:border-gray-300',
    'flex',
  ],

  orderID: [
    'order-id',
    'font-medium',
    'text-sm',
    'text-gray-700',
    'mt-2',
    'ml-[80px]',
    'mr-[-150px]',
    'flex-1',
  ],

  purchaseTitle: [
    'text-md',
    'font-medium',
    'text-gray-800',
    'left',
    'w-[150px]',
    'mr-[300px]'
  ],
  
  purchaseQuantity: [
    'w-[50px]',                    // Width when enabled
    'h-[28px]',                    // Height when enabled
    'text-sm',
    'font-bold',
    'enabled:ml-[-100px]',     
    'disabled:ml-[-100px]' ,           // Add margin to the left
    'items-center',                // Center items vertically                  // Border when enabled
    'border-orange-700',           // Border color when enabled
    'text-orange-700',             // Text color when enabled
    'disabled:ml-0',               // Remove margin when disabled
    'disabled:border-none',  
    'disabled:ml[-100px]' ,        // No border when disabled
    'disabled:text-gray-700',      // Text color when disabled
  ],
  
  
  
  purchaseTypeWrapper: [
    'flex',
    'flex-column',
    'justify-center',
    'flex-1',
    'mr-[200px]', // Add margin to the left
    'w-[150px]',
    'ml-[0px]',
    'text-center', // Center the text inside the select element
  ],

  purchaseDate: [
    'text-center',
    'flex-1',
  ],

  purchasePrice: [
    'text-center',
    'w-40',
    'hidden',
    'md:flex',
    'mr-[-200px]',                        // Add margin to the right
  ],

  actions: [
    'sm:mt-0',
    'sm:text-right',
    'w-28',
  ],

  actionButton: [
    'ml-4',
    'text-xl',
    'ps-2',
    'mr-4',
    'font-medium',
    'underline',
    'text-gray-700',
  ],

  deleteButton: ['hover:text-red-500'],
  cancelButton: ['hover:text-red-500'],
  saveButton: ['hover:text-green-500'],
  editButton: ['hover:text-blue-500'],
  hiddenButton: ['hidden'],

  eventWrapper: [
    'event',
    'bg-white',
    'rounded',
    'shadow-md',
    'p-4',
    'flex',
    'flex-col',
    'm-6',
    'mt-8',
    'width-500',
  ],

  actionsWrapper: [
    'actions',
    'flex',
    'item-center',
    'mt-4',
  ],

  quantity: [
    'actions',
    'flex',
    'items-center',
    'mt-2',
  ],

  input: [
    'input',
    'w-10',
    'text-center',
    'border',
    'border-gray-300',
    'rounded',
    'py-1',
    'px-1',
    'text-gray-700',
    'focus:outline-none',
    'focus:show:outline',
  ],

  quantityActions: [
    'quantity-actions',
    'flex',
    'space-x-2',
    'ml-6',
  ],

  increaseBtn: [
    'increase',
    'px-3',
    'py-1',
    'rounded',
    'add-btn',
    'text-white',
    'hover:ng-red-300',
    'focus:outline-none',
    'focus:shadow-outline',
  ],

  decreaseBtn: [
    'decrease',
    'px-3',
    'py-1',
    'rounded',
    'bg-black',
    'text-white',
    'hover:bg-black-300',
    'focus:outline-none',
    'focus:shadow-outline',
  ],

  addToCartBtn: [
    'add-to-cart-btn',
    'px-4',
    'py-2',
    'rounded',
    'text-white',
    'font-bold',
    'disabled:opacity-50',
    'disabled:cursor-not-allowed',
    'focus:outline-none',
    'focus:shadow-outline',
  ],

  orderCardsContainer: [
    'mt-20',       // Add margin at the top (adjust as needed)
    'grid',       // Use grid layout for order cards
    'grid-cols-1', // Display one column of order cards
    'gap-4',      // Add gap between order cards
  ],

  orderCard: [
    'bg-white',
    'p-2',        // Add padding to the order card
    'rounded-md',
    'shadow-md',
    'mb-3',      // Reduced margin to make the cards smaller in height
    'flex',
    'flex-col',
    'border',
    'border-gray-300',
    'transition',
    'hover:shadow-lg',
  ],


  orderCardContent: [
    'flex',          // Display content horizontally
    'flex-row',      // Display content in a column
    'w-1/11',        // Set the width to 100%
    'space-x-8',     // Add vertical spacing between values
  ],
  
  infoValue: [
    'font-normal',
    'flex',
    'bg-gray-100',
    'px-4',   // Adjust the padding as needed
    'py-4',
    'rounded-md',
    'w-40',   // Adjust the width as needed
  ],

  orderCardActions: [
    'flex',
    'mt-4',       // Add margin between info and buttons
    'space-x-1',  // Add space between buttons
  ],


  orderCardInfoRow: [
    'flex',
    'items-start',
    'gap-0',            // Reduce the gap between items
  ],

  orderCardInfoLabel: [
    'font-small',
    'flex',
    'text-gray-700',
    'w-1/2',            // Adjust the label width
  ],

  orderCardInfoValue: [
    'text-gray-900',
    'flex',
    'w-1/3',            // Adjust the value width
  ],
  
  orderCardDetails: [
    'flex',
    'flex-col',
    'divide-y',              // Add dividing lines between details
    'divide-gray-300',
  ],
  
  orderCardEventName: [
    'flex',
    'text-lg',
    'font-medium',
    'text-gray-900',
    'mb-2',
  ],
  
  orderCardQuantity: [
    'flex',
    'text-gray-700',
    'mt-2',                  // Add margin at the top
  ],
  
  orderCardDate: [
    'flex',
    'text-gray-700',
    'mt-2',                  // Add margin at the top
  ],
  
  orderCardFooter: [
    'mt-6',                  // Add margin at the top
    'flex',
    'justify-between',
    'items-center',
  ],

  
  buttonContainer: [
    'flex',                 // Display buttons in a row
    'space-x-10',            // Add spacing between buttons
  ],
};

export function useStyle(type) {
  if (typeof type == 'string') return bookOfStyles[type];
  else {
    const allStyles = type.map((t) => bookOfStyles[t]);
    return allStyles.flat();
  }
}
