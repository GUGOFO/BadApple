import { useState } from 'react';
import './App.css';
import MeuCanvas from './BadAppleLetras/index';
import BotaoAudio from './BotaoAudio/index';

function App() {
  const [comAudio, setComAudio] = useState(false);

  const alternarAudio = () => {
    setComAudio((prev) => !prev);
  };

  return (
    <div className="app-container">
      <MeuCanvas comAudio={comAudio} />
      <BotaoAudio comAudio={comAudio} onToggle={alternarAudio} />
    </div>
  );
}

export default App;