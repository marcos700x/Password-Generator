import './style.scss';
import { useState, useEffect } from 'react';
import { ImCross } from 'react-icons/im';
import { ImCheckmark } from 'react-icons/im';
import { FcLock } from 'react-icons/fc'
import { HiClipboard } from 'react-icons/hi';

function App() {

  const [valueInput, setValueInput] = useState(4);
  const [password, setPassword] = useState("")
  const [symbolState, setSymbolState] = useState(true);
  const [numberState, setNumberState] = useState(true);
  const [capsState, setCapsState] = useState(true);
  const [copyState, setCopyState] = useState(false)
  const increase = () =>{
    if(valueInput < 16){
      setValueInput(valueInput + 1)
    }else{
      return
    }
  }
  const decrease = () =>{
    if(valueInput > 4){
      setValueInput(valueInput - 1)
    }else{
      return
    }
  }


  const generateRandomString = (maxLength) =>{
    const characters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890!@#$%^&*()";
    var extractedCharacters = ''
    //Ninguno
    if(!symbolState && !numberState && !capsState){
      var extractedCharacters = characters.substring(0, 26);
    }
    //Mayusculas
    else if(!symbolState && !numberState && capsState){
       extractedCharacters = characters.substring(0,52);
      }
      //Mayusculas y Numeros
    else if(!symbolState && numberState && capsState){
       extractedCharacters = characters.substring(0, 62)
    }
    //Mayusculas y Simbolos
    else if(symbolState && !numberState && capsState){
      extractedCharacters = characters.substring(0,52) + characters.substring(62,72);
    }
    //Mayusculas, Numeros y Simbolos
    else if(symbolState && numberState && capsState){
      extractedCharacters = characters;
    }
    //Numeros
    else if (!symbolState && numberState && !capsState){
      extractedCharacters = characters.substring(0,26) + characters.substring(52,62);
    }
    //Numeros y Simbolos
    else if(symbolState && numberState && !capsState){
      extractedCharacters = characters.substring(0,26) + characters.substring(52, 72);
    }
    //Simbolos
    else if(symbolState && !numberState && !capsState){
      extractedCharacters = characters.substring(0,26) + characters.substring(62,72);
    }

    var stringLength =  extractedCharacters.length;
    let result = ' ';
    for (let i = 0; i < maxLength; i++) {
      result += extractedCharacters.charAt(Math.floor(Math.random() * stringLength))
    }
    setPassword(result)
  }

  const copyToClipBoard = () => {
    navigator.clipboard.writeText(password)
    setCopyState(!copyState);

 
}
if(copyState){
  setTimeout(() => {
    setCopyState(!copyState)
  }, 2000);
}
  useEffect(()=>{
    generateRandomString(valueInput)
  },[symbolState, numberState,capsState,valueInput])





  return (
    <div className="App">
      <h1>Generador de Contraseñas</h1>
      <div className="container">
      <div className="row">
        <label htmlFor="">Numero de caracteres:</label>
        <div className="inputContainer">
          <button onClick={decrease}>-</button>
          <input type="text"  disabled value={valueInput} />
          <button onClick={increase}>+</button>
        </div>

      </div>
      <div className="row">
        <label htmlFor="">¿Agregamos simbolos?</label>
        <button onClick={() => setSymbolState(!symbolState)}>{symbolState ? <ImCheckmark/>: <ImCross/> }</button>
      </div>
      <div className="row">
        <label htmlFor="">¿Agregamos numeros?</label>
        <button onClick={() => setNumberState(!numberState)}>{numberState ? <ImCheckmark/> : <ImCross/> }</button>
      </div>
      <div className="row">
        <label htmlFor="">¿Agregamos mayúsculas?</label>
        <button onClick={() => setCapsState(!capsState)}>{capsState ? <ImCheckmark/> : <ImCross/> }</button>
      </div>
      <div className="row">
        <button className='generateBtn' onClick={() => generateRandomString(valueInput)}>Generar<FcLock/></button>
      </div>
      <div className="lastRow">
        <input className='inputDisabled' id='inputPassword' type="text" disabled value={password}/>
        <button onClick={copyToClipBoard} title='Copy to clipboard' className='copyPassword'>{copyState ? <ImCheckmark size='1.5em' color='#0f0'/> : <HiClipboard size='1.5em'  color='#09f'/>}</button>
      </div>
      <div className="copyInfo">
        {copyState ? <p className='copyText'>¡Copiado al portapapeles!</p> : null}
      </div>
      </div>
    </div>
  );
}

export default App;
