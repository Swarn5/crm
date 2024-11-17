import React, { useState } from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import CustomerForm from '../components/DataIngestion/CustomerForm';
import OrderForm from '../components/DataIngestion/OrderForm';
import AudienceForm from '../components/DataIngestion/AudienceForm';
import CampaignList from '../components/CampaignListing/CampaignList';
import HomePage from '../pages/HomePage';

const Home = ({ onLogout }) => {
  const navigate = useNavigate();
  const [selectedCard, setSelectedCard] = useState(''); // State to track selected card

  const handleLogout = async () => {
    await onLogout();
    navigate('/login', { replace: true });
  };

  const cardClasses = (cardName) =>
    `card bg-[#1E3E62] shadow-md rounded-lg p-6 w-full h-full flex items-center justify-center transform transition ${
      selectedCard === cardName
        ? 'ring-4 ring-[#FF6500] hover:shadow-xl scale-105' // Highlighted effect
        : 'hover:shadow-lg hover:-translate-y-1'
    }`;

  return (
    <div className="flex flex-col h-full bg-[#0B192C]">
      {/* Navbar */}
      <nav className="flex justify-between items-center bg-[#1E3E62] text-[#FF6500] px-8 py-4 shadow-lg">
        <Link
          to="/home"
          onClick={() => setSelectedCard('')} // Reset selected card on home click
        >
          <h1 className="text-4xl font-bold font-mono">MINI CRM APP</h1>
        </Link>

        <button
          className="bg-[#FF6500] hover:bg-[#1E3E62] text-white px-4 py-2 rounded-lg shadow-md transition-transform duration-300 transform hover:scale-105 font-mono"
          onClick={handleLogout}
        >
          Logout
        </button>
      </nav>

      {/* Main Content */}
      <div className="flex-1 p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 justify-items-center">
          {/* Cards */}
          <Link
            to="/home/customers"
            className={cardClasses('customers')}
            onClick={() => setSelectedCard('customers')}
          >
            <h2 className="text-lg font-semibold text-[#FF6500] font-mono text-center">Create Customer</h2>
            <p className="text-sm text-white font-mono text-center">
              Add new customers and manage their details.
            </p>
          </Link>

          <Link
            to="/home/orders"
            className={cardClasses('orders')}
            onClick={() => setSelectedCard('orders')}
          >
            <h2 className="text-lg font-semibold text-[#FF6500] font-mono text-center">Create Order</h2>
            <p className="text-sm text-white font-mono text-center">
              Create and manage customer orders.
            </p>
          </Link>

          <Link
            to="/home/audience"
            className={cardClasses('audience')}
            onClick={() => setSelectedCard('audience')}
          >
            <h2 className="text-lg font-semibold text-[#FF6500] font-mono text-center">Create Audience</h2>
            <p className="text-sm text-white font-mono text-center">
              Segment and manage your audience groups.
            </p>
          </Link>

          <Link
            to="/home/campaigns"
            className={cardClasses('campaigns')}
            onClick={() => setSelectedCard('campaigns')}
          >
            <h2 className="text-lg font-semibold text-[#FF6500] font-mono text-center">Campaign List</h2>
            <p className="text-sm text-white font-mono text-center">
              View and manage your marketing campaigns.
            </p>
          </Link>
        </div>

        {/* Routes Content */}
        <div className="bg-[#1E3E62] shadow-lg rounded-lg p-6 mt-8 font-mono">
          <Routes>
            <Route path="/customers" element={<CustomerForm />} />
            <Route path="/orders" element={<OrderForm />} />
            <Route path="/audience" element={<AudienceForm />} />
            <Route path="/campaigns" element={<CampaignList />} />
            <Route path="/" element={<HomePage />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default Home;
