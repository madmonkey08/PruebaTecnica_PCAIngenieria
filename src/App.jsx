import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import { Login } from "./components/Login";
import { RuletaPage } from "./pages/RuletaPage";
import { UsuariosPage } from "./pages/UsuariosPage";

function App() {

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/usuarios" element={<UsuariosPage />} />
          <Route exact path="/" element={<RuletaPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
