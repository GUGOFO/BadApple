import Styles from "./style.module.css";

function SliderTamanho({ tamanho, onChange }) {
  return (
    <div className={Styles.sliderContainer}>
      <label htmlFor="slider-tamanho">
        Tamanho / Espaçamento: <strong>{tamanho}px</strong>
      </label>
      <input
        id="slider-tamanho"
        type="range"
        min="6"
        max="28"
        step="1"
        value={tamanho}
        onChange={(e) => onChange(Number(e.target.value))}
      />
    </div>
  );
}

export default SliderTamanho;