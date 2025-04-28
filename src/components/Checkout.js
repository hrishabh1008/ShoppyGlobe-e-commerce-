import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { selectCartItems, selectCartTotalAmount } from '../redux/slices/cartSlice';

const Checkout = () => {
  const cartItems = useSelector(selectCartItems);
  const totalAmount = useSelector(selectCartTotalAmount);
  const [formSubmitted, setFormSubmitted] = useState(false);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, you would handle the payment processing here
    setFormSubmitted(true);
  };

  if (formSubmitted) {
    return (
      <div className="py-12 text-center animate-fade-in">
        <div className="bg-white rounded-xl shadow-custom p-8 max-w-2xl mx-auto">
          <div className="w-20 h-20 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-6">
            <span className="material-icons-round text-success text-4xl">check_circle</span>
          </div>
          <h1 className="text-3xl font-bold text-secondary mb-4">Order Confirmed!</h1>
          <p className="text-gray-600 mb-8">
            Thank you for your purchase. Your order has been successfully placed and will be processed shortly.
          </p>
          <Link to="/" className="btn btn-primary">
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }
  
  if (cartItems.length === 0) {
    return (
      <div className="py-12 text-center animate-fade-in">
        <div className="bg-white rounded-xl shadow-custom p-8">
          <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-6">
            <span className="material-icons-round text-gray-400 text-4xl">shopping_cart</span>
          </div>
          <h1 className="text-3xl font-bold text-secondary mb-4">Your Cart is Empty</h1>
          <p className="text-gray-600 mb-8">
            Add some products to your cart to proceed with checkout.
          </p>
          <Link to="/" className="btn btn-primary">
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  // Calculate shipping cost and total
  const shippingCost = totalAmount >= 50 ? 0 : 4.99;
  const orderTotal = totalAmount + shippingCost;

  return (
    <div className="py-8 animate-fade-in">
      <h1 className="text-3xl font-bold text-secondary mb-8">Checkout</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="card p-6">
            <h2 className="text-xl font-semibold text-secondary mt-0 mb-6 pb-3 border-b border-gray-100">
              Shipping & Payment Information
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div>
                  <label htmlFor="name" className="block mb-2 font-medium text-secondary">Full Name</label>
                  <input 
                    type="text" 
                    id="name" 
                    placeholder="Enter your full name" 
                    className="input"
                    required 
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block mb-2 font-medium text-secondary">Email</label>
                  <input 
                    type="email" 
                    id="email" 
                    placeholder="Enter your email" 
                    className="input"
                    required 
                  />
                </div>
              </div>
              
              <div className="mb-6">
                <label htmlFor="address" className="block mb-2 font-medium text-secondary">Address</label>
                <input 
                  type="text" 
                  id="address" 
                  placeholder="Enter your address" 
                  className="input"
                  required 
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div>
                  <label htmlFor="city" className="block mb-2 font-medium text-secondary">City</label>
                  <input 
                    type="text" 
                    id="city" 
                    placeholder="City"
                    className="input" 
                    required 
                  />
                </div>
                
                <div>
                  <label htmlFor="postal-code" className="block mb-2 font-medium text-secondary">Postal Code</label>
                  <input 
                    type="text" 
                    id="postal-code" 
                    placeholder="Postal Code" 
                    className="input"
                    required 
                  />
                </div>
                
                <div>
                  <label htmlFor="country" className="block mb-2 font-medium text-secondary">Country</label>
                  <select 
                    id="country" 
                    className="input"
                    required
                  >
                    <option value="">Select a country</option>
                    <option value="usa">United States</option>
                    <option value="canada">Canada</option>
                    <option value="uk">United Kingdom</option>
                    <option value="australia">Australia</option>
                    <option value="india">India</option>
                  </select>
                </div>
              </div>
              
              <h3 className="text-lg font-semibold text-secondary mt-12 mb-6 pb-3 border-b border-gray-100">
                Payment Details
              </h3>
              
              <div className="mb-6">
                <label htmlFor="card-number" className="block mb-2 font-medium text-secondary">Card Number</label>
                <div className="relative">
                  <input 
                    type="text" 
                    id="card-number" 
                    placeholder="0000 0000 0000 0000" 
                    className="input pl-10"
                    required 
                  />
                  <span className="material-icons-round absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                    credit_card
                  </span>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                <div className="md:col-span-2">
                  <label htmlFor="expiry" className="block mb-2 font-medium text-secondary">Expiry Date</label>
                  <input 
                    type="text" 
                    id="expiry" 
                    placeholder="MM/YY" 
                    className="input"
                    required 
                  />
                </div>
                
                <div>
                  <label htmlFor="cvv" className="block mb-2 font-medium text-secondary">CVV</label>
                  <input 
                    type="text" 
                    id="cvv" 
                    placeholder="CVV" 
                    className="input"
                    required 
                  />
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link 
                  to="/cart" 
                  className="btn btn-secondary"
                >
                  Back to Cart
                </Link>
                <button 
                  type="submit" 
                  className="btn btn-primary flex-grow"
                >
                  <span className="material-icons-round mr-2">shopping_bag</span>
                  Place Order
                </button>
              </div>
            </form>
          </div>
        </div>
        
        <div>
          <div className="bg-white rounded-xl shadow-custom p-6 sticky top-24">
            <h3 className="text-xl font-semibold text-secondary mt-0 mb-6 pb-3 border-b border-gray-100">
              Order Summary
            </h3>
            
            <div className="space-y-4 max-h-80 overflow-y-auto pr-2 mb-6">
              {cartItems.map((item) => (
                <div key={item.id} className="flex items-center py-3 border-b border-gray-100">
                  <div className="w-12 h-12 rounded overflow-hidden flex-shrink-0">
                    <img src={item.thumbnail} alt={item.title} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-grow ml-3 min-w-0">
                    <h4 className="text-sm font-medium text-secondary truncate">{item.title}</h4>
                    <div className="text-xs text-gray-500">Qty: {item.quantity}</div>
                  </div>
                  <div className="font-medium text-secondary text-sm">
                    ${item.totalPrice.toFixed(2)}
                  </div>
                </div>
              ))}
            </div>
            
            <div className="space-y-2 mb-4">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span>${totalAmount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Shipping</span>
                <span>{shippingCost === 0 ? 'Free' : `$${shippingCost.toFixed(2)}`}</span>
              </div>
              {totalAmount >= 50 && (
                <div className="flex justify-between text-success text-sm font-medium">
                  <span>Free shipping discount</span>
                  <span>-$0.00</span>
                </div>
              )}
            </div>
            
            <div className="flex justify-between font-bold text-lg text-secondary pt-4 border-t border-gray-100">
              <span>Total</span>
              <span>${orderTotal.toFixed(2)}</span>
            </div>
            
            {totalAmount < 50 && (
              <div className="mt-3 p-3 bg-blue-50 text-blue-700 text-sm rounded-lg">
                <div className="flex items-start">
                  <span className="material-icons-round text-blue-700 mr-2">info</span>
                  <span>Add ${(50 - totalAmount).toFixed(2)} more to qualify for free shipping!</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout; 