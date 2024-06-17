import { Route, Routes, Navigate } from "react-router-dom";
import Main from "./components/Main";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Profile from "./components/Profile/index"; // Poprawny import

function App() {
  const user = localStorage.getItem("token");

  return (
    <Routes>
      {user ? (
        <>
          <Route path="/" element={<Main />} />
          <Route path="/profile" element={<Profile />} /> {/* Definicja ścieżki /profile */}
        </>
      ) : (
        <>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Navigate replace to="/login" />} />
        </>
      )}
    </Routes>
  );
}

export default App;
