import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { selectCartItems, selectCartTotalAmount, clearCart } from '../redux/slices/cartSlice';
import CartItem from './CartItem';

const Cart = () => {
  const cartItems = useSelector(selectCartItems);
  const totalAmount = useSelector(selectCartTotalAmount);
  const dispatch = useDispatch();
  
  const handleClearCart = () => {
    dispatch(clearCart());
  };

  return (
    <div className="py-8 animate-fade-in">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <h1 className="text-3xl font-bold text-secondary mb-4 md:mb-0">Your Cart</h1>
        {cartItems.length > 0 && (
          <button 
            className="flex items-center px-4 py-2 bg-danger text-white font-medium rounded-lg hover:bg-dangerDark transition-colors"
            onClick={handleClearCart}
          >
            <span className="material-icons-round mr-2 text-sm">delete</span>
            Clear Cart
          </button>
        )}
      </div>
      
      {cartItems.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-xl shadow-custom">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gray-100 mb-6">
            <span className="material-icons-round text-4xl text-gray-400">shopping_cart</span>
          </div>
          <h2 className="text-2xl font-bold text-secondary mb-3">Your cart is empty</h2>
          <p className="text-gray-600 max-w-md mx-auto mb-8">Looks like you haven't added anything to your cart yet.</p>
          <Link 
            to="/" 
            className="btn btn-primary inline-flex items-center"
          >
            <span className="material-icons-round mr-2">shopping_bag</span>
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="mb-4 flex items-center text-gray-500">
              <span>Products ({cartItems.length})</span>
            </div>
            <div className="space-y-4">
              {cartItems.map((item) => (
                <CartItem key={item.id} item={item} />
              ))}
            </div>
          </div>
          
          <div>
            <div className="bg-white rounded-xl shadow-custom p-6 sticky top-24">
              <h2 className="text-xl font-bold text-secondary mb-6 pb-4 border-b border-gray-100">Order Summary</h2>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>${totalAmount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span>{totalAmount >= 50 ? 'Free' : '$4.99'}</span>
                </div>
                {totalAmount >= 50 && (
                  <div className="flex justify-between text-success font-medium">
                    <span>Free shipping discount</span>
                    <span>-$0.00</span>
                  </div>
                )}
                <div className="pt-3 mt-3 border-t border-gray-100">
                  <div className="flex justify-between font-bold text-lg text-secondary">
                    <span>Total</span>
                    <span>${totalAmount >= 50 ? totalAmount.toFixed(2) : (totalAmount + 4.99).toFixed(2)}</span>
                  </div>
                  {totalAmount < 50 && (
                    <div className="mt-2 text-sm text-gray-500">
                      Add ${(50 - totalAmount).toFixed(2)} more for free shipping
                    </div>
                  )}
                </div>
              </div>
              
              <div className="flex flex-col gap-3">
                <Link 
                  to="/checkout" 
                  className="btn btn-primary"
                >
                  Proceed to Checkout
                </Link>
                <Link 
                  to="/" 
                  className="btn btn-secondary"
                >
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart; 