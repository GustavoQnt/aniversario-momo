import { useCallback } from "react";
import "./CardOverlay.css";

type CardOverlayProps = {
  isVisible: boolean;
  onClose: () => void;
};

export function CardOverlay({ isVisible, onClose }: CardOverlayProps) {
  const handleBackdropClick = useCallback(
    (event: React.MouseEvent) => {
      if (event.target === event.currentTarget) {
        onClose();
      }
    },
    [onClose]
  );

  if (!isVisible) {
    return null;
  }

  return (
    <div className="card-overlay-backdrop" onClick={handleBackdropClick}>
      <div className="card-overlay">
        <button className="card-close-btn" onClick={onClose} aria-label="Fechar">
          ✕
        </button>

        <div className="card-decoration top-left">🎀</div>
        <div className="card-decoration top-right">✨</div>
        <div className="card-decoration bottom-left">🌸</div>
        <div className="card-decoration bottom-right">💕</div>

        <div className="card-content">
          <h2 className="card-greeting">Meu grande amor,</h2>

          <p className="card-paragraph">
            Hoje escrevo com o coração em festa, porque o mundo celebra o dia em que foi presenteado com a tua existência. Há datas que passam, e há datas que iluminam tudo ao redor — e o teu nascimento é uma delas.
          </p>

          <p className="card-paragraph">
            Penso em como a vida, antes de ti, seguia um compasso quase monótono, uma estagnação da qual eu nem sabia que precisava fugir, até encontrar no teu sorriso aquela forma mais agradável de existir. Cada ano que te trouxe até aqui moldou a mulher que tu é, e sou imensamente grato por poder testemunhar isso de perto.
          </p>

          <p className="card-paragraph">
            Tu é luz, calmaria e verdade. Tem o dom raro de tornar o simples mais bonito e de transformar dias comuns em algo digno de ser guardado na memória. Que este novo ciclo venha repleto de sorrisos sinceros, sonhos realizados e da serenidade que o teu coração merece.
          </p>

          <p className="card-paragraph">
            Que a vida te devolva em dobro tudo aquilo que espalhas pelo mundo: carinho, beleza e amor.
          </p>

          <p className="card-paragraph highlight">
            Feliz aniversário, minha querida.
          </p>

          <div className="card-signature">
            <p>Com todo o amor que me habita,</p>
            <p className="signature-kiss">beijo-te a alma.</p>
            <p className="signature-love">TE AMO, FOFUXA 💖</p>
          </div>
        </div>

        <div className="card-hearts">
          <span>♡</span>
          <span>♡</span>
          <span>♡</span>
        </div>
      </div>
    </div>
  );
}
