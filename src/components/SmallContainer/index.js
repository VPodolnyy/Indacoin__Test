import './style.css';

function SmallContainer(props) {
    return (
      <div className = "small_main container" className = {props.className}>
          <div className = "small_main_chield">
            {props.children}
          </div>
      </div>
    )
  }

export default SmallContainer;
