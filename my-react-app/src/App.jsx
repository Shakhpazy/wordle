import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'


function App() {

  const [word, setWord] = useState('plays')
  const [guess, setGuess] = useState('')
  const [guesses, setGuesses] = useState([])
  const [attempts, setAttempts] = useState(0)
  const [gameState, setGameState] = useState(true)

  useEffect(() => {
    console.log(guesses.length)
    if (guesses.length >= 6) {
      setGuess("")
      setGameState(false)
      setAttempts(0)
    }
  }, [guesses])

  useEffect(() => {
    const handleKeyPress = (event) => {
      const key = event.key.toLowerCase()
      keypressabstract(key)
    }
    document.addEventListener('keydown', handleKeyPress)
    return () => {
      document.removeEventListener('keydown', handleKeyPress)
    }
  }, [guess, attempts, word, guesses])

  function keypressabstract(key) {
    if (gameState === false) {
      setGameState(true)
      setGuesses([])
    }
    else if (key === 'enter') {
      if (guess.length === 5) {
        setGuesses((prevGuesses) => [...prevGuesses, guess]);
        setAttempts(attempts + 1)
        setGuess('')
      }
    } else if (key === 'backspace') {
      setGuess(guess.slice(0, -1))
    } else if (/^[a-z]$/.test(key)) {
      if (guess.length < 5) {
        setGuess(guess + key)
      }
    }

  }

  function RowGenerator() {
    const rows = [];
  
    // 1. Add past guesses
    for (let i = 0; i < guesses.length; i++) {
      const boxes = [];
      for (let j = 0; j < 5; j++) {
        const letter = guesses[i][j] || '';
        if (word.includes(letter) && word[j] == letter) {
          boxes.push(
            <div className='box green' key={j}>
              {letter}
            </div>
          );
        } else if (word.includes(letter)) {
          boxes.push(
            <div className='box yellow' key={j}>
              {letter}
            </div>
          );
        } else {
          boxes.push(
            <div className='box' key={j}>
              {letter}
            </div>
          );
        }
      }
      rows.push(
        <div className='row' key={`guess-${i}`}>
          {boxes}
        </div>
      );
    }
  
    // 2. Add current guess (in progress)
    if (guesses.length < 6) {
      const boxes = [];
      for (let j = 0; j < 5; j++) {
        const letter = guess[j] || '';
        boxes.push(
          <div className='box' key={j}>
            {letter}
          </div>
        );
      }
      rows.push(
        <div className='row' key={`current`}>
          {boxes}
        </div>
      );
    }
  
    // 3. Add empty rows to fill up to 6
    for (let i = guesses.length + 1; i < 6; i++) {
      const boxes = [];
      for (let j = 0; j < 5; j++) {
        boxes.push(
          <div className='box' key={j}></div>
        );
      }
      rows.push(
        <div className='row' key={`empty-${i}`}>
          {boxes}
        </div>
      );
    }
  
    return rows;
  }
  
  


  const keyboard = [
    ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
    ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
    ['Enter','z', 'x', 'c', 'v', 'b', 'n', 'm', 'Backspace'],
  ];

  return (
    <>
      <div className="wrapper">

        <div>
          {gameState ? <h1>Wordle</h1> : <h1>Press any key to Play again</h1>}
        </div>

        <RowGenerator />

        <div className='keyboard'>
        {keyboard.map((row, rowIndex) => (
          <div className='row' key={rowIndex}>
            {row.map((key, keyIndex) => (
              <button className='key' key={keyIndex} type='button' id={key} onClick={() => keypressabstract(key.toLowerCase())}>
                {key === 'Enter' ? (
                  <div className='key-enter'>Enter</div>
                ) : key === 'Backspace' ? (
                  <div className='key-backspace'>Delete</div>
                ) : (
                  <div className='key-letter'>{key}</div>
                )}
              </button>
            ))}
          </div>
        ))}
      </div>
      </div>
    </>
  )
}

export default App
