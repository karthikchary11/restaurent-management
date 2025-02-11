import { Fragment, useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';

function App() {
  const [totalCapacity, setTotalCapacity] = useState(50);
  const [seatsLeft, setSeatsLeft] = useState(50);
  const [guestCount, setGuestCount] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [customers, setCustomers] = useState([]);

  const handleGuestCountChange = (event) => {
    setGuestCount(event.target.value);
  };

  const handleNameChange = (event) => {
    setCustomerName(event.target.value);
  };

  const handlePhoneChange = (event) => {
    setPhoneNumber(event.target.value);
  };

  const addCustomer = () => {
    if (guestCount > 0 && customerName && phoneNumber) {
      if (parseInt(guestCount) > seatsLeft) {
        alert('Error: Guest count exceeds the available seats.');
        return;
      }

      const newCustomer = {
        guestCount: parseInt(guestCount),
        name: customerName,
        phone: phoneNumber,
        checkedIn: false, // Initially not checked in
      };
      setCustomers([...customers, newCustomer]);
      setSeatsLeft(seatsLeft - parseInt(guestCount));
      setGuestCount('');
      setCustomerName('');
      setPhoneNumber('');
    }
  };

  const checkOutCustomer = (index) => {
    const updatedCustomers = [...customers];
    const customer = updatedCustomers[index];
    setSeatsLeft(seatsLeft + customer.guestCount);
    updatedCustomers.splice(index, 1);
    setCustomers(updatedCustomers);
  };

  const deleteCustomer = (index) => {
    const updatedCustomers = [...customers];
    const customer = updatedCustomers[index];
    setSeatsLeft(seatsLeft + customer.guestCount);
    updatedCustomers.splice(index, 1);
    setCustomers(updatedCustomers);
  };

  return (
    <div className="container">
      <h1>Restaurant Customer Management</h1>

      <div className="info-section">
        <div>
          <h3>Total Capacity:</h3>
          <p>{totalCapacity}</p>
        </div>
        <div>
          <h3>Seats Left:</h3>
          <p>{seatsLeft}</p>
        </div>
      </div>

      <div className="customer-form">
        <div>
          <label htmlFor="guestCount">Guest Count:</label>
          <input
            type="number"
            id="guestCount"
            value={guestCount}
            onChange={handleGuestCountChange}
          />
        </div>
        <div>
          <label htmlFor="customerName">Customer Name:</label>
          <input
            type="text"
            id="customerName"
            value={customerName}
            onChange={handleNameChange}
          />
        </div>
        <div>
          <label htmlFor="phoneNumber">Phone Number:</label>
          <input
            type="text"
            id="phoneNumber"
            value={phoneNumber}
            onChange={handlePhoneChange}
          />
        </div>
        <div className="button-container">

        <button ClassName="button:hover" onClick={addCustomer}>Add Customer</button></div>

      </div>

      <div className="customer-list">
        <h2>Current Customers</h2>
        <table className='table'>
          <thead>
            <tr>
              <th>Name</th>
              <th>Guest Count</th>
              <th>Phone Number</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((customer, index) => (
              <tr key={index}>
                <td>{customer.name}</td>
                <td>{customer.guestCount}</td>
                <td>{customer.phone}</td>
                <td>
                  <button onClick={() => checkOutCustomer(index)}>Check Out</button>
                  <button onClick={() => deleteCustomer(index)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
