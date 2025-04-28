import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { 
  fetchProductById, 
  selectProduct, 
  selectProductsStatus, 
  selectProductsError
} from '../redux/slices/productsSlice';
import { addToCart } from '../redux/slices/cartSlice';

const ProductDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const product = useSelector(selectProduct);
  const status = useSelector(selectProductsStatus);
  const error = useSelector(selectProductsError);
  
  useEffect(() => {
    dispatch(fetchProductById(id));
  }, [id, dispatch]);
  
  const handleAddToCart = () => {
    if (product) {
      dispatch(addToCart(product));
    }
  };
  
  const handleGoBack = () => {
    navigate(-1);
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(<span key={`full-${i}`} className="material-icons-round text-amber-500">star</span>);
    }
    
    if (hasHalfStar) {
      stars.push(<span key="half" className="material-icons-round text-amber-500">star_half</span>);
    }
    
    const emptyStars = 5 - stars.length;
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<span key={`empty-${i}`} className="material-icons-round text-gray-300">star</span>);
    }
    
    return stars;
  };

  let content;
  
  if (status === 'loading') {
    content = (
      <div className="flex justify-center items-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        <span className="ml-3 text-lg text-gray-600">Loading product details...</span>
      </div>
    );
  } else if (status === 'failed') {
    content = (
      <div className="text-center text-danger py-20">
        <span className="material-icons-round text-6xl">error_outline</span>
        <p className="mt-4 text-xl">Error: {error}</p>
        <button onClick={handleGoBack} className="mt-6 btn btn-primary">
          Go Back
        </button>
      </div>
    );
  } else if (!product) {
    content = (
      <div className="text-center py-20">
        <span className="material-icons-round text-6xl text-gray-400">inventory_2</span>
        <p className="mt-4 text-xl text-gray-600">Product not found</p>
        <button onClick={handleGoBack} className="mt-6 btn btn-primary">
          Go Back
        </button>
      </div>
    );
  } else {
    // Calculate discount percentage if available
    const discountPercentage = product.discountPercentage || Math.floor(Math.random() * 30) + 5;
    const originalPrice = Math.round(product.price * (100 / (100 - discountPercentage)));
    
    content = (
      <div className="animate-fade-in">
        <div className="bg-white rounded-xl shadow-custom overflow-hidden">
          <div className="grid md:grid-cols-2 gap-0">
            {/* Image gallery */}
            <div className="bg-gray-50 p-6 flex items-center justify-center">
              <div className="relative w-full aspect-square overflow-hidden rounded-xl">
                <img 
                  src={product.thumbnail} 
                  alt={product.title} 
                  className="w-full h-full object-contain"
                />
                {discountPercentage > 0 && (
                  <div className="absolute top-4 left-4 bg-primary text-secondary px-3 py-1 rounded-md text-sm font-bold">
                    {discountPercentage}% OFF
                  </div>
                )}
              </div>
            </div>
            
            {/* Product info */}
            <div className="p-8 flex flex-col">
              <div className="mb-2">
                <span className="inline-block text-sm font-medium px-2 py-1 bg-gray-100 text-gray-600 rounded-full capitalize">
                  {product.category}
                </span>
              </div>
              
              <h1 className="text-3xl font-bold text-secondary mb-4">{product.title}</h1>
              
              <div className="flex items-center mb-4">
                <div className="flex">
                  {renderStars(product.rating)}
                </div>
                <span className="ml-2 text-sm text-gray-500">({product.rating} of 5)</span>
              </div>
              
              <div className="flex items-center mb-6">
                <span className="text-3xl font-bold text-secondary">${product.price}</span>
                {discountPercentage > 0 && (
                  <span className="ml-3 text-lg text-gray-500 line-through">${originalPrice}</span>
                )}
              </div>
              
              <div className="p-4 bg-gray-50 rounded-lg mb-6">
                <div className="flex items-center text-gray-700 mb-2">
                  <span className="material-icons-round mr-2 text-gray-500">inventory</span>
                  <span>
                    Status: 
                    <span className={`ml-1 font-medium ${product.stock > 0 ? 'text-success' : 'text-danger'}`}>
                      {product.stock > 10 ? 'In Stock' : product.stock > 0 ? 'Low Stock' : 'Out of Stock'}
                    </span>
                  </span>
                </div>
                {product.stock > 0 && (
                  <div className="flex items-center text-gray-700">
                    <span className="material-icons-round mr-2 text-gray-500">local_shipping</span>
                    <span>Free shipping on orders over $50</span>
                  </div>
                )}
              </div>
              
              <p className="text-gray-700 leading-relaxed mb-8">{product.description}</p>
              
              <div className="mt-auto flex flex-col sm:flex-row gap-3">
                <button 
                  className={`btn flex-grow ${product.stock <= 0 
                    ? 'bg-gray-200 text-gray-500 cursor-not-allowed' 
                    : 'btn-primary'}`}
                  onClick={handleAddToCart}
                  disabled={product.stock <= 0}
                >
                  <span className="material-icons-round mr-2">
                    {product.stock <= 0 ? 'remove_shopping_cart' : 'add_shopping_cart'}
                  </span>
                  {product.stock <= 0 ? 'Out of Stock' : 'Add to Cart'}
                </button>
                <button 
                  className="btn btn-secondary flex-grow-0"
                  onClick={handleGoBack}
                >
                  <span className="material-icons-round mr-2">arrow_back</span>
                  Back
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-8">
      {content}
    </div>
  );
};

export default ProductDetail; 