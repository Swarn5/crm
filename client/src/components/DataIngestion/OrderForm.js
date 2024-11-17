import React, { useState } from 'react';
import { createOrder } from '../../services/api';
import './OrderForm.css';

const OrderForm = () => {
  const [customerId, setCustomerId] = useState('');
  const [amount, setAmount] = useState('');
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};

    if (!customerId.trim()) {
      newErrors.customerId = 'Customer ID is required';
    }

    if (!amount.trim()) {
      newErrors.amount = 'Amount is required';
    } else if (isNaN(amount) || parseFloat(amount) <= 0) {
      newErrors.amount = 'Amount must be a positive number';
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
      await createOrder({ customerId: customerId, amount: parseFloat(amount) });
      alert('Order created successfully');
      setCustomerId('');
      setAmount('');
      setErrors({});
    } catch (err) {
      alert('Error creating order');
      console.error(err);
    }
  };

  return (
    <div className="centered-container">
        <h2 className="heading ">
        <div className='text-[#FF6500] font-bold text-4xl'>Create Order</div></h2>
      <form onSubmit={handleSubmit} className="order-form">

        <div className="form-group">
          <input
            type="text"
            placeholder="Customer ID"
            value={customerId}
            onChange={(e) => setCustomerId(e.target.value)}
            required
            className="input-field"
          />
          {errors.customerId && <div className="error">{errors.customerId}</div>}
        </div>

        <div className="form-group">
          <input
            type="number"
            placeholder="Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
            className="input-field"
          />
          {errors.amount && <div className="error">{errors.amount}</div>}
        </div>

        <button type="submit" className="submit-button" disabled={Object.keys(errors).length > 0}>Create Order</button>
      </form>
    </div>
  );
};

export default OrderForm;
