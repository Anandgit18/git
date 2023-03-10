import React, { useEffect, useState } from 'react';
import moment from 'moment';
import './search-form.css'

function SearchForm() {
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [date, setDate] = useState(new Date());
  const [buses, setBuses] = useState([]);
  const [filteredBuses, setFilteredBuses] = useState([]);

  useEffect(() => {
    async function fetchBuses() {
      const response = await fetch('https://mockapi.io/projects/636499fa8a3337d9a2fa509c');
      const json = await response.json();
      setBuses(json);
    }
    fetchBuses();
  }, []);

  useEffect(() => {
    setFilteredBuses(buses.filter(bus => bus.from.toLowerCase().includes(from.toLowerCase()) && bus.to.toLowerCase().includes(to.toLowerCase())));
  }, [from, to, buses]);

  const handleChange = (e) => {
    if (e.target.name === 'from') {
      setFrom(e.target.value);
    } else if (e.target.name === 'to') {
      setTo(e.target.value);
    } else if (e.target.name === 'date') {
      setDate(e.target.value);
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    // send a request to the API with the form data
    console.log(`From: ${from} To: ${to} Date: ${moment(date).format('MM-DD-YYYY')}`);
  }

  return (
    // <div className='search'>
    <form onSubmit={handleSubmit} className='search'>
      <label>
        From:
        <input type="text" name='from' value={from} onChange={handleChange} />
      </label>
      <br/><br />
      <label>
        To:
        <input type="text" name='to' value={to} onChange={handleChange} />
      </label>
      <br/><br/>
      <label>
        Date:
        <input type="date" name='date' value={moment(date).format('YYYY-MM-DD')} onChange={handleChange} />
      </label>
      <br />
      <ul>
        {filteredBuses.map((bus, index) => (
          <li key={index}>{bus.name}</li>
        ))}
      </ul>
      <br/><br/>
      <button type="submit">Search</button>
    </form>
    // </div>
  );
}
export default SearchForm;