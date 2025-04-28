import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
  fetchProducts, 
  selectFilteredProducts, 
  selectProductsStatus, 
  selectProductsError,
  selectSearchTerm,
  setSearchTerm
} from '../redux/slices/productsSlice';
import ProductItem from './ProductItem';
import useProducts from '../hooks/useProducts';

const ProductList = () => {
  const dispatch = useDispatch();
  const products = useSelector(selectFilteredProducts);
  const status = useSelector(selectProductsStatus);
  const error = useSelector(selectProductsError);
  const searchTerm = useSelector(selectSearchTerm);
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  // Using custom hook - this is for demonstration purposes
  // In a real app, we'd choose either Redux or the custom hook approach
  const { products: hookProducts, loading: hookLoading, error: hookError } = useProducts();
  
  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchProducts());
    }
  }, [status, dispatch]);
  
  const handleSearchChange = (e) => {
    dispatch(setSearchTerm(e.target.value));
  };

  // Get unique categories from products
  const categories = products.length > 0 
    ? ['all', ...new Set(products.map(product => product.category))]
    : ['all'];

  // Filter products by category and search term
  const filteredProducts = selectedCategory === 'all' 
    ? products 
    : products.filter(product => product.category === selectedCategory);

  let content;
  
  if (status === 'loading') {
    content = (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        <span className="ml-3 text-lg text-gray-600">Loading products...</span>
      </div>
    );
  } else if (status === 'failed') {
    content = (
      <div className="text-center text-danger py-12">
        <span className="material-icons-round text-5xl">error_outline</span>
        <p className="mt-2">Error: {error}</p>
      </div>
    );
  } else if (filteredProducts.length === 0) {
    content = (
      <div className="text-center py-12">
        <span className="material-icons-round text-5xl text-gray-400">search_off</span>
        <p className="mt-4 text-lg text-gray-600">No products found with the current filters.</p>
        <button 
          onClick={() => {
            dispatch(setSearchTerm(''));
            setSelectedCategory('all');
          }}
          className="mt-4 btn btn-primary"
        >
          Clear Filters
        </button>
      </div>
    );
  } else {
    content = (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
        {filteredProducts.map((product, index) => (
          <div 
            key={product.id} 
            className="animate-fade-in" 
            style={{ animationDelay: `${index * 0.05}s` }}
          >
            <ProductItem product={product} />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="py-6">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary to-primaryLight rounded-xl p-8 mb-8 shadow-custom">
        <h1 className="text-3xl md:text-4xl font-bold text-secondary mb-4">Welcome to ShoppyGlobe</h1>
        <p className="text-secondary text-lg mb-6">Discover amazing products at unbeatable prices!</p>
        <div className="relative max-w-xl">
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="input pl-10 shadow-md"
          />
          <span className="material-symbols-rounded absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
            search
          </span>
        </div>
      </div>
      
      {/* Category Filters */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-secondary mb-4">Our Products</h2>
        <div className="flex flex-wrap gap-2">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full transition-all ${
                selectedCategory === category
                  ? 'bg-primary text-secondary font-medium'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>
      </div>
      
      {content}
    </div>
  );
};

export default ProductList; 