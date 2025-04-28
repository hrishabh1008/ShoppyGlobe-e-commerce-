import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/slices/cartSlice';

const ProductItem = ({ product }) => {
  const dispatch = useDispatch();
  
  const handleAddToCart = () => {
    dispatch(addToCart(product));
  };

  // Generate discount percentage
  const discountPercentage = product.discountPercentage || Math.floor(Math.random() * 30) + 5;
  const originalPrice = Math.round(product.price * (100 / (100 - discountPercentage)));

  return (
    <div className="card h-full flex flex-col group">
      {/* Badge */}
      {discountPercentage > 0 && (
        <div className="absolute top-3 left-3 z-10 bg-primary text-secondary px-2 py-1 rounded-md text-xs font-bold">
          {discountPercentage}% OFF
        </div>
      )}
      
      {/* Image container */}
      <div className="h-52 overflow-hidden relative">
        <img 
          src={product.thumbnail} 
          alt={product.title} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-black bg-opacity-10 transition-opacity duration-300 opacity-0 group-hover:opacity-100"></div>
      </div>
      
      {/* Content */}
      <div className="p-5 flex-grow flex flex-col">
        <div className="mb-2">
          <span className="inline-block text-xs font-medium px-2 py-1 bg-gray-100 text-gray-600 rounded-full capitalize">
            {product.category}
          </span>
        </div>
        
        <h3 className="font-medium text-lg mb-2 line-clamp-2 h-14">
          <Link 
            to={`/product/${product.id}`} 
            className="text-secondary no-underline hover:text-primary transition-colors"
          >
            {product.title}
          </Link>
        </h3>
        
        <div className="flex items-center mt-auto mb-3">
          <div className="flex items-center text-amber-500">
            <span className="material-icons-round text-sm">star</span>
            <span className="ml-1 font-medium">{product.rating}</span>
          </div>
          <span className="mx-2 text-gray-300">•</span>
          <span className="text-gray-500 text-sm">
            {product.stock > 10 ? 'In Stock' : product.stock > 0 ? 'Low Stock' : 'Out of Stock'}
          </span>
        </div>
        
        <div className="flex items-center mb-4">
          <span className="text-xl font-bold text-secondary">${product.price}</span>
          {discountPercentage > 0 && (
            <span className="ml-2 text-sm text-gray-500 line-through">${originalPrice}</span>
          )}
        </div>
        
        <button 
          className={`w-full py-2.5 px-4 rounded-lg flex items-center justify-center transition-all font-medium
            ${product.stock <= 0 
              ? 'bg-gray-200 text-gray-500 cursor-not-allowed' 
              : 'bg-primary text-secondary hover:bg-primaryDark transform hover:scale-[1.02]'
            }`}
          onClick={handleAddToCart}
          disabled={product.stock <= 0}
        >
          <span className="material-icons-round text-sm mr-1">
            {product.stock <= 0 ? 'remove_shopping_cart' : 'add_shopping_cart'}
          </span>
          {product.stock <= 0 ? 'Out of Stock' : 'Add to Cart'}
        </button>
      </div>
    </div>
  );
};

export default ProductItem; 