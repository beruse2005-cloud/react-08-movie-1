import { BrowserRouter, Route, Routes } from "react-router";
import Home from "./routes/Home.jsx";
import Search from "./routes/Search.jsx";
import Detail from "./routes/Detail.jsx";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path={"/"} element={<Home />} />
                <Route path={"/search"} element={<Search />} />
                <Route path={"/detail/:id"} element={<Detail />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
