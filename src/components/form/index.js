import './style.css';

function cart(props) {
  return (
    <div className = "cards">
        <div className = "card">
            <h3>{props.card.name}</h3>
            <p>{props.card.text}</p>
        </div>
    </div>
  )
}

export default cart;
