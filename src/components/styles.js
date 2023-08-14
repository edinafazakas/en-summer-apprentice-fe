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
      'flex-1', 
    ],
  
    purchaseTitle: [
      'text-lg',
      'font-medium',
      'text-gray-900',
      'left',
      'flex-1',
    ],
  
    purchaseQuantity: [
      'w-[50px]',
      'left',
      'text-center',
      'py-1',
      'px-2',
      'border',
      'border-orange-700',
      'border-2',
      'disabled:border-0',
      'rounded',
      'text-orange-700',
      'text-sm',
      'leading-tight',
      'font-bold',
      'disabled:text-gray-700',
      'focus:outline-none',
      'focus:shadow-outline',
    ],
  
    purchaseTypeWrapper: [
      'flex',
      'flex-row',
      'justify-end',
      'flex-1',
    ],
  
    purchaseDate: [
      'text-center',
      'flex-1',
      'hidden',
      'md:flex',
    ],
  
    purchasePrice: [
      'text-center',
      'w-12',
      'hidden',
      'md:flex',
    ],
  
    actions: [
      'sm:mt-0',
      'sm:text-right',
      'w-28',
    ],
  
    actionButton: [
      'ml-2',
      'text-xl',
      'ps-2',
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
      'mt-4',
    ],
  
    input: [
      'input',
      'w-16',
      'text-center',
      'border',
      'border-gray-300',
      'rounded',
      'py-2',
      'px-3',
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
  };
  
  export function useStyle(type) {
    if (typeof type == 'string') return bookOfStyles[type];
    else {
      const allStyles = type.map((t) => bookOfStyles[t]);
      return allStyles.flat();
    }
  }
  