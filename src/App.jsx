import { useState } from "react"
import Home from "./pages/Home"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import 'animate.css';
import Login from "./pages/Login";
import Sign from "./pages/Sign";
import Protect from "./components/Protect";

const App = () => {
  const [menuClose, setMenuClose] = useState()
  const [largeMenu, setLargeMenu] = useState('0px')
  return (
    <>
      <BrowserRouter>
        <Routes>

          <Route element={<Protect />}>
            <Route path="/" element={
              <Home
                menuClose={menuClose}
                setMenuClose={setMenuClose}
                largeMenu={largeMenu}
                setLargeMenu={setLargeMenu} />
            }
            />
          </Route>

          <Route path="/sign" element={<Sign />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App