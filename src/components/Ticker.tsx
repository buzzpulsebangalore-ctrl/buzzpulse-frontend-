import { tickWords } from '../data';

function TickerLine() {
  return (
    <>
      {tickWords.map((word) => (
        <span key={word}>
          {word} <i>&#9670;</i>
        </span>
      ))}
    </>
  );
}

export default function Ticker() {
  return (
    <div className="ticker">
      <div className="ticker-track">
        <TickerLine />
        <TickerLine />
      </div>
    </div>
  );
}
