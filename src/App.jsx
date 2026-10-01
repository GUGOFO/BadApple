import { useState } from 'react';
import './App.css';
import MeuCanvas from './BadAppleLetras/index';
import BotaoAudio from './BotaoAudio/index';
import SliderTamanho from './SliderTamanho/index';

function App() {
  const [comAudio, setComAudio] = useState(false);
  const [tamanho, setTamanho] = useState(12);

  const alternarAudio = () => {
    setComAudio((prev) => !prev);
  };

  return (
    <div className="app-container">
      <MeuCanvas comAudio={comAudio} tamanho={tamanho} />

      <div className="controles-container">
        <BotaoAudio comAudio={comAudio} onToggle={alternarAudio} />
        <SliderTamanho tamanho={tamanho} onChange={setTamanho} />
      </div>
    </div>
  );
}

export default App;