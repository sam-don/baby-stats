import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [guesses, setGuesses] = useState([]);
  const [name, setName] = useState('');
  const [dobGuess, setDobGuess] = useState('');
  const [timeGuess, setTimeGuess] = useState('');
  const [weightGuess, setWeightGuess] = useState('');
  const [lengthGuess, setLengthGuess] = useState('');

  useEffect(() => {
    fetch('/api/guesses', {
      method: 'GET',
      headers: {
        'Access-Control-Allow-Origin': '*'
      }
    })
      .then(response => response.json())
      .then(data => { setGuesses(data) });
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    // const dobdate = dobGuess.split()
    // const month = dobdate[1]
    // const day = dobdate[2]
    const newGuess = {
      name: name,
      dob: dobGuess,
      time: timeGuess,
      weight: weightGuess,
      length: lengthGuess
    };
    fetch('/api/guesses', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify(newGuess)
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setGuesses([...guesses, data]);
        setName('');
        setDobGuess('');
        setTimeGuess('');
        setWeightGuess('');
        setLengthGuess('');
      })
      .catch(error => console.error(error));
    showGuesses();
  };

  const handleShowGuesses = (event) => {
    event.preventDefault();
    var container = document.getElementById("container");
    container.classList.toggle("hidden");
  }

  const showGuesses = () => {
    var container = document.getElementById("container");
    container.classList.remove("hidden");
  }

  return (
    <div className="App">
      <div id='header'>
        <img id='titleimg' src='./donny-large.png' alt='A cartoon of a thinking baby'></img>
        <div id='title'>
          <h1>DONNY'S STATS</h1>
          <h2>Guessing Game!</h2>
        </div>
      </div>

      <form id="guess-form" onSubmit={handleSubmit}>
        <label>
          Your Name:
          <input type="text" value={name} onChange={(event) => setName(event.target.value)} required />
        </label>
        <br />
        <label>
          Birth Date:
          <input 
            type="date" 
            min="2023-05-01"
            max="2023-06-30"
            value={dobGuess} 
            onChange={(event) => setDobGuess(event.target.value)} 
            required />
        </label>
        <br />
        <label>
          Birth Time:
          <input 
            type="time"
            value={timeGuess} 
            onChange={(event) => setTimeGuess(event.target.value)} 
            required />
        </label>
        <br />
        <label>
          Weight (kg):
          <input type="number" value={weightGuess} onChange={(event) => setWeightGuess(event.target.value)} required />
        </label>
        <br />
        <label>
          Length (cm):
          <input type="number" value={lengthGuess} onChange={(event) => setLengthGuess(event.target.value)} required />
        </label>
        <br />
        <div className="buttons">
          <button className="button-67" onClick={handleShowGuesses}>Show Guesses</button>
          <button className="button-67" type="submit">Submit Guess</button>
        </div>
      </form>
      <hr />
      <div id="container" className="hidden">
        <div id="guesses">
          {/* <h2>Guesses:</h2> */}
          {/* <ul>
            {guesses.map((guess, index) => (
              <li key={index}>
                <strong>{guess.name}: </strong>
                <span>Birth Date Guess: {guess.dob}, </span>
                <span>Weight Guess: {guess.weight} lbs, </span>
                <span>Length Guess: {guess.length} inches</span>
              </li>
            ))}
          </ul> */}
          <table className="styled-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Birth Date</th>
                <th>Birth Time</th>
                <th>Weight</th>
                <th>Length</th>
              </tr>
            </thead>
            <tbody>
              {guesses.map((guess, index) => (
                <tr key={index}>
                  <td>{guess.name}</td>
                  <td>{guess.dob}</td>
                  <td>{guess.time}</td>
                  <td>{guess.weight}</td>
                  <td>{guess.length}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default App;
