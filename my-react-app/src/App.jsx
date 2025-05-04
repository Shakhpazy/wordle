import { useState, useEffect, use } from 'react'
import './App.css'


function App() {

  const defaultKeyboardState = [
    [{ q: undefined }, { w: undefined }, { e: undefined }, { r: undefined }, { t: undefined }, { y: undefined }, { u: undefined }, { i: undefined }, { o: undefined }, { p: undefined }],
    [{ a: undefined }, { s: undefined }, { d: undefined }, { f: undefined }, { g: undefined }, { h: undefined }, { j: undefined }, { k: undefined }, { l: undefined }],
    [{ Enter: undefined }, { z: undefined }, { x: undefined }, { c: undefined }, { v: undefined }, { b: undefined }, { n: undefined }, { m: undefined }, { Backspace: undefined }]
  ]

  const [word, setWord] = useState('plays')
  const [guess, setGuess] = useState('')
  const [guesses, setGuesses] = useState([])
  const [attempts, setAttempts] = useState(0)
  const [gameState, setGameState] = useState(true)
  const [keyboardState, setKeyboardState] = useState([
    [{ q: undefined }, { w: undefined }, { e: undefined }, { r: undefined }, { t: undefined }, { y: undefined }, { u: undefined }, { i: undefined }, { o: undefined }, { p: undefined }],
    [{ a: undefined }, { s: undefined }, { d: undefined }, { f: undefined }, { g: undefined }, { h: undefined }, { j: undefined }, { k: undefined }, { l: undefined }],
    [{ Enter: undefined }, { z: undefined }, { x: undefined }, { c: undefined }, { v: undefined }, { b: undefined }, { n: undefined }, { m: undefined }, { Backspace: undefined }]
  ]);

  useEffect(() => {
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
    key = key.toLowerCase()
    if (gameState === false) {
      setKeyboardState(defaultKeyboardState)
      setGameState(true)
      setGuesses([])
    }
    else if (key === 'enter') {
      if (guess.length < 5) return
      if (guess.length === 5) {
        setGuesses((prevGuesses) => [...prevGuesses, guess]);
        setAttempts(attempts => attempts + 1)
        for (const char of guess) {
          setKeyboardState((prevState) => {
            const newState = prevState.map(row =>
              row.map((keyObj) => {
                const keyName = Object.keys(keyObj)[0];
                const keyStatus = keyObj[keyName];
        
                if (keyName === char) {
                  if (word.includes(char)) {
                    if (word.indexOf(char) === guess.indexOf(char)) {
                      return { [keyName]: 'green' };
                    } 
                    return { [keyName]: 'yellow' };
                  } 

                  return { [keyName]: 'grey' };
                }
                return keyObj; // unchanged
              })
            );
            return newState;
          });
        }
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
  
  

  return (
    <>
      <div className="wrapper">

        <div>
          {gameState ? <h1>Wordle</h1> : <h1>Press any key to Play again</h1>}
        </div>

        <RowGenerator />

        <div className='keyboard'>
          {keyboardState.map((row, rowIndex) => (
            <div className='row' key={rowIndex}>
              {row.map((keyObj, keyIndex) => {
                const keyName = Object.keys(keyObj)[0];
                const keyStatus = keyObj[keyName];

                return (
                  <button
                    className={`key ${keyStatus}`}
                    key={keyIndex}
                    type='button'
                    id={keyName}
                    onClick={() => keypressabstract(keyName.toLowerCase())}
                  >
                    {keyName === 'Enter' ? (
                      <div className={'key-enter'}>Enter</div>
                    ) : keyName === 'Backspace' ? (
                      <div className='key-backspace'>Delete</div>
                    ) : (
                      <div className={`key-letter`}>{keyName}</div>
                    )}
                  </button>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default App
