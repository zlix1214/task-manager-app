import { Routes, Route } from "react-router-dom";
import { Login } from "./page/Login";
import { Register } from "./page/Register";
import { Tasks } from "./page/Tasks";
import { PrivateRoute } from "./components/PrivateRoute";
import './index.css'

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/Register" element={<Register />} />
      <Route
        path="/Tasks"
        element={
          <PrivateRoute>
            <Tasks />
          </PrivateRoute>
        }
      ></Route>
    </Routes>
  );
}
export default App;
