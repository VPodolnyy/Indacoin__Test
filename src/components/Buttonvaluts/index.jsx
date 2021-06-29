import { useState } from 'react';
import { Popover } from 'react-tiny-popover';
import './style.css';

function Buttonvaluts(props) {
  // currency, list, onClickHandler
  const [popoverOpen, setPopoverOpen] = useState(false);
  const currencyLabel = props.сurrency.name
  const currencyImage = props.сurrency.imgUrl
  const handleClick = (item) => {
    setPopoverOpen(false)
    props.onClickHandler(item)
  }
  return (
    <div className="Wrapper_Buttonvaluts">
           <Popover
              isOpen={popoverOpen}
              positions={['bottom']}
              onClickOutside = { ( )  =>  setPopoverOpen ( false ) }
              content={
                props.list.map((item, i) => (
                  <div className="currency" key={i} onClick={() => { handleClick(item) }}>
                    <img className = 'currency_img' src={`${item.imgUrl}`}></img>
                    <p className = 'currency_text'>{item.name}</p>
                  </div>
                ))
              }
              >
              <div className = "popover" onClick={() => setPopoverOpen(!popoverOpen)}>
              <img className = 'currency_img' src={`${currencyImage}`}></img>
              <p className = 'currency_text'>{currencyLabel}</p>
              </div>
            </Popover>
     </div>
  )
}
export default Buttonvaluts;