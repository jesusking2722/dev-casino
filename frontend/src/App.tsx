import "./App.css";
import { Container, Header, Footer } from "./components";
import "swiper/css";
import "swiper/css/pagination";
import { Home } from "./pages";
import { Routes, Route } from "react-router";

function App() {
  return (
    <Container>
      <Header />
      <Routes>
        <Route path="/" Component={Home} />
      </Routes>
      <Footer />
    </Container>
  );
}

export default App;
