import './style.css';

function inputtext(props) {
    const getValue = (event) => {
        const value = event.target.value
        props.onChangeHandler(value)
    }

    
    return (
        <div className = "input-text">
            <input className="tentacles-text" type= {props.type} placeholder={props.placeholder} onChange={getValue}></input>
            <div className = "inputs_Error">
                { props.hasError && (
                    <p>The entered {props.type} is not correct</p>
                )}
            </div>  
        </div>
    )
}

export default inputtext;