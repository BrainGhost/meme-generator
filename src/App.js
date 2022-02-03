import "./App.css";
import Body from "./Components/Body";
import Footer from "./Components/Footer";
import Header from "./Components/Header";

function App() {
  return (
    <div className="App">
      <div className="container mx-auto lg:w-3/4 flex flex-col  h-screen">
        <Header title="Meme Generator" />
        <Body />
        <Footer />
      </div>
    </div>
  );
}

export default App;
