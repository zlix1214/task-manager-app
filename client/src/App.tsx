import { Routes, Route ,Navigate } from "react-router-dom";
import { Login } from "./page/Login";
import { Register } from "./page/Register";
import { TasksPage } from "./page/TasksPage";
import { PrivateRoute } from "./components/PrivateRoute";
import './index.css'


function App() {
  return (
    <>
    {/* <RainbowBackground /> */}
    <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<Login />} />
      <Route path="/Register" element={<Register />} />
      <Route
        path="/Tasks"
        element={
          <PrivateRoute>
            <TasksPage />
          </PrivateRoute>
        }
      ></Route>
    </Routes>
    </>
  );
}
export default App;
