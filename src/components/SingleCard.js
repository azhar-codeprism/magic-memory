import "./SingleCard.css";

function SingleCard({ id, card, handleFrontClick, flipped }) {
  return (
    <div className="card" key={id}>
      <div className={flipped ? "flipped" : ""}>
        <img className="front" src={card.src} alt="card front"></img>
        <img
          className="back"
          src={"/img/cover.png"}
          alt="card back"
          onClick={() => handleFrontClick(card)}
        ></img>
      </div>
    </div>
  );
}
export default SingleCard;
