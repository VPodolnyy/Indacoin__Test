import './style.css';

function MainContainer(props) {
    return (
      <div className = "main container">
          
            {props.children}
      </div>
    )
  }

export default MainContainer;
