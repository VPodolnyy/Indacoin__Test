import './style.css';


function inputtop(props) {
    const getValue = (event) => {
        const value = +event.target.value
        props.onChangeHandler(value)
    }
    return (
        <div className = "inputs">
            <input className="tentacles" value={props.value} onChange={getValue} disabled = {props.disabled} type= {props.type} ></input>
            { props.hasError && (
              <p>Ошибка!!!Сука</p>
            )}
            { props.children }
        </div>
    )
}

export default inputtop;