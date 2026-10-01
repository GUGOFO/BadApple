import Styles from "./style.module.css";

function BotaoAudio({ comAudio, onToggle }) {
  return (
    <button
      onClick={onToggle}
      className={`${Styles.botaoAudio} ${comAudio ? Styles.ativo : ""}`}
    >
      {comAudio ? "Mudar para Mudo" : "Escutar Áudio"}
    </button>
  );
}

export default BotaoAudio;