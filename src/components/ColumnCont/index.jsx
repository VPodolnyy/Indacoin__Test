import './style.css';

function ColumnCont(props) {
    return (
      <div className = "column-cont" className = {props.className}>          
            {props.children}
      </div>
    )
  }

export default ColumnCont;
