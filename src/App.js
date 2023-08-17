import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Homepage from "./Pages/Homepage";
import CoinPage from "./Pages/CoinPage";
import { styled } from "@mui/system";

const StyledDiv = styled("div")({
  backgroundColor: "#14161a",
  color: "white",
  minHeight: "100vh",
});

function App() {
  return (
    <BrowserRouter>
      <StyledDiv>
        <Header />
        <Routes>
          <Route path="/" Component={Homepage} exact />
          <Route path="/coins/:id" Component={CoinPage} />
        </Routes>
      </StyledDiv>
    </BrowserRouter>
  );
}

export default App;

//https://www.youtube.com/watch?v=QA6oTpMZp84
