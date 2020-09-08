import React, { useState } from 'react';
import useKeyPress from './hooks/useKeyPress';
import { generate } from './utils/Words';
import { currentTime } from './utils/Time';
import './styles.css';


function App() {
  const initialWords = generate();

  const [leftPadding, setLeftPadding] = useState(
    new Array(50).fill(' ').join(''),
  );
  const [outgoingChars, setOutgoingChars] = useState('');
  const [currentChar, setCurrentChar] = useState(initialWords.charAt(0));
  const [incomingChars, setIncomingChars] = useState(initialWords.substr(1));

  const [startTime, setStartTime] = useState();
  const [wordCount, setWordCount] = useState(0);
  const [wpm, setWpm] = useState(0);

  const [accuracy, setAccuracy] = useState(0);
  const [typedChars, setTypedChars] = useState('');


  //reset state
 const clearState = () => {
  setLeftPadding(new Array(50).fill(' ').join(''),)
  setOutgoingChars('')
  setCurrentChar(initialWords.charAt(0))
  setIncomingChars(initialWords.substr(1))
  setStartTime()
  setWordCount(0)
  setWpm(0)
  setAccuracy(0)
  setTypedChars('')

 }

  useKeyPress(key => {
    if (!startTime) {
      setStartTime(currentTime());
    }

    let updatedOutgoingChars = outgoingChars;
    let updatedIncomingChars = incomingChars;
    if (key === currentChar) {
      if (leftPadding.length > 0) {
        setLeftPadding(leftPadding.substring(1));
      }
      updatedOutgoingChars += currentChar;
      setOutgoingChars(updatedOutgoingChars);

      setCurrentChar(incomingChars.charAt(0));

      updatedIncomingChars = incomingChars.substring(1);
      if (updatedIncomingChars.split(' ').length < 10) {
        updatedIncomingChars += ' ' + generate();
      }
      setIncomingChars(updatedIncomingChars);

      if (incomingChars.charAt(0) === ' ') {
        setWordCount(wordCount + 1);
        const durationInMinutes = (currentTime() - startTime) / 60000.0;
        setWpm(((wordCount + 1) / durationInMinutes).toFixed(2));
      }
    }

    const updatedTypedChars = typedChars + key;
    setTypedChars(updatedTypedChars);
    setAccuracy(
      ((updatedOutgoingChars.length * 100) / updatedTypedChars.length).toFixed(
        2,
      ),
    );
  });

  return (
    
    <div className="App">
       <h1>proto-type</h1>
      <header className="App-header">
       
        <p className="Character">
          <span className="Character-out">
            {(leftPadding + outgoingChars).slice(-20)}
          </span>
          <span className="Character-current">{currentChar}</span>
          <span>{incomingChars.substr(0, 90)}</span>
        </p>
        <h3 className='stats'>
          wpm: {wpm} | acc: {accuracy}%
          
        </h3>
        
        <span className='svg'>
    <svg onClick={clearState} className='refresh'xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
</svg>
        
        </span>
      </header>
      <footer>Made by Tom Vo</footer>
    </div>
   

  );
}

export default App;