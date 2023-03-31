import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [guesses, setGuesses] = useState([]);
  const [name, setName] = useState('');
  const [dobGuess, setDobGuess] = useState('');
  const [weightGuess, setWeightGuess] = useState('');
  const [lengthGuess, setLengthGuess] = useState('');

  useEffect(() => {
    fetch('http://localhost:5000/api/guesses', {
      method: 'GET',
      headers: {
        'Access-Control-Allow-Origin': '*'
      }
    })
      .then(response => response.json())
      .then(data => {
        setGuesses(data)
        console.log(data)
      });
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    // const dobdate = dobGuess.split()
    // const month = dobdate[1]
    // const day = dobdate[2]
    const newGuess = {
      name: name,
      dob: dobGuess,
      weight: weightGuess,
      length: lengthGuess
    };
    fetch('http://localhost:5000/api/guesses', {
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

      <form onSubmit={handleSubmit}>
        <label>
          Your Name:
          <input type="text" value={name} onChange={(event) => setName(event.target.value)} />
        </label>
        <br />
        <label>
          Birth Date:
          <input type="date" value={dobGuess} onChange={(event) => setDobGuess(event.target.value)} />
        </label>
        <br />
        <label>
          Weight (kg):
          <input type="number" value={weightGuess} onChange={(event) => setWeightGuess(event.target.value)} />
        </label>
        <br />
        <label>
          Length (cm):
          <input type="number" value={lengthGuess} onChange={(event) => setLengthGuess(event.target.value)} />
        </label>
        <br />
        <div class="buttons">
          <button class="button-67" onClick={handleShowGuesses}>Show Guesses</button>
          <button class="button-67" type="submit">Submit Guess</button>
        </div>
      </form>
      <hr />
      <div id="container" class="hidden">
        <div id="guesses">
          <h2>Guesses:</h2>
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
          <table class="styled-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Birth Date</th>
                <th>Weight</th>
                <th>Length</th>
              </tr>
            </thead>
            <tbody>
              {guesses.map((guess, index) => (
                <tr key={index}>
                  <td>{guess.name}</td>
                  <td>{guess.dob}</td>
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
