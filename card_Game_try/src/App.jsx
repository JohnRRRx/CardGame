import "./App.css"
import { useEffect, useReducer, useState} from "react"
import { Card } from "./components/Card"

const srcArray= [
  {src: "stand.png", matched: false },
  {src: "souryoumuryou.png", matched: false },
  {src: "urami.png", matched: false },
  {src: "warumono.png", matched: false },
  {src: "wolpertinger.png", matched: false },
  {src: "uroboros.png", matched: false },
]

function App() {
  const [cards,setCards] = useState([])
  const [firstChoice, setFirstChoice] = useState(null)
  const [secondChoice, setSecondChoice] = useState(null)
  const [disabled, setDisabled] = useState(false)

  const handleClick = (card) => {
    if (firstChoice){
      if(card === firstChoice) return;
      setSecondChoice(card);
    } else {
      setFirstChoice(card)
    }
  }

  const resetTurn = () => {
    setFirstChoice(null)
    setSecondChoice(null)
    setDisabled(false)
  }

  useEffect(()=>{
    if(firstChoice&&secondChoice){
      setDisabled(true)
      if(firstChoice.src===secondChoice.src){
        setCards(prevCards=>{
          return prevCards.map(card=>{
            if(card.src===firstChoice.src){
              return {...card,matched:true}
            }
            return card
          })
        })
        resetTurn()
      }else{
        setTimeout(() => {
          resetTurn()
        }, 1000)
      }

    }
  },[firstChoice, secondChoice])
  
  useEffect(()=>{
    console.log(cards)
  },[cards])

  const shuffleCards = () => {
    const shuffledCards = [...srcArray,...srcArray].sort(
      ()=>Math.random()-0.5
    ).map(card=>({...card, id: Math.random() }))

    setCards(shuffledCards)
    setFirstChoice(null)
    setSecondChoice(null)
  }

  useEffect(()=>{
    shuffleCards()
  }, [])

  return (
    <>
      <h1 className="heading">CardGame</h1>
      <div className="flex">
        <button className="restart"onClick={shuffleCards}>New Game</button>
      </div>
      <div className="container">
        {cards.map((card)=>(
        <Card 
          card={card}
          key={card.id}
          handleClick={handleClick}
          flipped={
            card.matched||card===firstChoice||card===secondChoice
        }
        disabled={disabled}
       />
      ))}
     </div>
    </>
  )
}

export default App

