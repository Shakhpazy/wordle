import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'


function App() {
  
  const keyboard = [
    ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
    ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
    ['Enter','z', 'x', 'c', 'v', 'b', 'n', 'm', 'Backspace'],
  ];

  return (
    <>
      <div className="wrapper">
      <div className='row'>
        <div className='box green'></div>
        <div className='box yellow'></div>
        <div className='box grey'></div>
        <div className='box'></div>
        <div className='box'></div>
      </div>
      <div className='row'>
        <div className='box'></div>
        <div className='box'></div>
        <div className='box'></div>
        <div className='box'></div>
        <div className='box'></div>
      </div>
      <div className='row'>
        <div className='box'></div>
        <div className='box'></div>
        <div className='box'></div>
        <div className='box'></div>
        <div className='box'></div>
      </div>
      <div className='row'>
        <div className='box'></div>
        <div className='box'></div>
        <div className='box'></div>
        <div className='box'></div>
        <div className='box'></div>
      </div>
      <div className='row'>
        <div className='box'></div>
        <div className='box'></div>
        <div className='box'></div>
        <div className='box'></div>
        <div className='box'></div>
      </div>
      <div className='row'>
        <div className='box'></div>
        <div className='box'></div>
        <div className='box'></div>
        <div className='box'></div>
        <div className='box'></div>
      </div>
      </div>

      <div className='keyboard'>
        {keyboard.map((row, rowIndex) => (
          <div className='row' key={rowIndex}>
            {row.map((key, keyIndex) => (
              <div className='key' key={keyIndex}>
                {key === 'Enter' ? (
                  <div className='key-enter'>Enter</div>
                ) : key === 'Backspace' ? (
                  <div className='key-backspace'>Delete</div>
                ) : (
                  <div className='key-letter'>{key}</div>
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
    </>
  )
}

export default App
