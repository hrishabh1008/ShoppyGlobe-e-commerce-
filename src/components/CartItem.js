import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { addToCart, removeFromCart, removeItemCompletely } from '../redux/slices/cartSlice';

const CartItem = ({ item }) => {
  const dispatch = useDispatch();
  
  const handleIncreaseQuantity = () => {
    dispatch(addToCart(item));
  };
  
  const handleDecreaseQuantity = () => {
    dispatch(removeFromCart(item.id));
  };
  
  const handleRemoveItem = () => {
    dispatch(removeItemCompletely(item.id));
  };

  return (
    <div className="card p-4 transition-all hover:border-primary">
      <div className="flex items-center">
        {/* Image */}
        <Link to={`/product/${item.id}`} className="block w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
          <img 
            src={item.thumbnail} 
            alt={item.title} 
            className="w-full h-full object-cover"
          />
        </Link>
        
        {/* Product info */}
        <div className="ml-4 flex-grow min-w-0">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start">
            <div className="mb-2 sm:mb-0">
              <h3 className="text-base font-medium text-secondary truncate pr-8">
                <Link to={`/product/${item.id}`} className="hover:text-primary transition-colors">
                  {item.title}
                </Link>
              </h3>
              <div className="text-gray-500 text-sm mt-1">${item.price}</div>
            </div>
            
            <div className="flex items-center space-x-4">
              {/* Quantity selector */}
              <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
                <button 
                  className="w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-gray-100 transition-colors"
                  onClick={handleDecreaseQuantity}
                  aria-label="Decrease quantity"
                >
                  <span className="material-icons-round text-lg">remove</span>
                </button>
                
                <div className="w-10 h-8 flex items-center justify-center font-medium border-l border-r border-gray-200">
                  {item.quantity}
                </div>
                
                <button 
                  className="w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-gray-100 transition-colors"
                  onClick={handleIncreaseQuantity}
                  aria-label="Increase quantity"
                >
                  <span className="material-icons-round text-lg">add</span>
                </button>
              </div>
              
              {/* Item total */}
              <div className="font-bold text-secondary w-20 text-right">
                ${item.totalPrice.toFixed(2)}
              </div>
            </div>
          </div>
          
          {/* Remove button */}
          <button 
            className="absolute top-4 right-4 text-gray-400 hover:text-danger transition-colors"
            onClick={handleRemoveItem}
            aria-label="Remove item"
          >
            <span className="material-icons-round">close</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItem; 