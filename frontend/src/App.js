import logo from './logo.svg';
import './App.css';
import {useState} from 'react';
import { guess, startGame, restart } from './axios';

function App() {
  const [hasStarted, setHasStarted] = useState(false);
  const [hasWon, setHasWon] = useState(0);
  const [number, setNumber] = useState("");
  const [contextBox, setContextBox] = useState([]);

  const handleStart = async ()=>{
    try{
      let msg = await startGame();
      console.log(msg);
      setHasStarted(true);
    }catch(e){
      alert(e.name + ': ' + e.message);
    }
  }

  const handleInput = (value)=>{
    setNumber(value);
  }

  const handleGuess = async ()=>{
    try{
      let response = await guess(number);
      if(response.msg==="Equal"){
        setHasWon(1);
      }else if(response.msg==="Server won"){
        setNumber(response.target);
        setHasWon(2);
      }else{
        let tmpContextBox = [...contextBox]
        tmpContextBox.push(response.msg);
        setContextBox(tmpContextBox);  
        // setNumber(""); 
      }
    }catch(e){
      if(e.message==="Network Error"){
        alert(e.name + ': ' + e.message);
      }else{
        let tmpContextBox = [...contextBox]
        tmpContextBox.push(`${number} is not a legal number.\n`)
        setContextBox(tmpContextBox);
        setNumber("");
      }
    }
  }

  const hanhleRestart = async ()=>{
    try{
      let msg = await restart();
      console.log(msg);
      setHasWon(0);
      setNumber("");
      setContextBox([]);
    }catch(e){
      alert(e.name + ': ' + e.message);
    }
  }

  const displayRecord = ()=>{
    let context = "";
    let tmpContextBox = [...contextBox]
    tmpContextBox.forEach((e)=>{
      context+=e;
    });
    return context;
  }

  const startMenu =
    <div>
      <button onClick={handleStart}> start game </button>
    </div>

  const gameMode =
    <>
      <p>Guess 4 numbers ( non-repetitive, 0~9 ) in order</p>
      <p>For example 1234</p>
      <input value={number} onChange={(e)=>{handleInput(e.target.value)}}></input>
      <button onClick={handleGuess} disabled={!number}>
        guess!
      </button>
      <div>
        <textarea rows="30" cols="30" value={`${displayRecord()}`} disabled></textarea>
      </div>
    </>

  const winningMode = 
    <>
      <p>{`${hasWon===1?"You":"Server"} won! the number was ${number}.`}</p>
      <button onClick={hanhleRestart}> restart </button>
    </>

  const game = 
  <div>
    {hasWon?winningMode:gameMode}
  </div>

  return(
    <div className="App">
      {hasStarted?game:startMenu}
    </div>
  )
}

export default App;
