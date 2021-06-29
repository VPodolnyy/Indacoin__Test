import './style.css';



function TopHeader(props) {
  return (
    <header className="App-header flex-row-center">
        <div className="App-header-container flex-col-center">
          <img src="https://bitcoins.mn/img/logo.084dcf63.svg" width="70"></img>
          <h1 className="header__TopText">Buy <span className="logo">Cryptocurrencies</span> with Credit or Debit Card</h1>
          <h3 className="header__BottomText">
            <a href="https://indacoin.com" target="_blank"> POWERED BY </a>
            <img src = 'https://bitcoins.mn/img/indacoin.6ff92336.svg' href = "https://indacoin.com/"></img>
          </h3>
        </div>
    </header>
  )
}

export default TopHeader;