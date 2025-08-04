import "./Card.css"

const Card = ({ card, handleClick, flipped, disabled})=>{
         const onClick = () => {
            if(!disabled){
                handleClick(card)
            }
         }
    return (
  <div
    className={`card ${flipped ? "flipped" : ""}`}
    onClick={onClick}
  >
    <img src="/CardGame/kao.png" alt="card back" width="200" className="rear"/>
    <img src={`/CardGame/${card.src}`} alt="card pic" width="200" className="front"/>
  </div>
)}

export {Card}