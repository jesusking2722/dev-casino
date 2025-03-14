import "./App.css";
import { Container, Header, Footer } from "./components";
import "swiper/css";
import "swiper/css/pagination";
import { Home, Login, Register } from "./pages";
import { Routes, Route } from "react-router";

function App() {
  return (
    <>
      <Routes>
        <Route path="/register" Component={Register} />
        <Route path="/login" Component={Login} />
      </Routes>
      <Container>
        <Header />
        <Routes>
          <Route path="/" Component={Home} />
        </Routes>
        <Footer />
      </Container>
    </>
  );
}

export default App;
