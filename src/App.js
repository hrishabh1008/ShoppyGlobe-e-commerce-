import React, { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';

// Lazy-loaded components for code splitting
const ProductList = lazy(() => import('./components/ProductList'));
const ProductDetail = lazy(() => import('./components/ProductDetail'));
const Cart = lazy(() => import('./components/Cart'));
const Checkout = lazy(() => import('./components/Checkout'));
const NotFound = lazy(() => import('./components/NotFound'));

// Loading component
const LoadingFallback = () => (
  <div className="flex items-center justify-center min-h-[70vh]">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
    <span className="ml-3 text-lg text-secondary">Loading...</span>
  </div>
);

// Error Boundary as a component
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Error caught by boundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center min-h-[70vh] p-6 text-center">
          <div className="text-danger text-5xl mb-4">
            <span className="material-icons-round text-6xl">error_outline</span>
          </div>
          <h2 className="text-2xl font-bold text-secondary mb-2">Something went wrong</h2>
          <p className="text-gray-600 mb-6">We're sorry for the inconvenience. Please try refreshing the page.</p>
          <button
            onClick={() => window.location.reload()}
            className="btn btn-primary"
          >
            Refresh Page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

function App() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1 py-8">
        <div className="container">
          <ErrorBoundary>
            <Suspense fallback={<LoadingFallback />}>
              <Routes>
                <Route path="/" element={<ProductList />} />
                <Route path="/product/:id" element={<ProductDetail />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </ErrorBoundary>
        </div>
      </main>
      <footer className="bg-secondary text-white py-6">
        <div className="container text-center">
          <p className="mb-2">© {new Date().getFullYear()} ShoppyGlobe. All rights reserved.</p>
          <p className="text-sm text-gray-400">Built with React, Redux, and Tailwind CSS</p>
        </div>
      </footer>
    </div>
  );
}

export default App; 