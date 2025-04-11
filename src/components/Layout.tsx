
import React from 'react';
import { Link } from 'react-router-dom';
import { Home, CreditCard, HelpCircle } from 'lucide-react';

type LayoutProps = {
  children: React.ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-finance-lightGray">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-2">
            <CreditCard className="h-6 w-6 text-finance-teal" />
            <span className="font-bold text-xl text-finance-blue">LoanPredictor</span>
          </Link>
          <nav>
            <ul className="flex items-center space-x-6">
              <li>
                <Link to="/" className="flex items-center space-x-1 text-finance-darkGray hover:text-finance-blue transition-colors">
                  <Home className="h-4 w-4" />
                  <span>Home</span>
                </Link>
              </li>
              <li>
                <Link to="/about" className="flex items-center space-x-1 text-finance-darkGray hover:text-finance-blue transition-colors">
                  <HelpCircle className="h-4 w-4" />
                  <span>About</span>
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>
      <main className="container mx-auto px-4 py-8">
        {children}
      </main>
      <footer className="bg-finance-blue text-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between">
            <div className="mb-6 md:mb-0">
              <p className="font-bold text-lg mb-2">LoanPredictor</p>
              <p className="text-blue-200">Making loan decisions smarter and easier</p>
            </div>
            <div>
              <p className="text-sm text-blue-200">© {new Date().getFullYear()} LoanPredictor. All rights reserved.</p>
              <p className="text-sm text-blue-200 mt-1">This is a demo application. Not financial advice.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
