import "./App.css";
import { Container, Header } from "./components";
import "swiper/css";
import "swiper/css/pagination";
import { Home } from "./pages";

function App() {
  return (
    <Container>
      <Header />
      <Home />
    </Container>
  );
}

export default App;
