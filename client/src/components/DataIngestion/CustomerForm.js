import React, { useState } from 'react';
import { createCustomer } from '../../services/api';
import './CustomerForm.css';

const CustomerForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};

    if (!name.trim()) {
      newErrors.name = 'Name is required';
    }

    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!emailPattern.test(email)) {
      newErrors.email = 'Email is invalid';
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      await createCustomer({ name, email });
      alert('Customer created successfully');
      setName('');
      setEmail('');
      setErrors({});
    } catch (err) {
      alert('Error creating customer');
      console.error(err);
    }
  };

  return (
    <div className="centered-container">
      <h1 className="heading text-[#FF6500]">
        <div className='text-[#FF6500] font-bold text-4xl'>Create Customer</div></h1>
      <form onSubmit={handleSubmit} className="customer-form bg-[#1E3E62] p-6 rounded-lg shadow-lg">
        <div className="form-group mb-4">
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="input-field w-full p-4 rounded-lg text-black"
          />
          {errors.name && <div className="error text-red-500 mt-2">{errors.name}</div>}
        </div>

        <div className="form-group mb-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="input-field w-full p-4 rounded-lg text-black"
          />
          {errors.email && <div className="error text-red-500 mt-2">{errors.email}</div>}
        </div>

        <button
          type="submit"
          className="submit-button w-full py-3 text-white bg-[#FF6500] hover:bg-[#FF8C33] rounded-lg shadow-md"
        >
          Create Customer
        </button>
      </form>
    </div>
  );
};

export default CustomerForm;
