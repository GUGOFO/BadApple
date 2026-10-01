import Styles from "./style.module.css";

function SliderTamanho({ tamanho, onChange }) {
  const min = 6;
  const max = 28;
  
  const porcentagem = ((tamanho - min) / (max - min)) * 100;

  return (
    <div className={Styles.sliderContainer}>
      <label htmlFor="slider-tamanho">
        Tamanho / Espaçamento: <strong>{tamanho}px</strong>
      </label>
      <input
        id="slider-tamanho"
        type="range"
        min={min}
        max={max}
        step="1"
        value={tamanho}
        onChange={(e) => onChange(Number(e.target.value))}
        style={{ "--porcentagem": `${porcentagem}%` }}
      />
    </div>
  );
}

export default SliderTamanho;