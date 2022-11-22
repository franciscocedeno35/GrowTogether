import logo from './logo.svg';
//import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';

var temp = "Francisco";
var temp2 = "Ali";
var temp3 = "Louis";

function App() {
  return (
    <div>
      <header>
        <Header />
        <Footer />
        {/*<img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload. {temp}
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>*/}
      </header>
    </div>
  );
}

export default App;
