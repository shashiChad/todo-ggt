
import AddToDo from './components/base/addtodo';
import Navbar from './components/base/navbar';
import Todos from './components/base/todos';
import Logout from './components/auth/Logout';
import { useAuth } from './components/contexts/AuthContext';
import './App.css';
import Register from './components/auth/Register';
import { Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/auth/Login';

const App = () => {
  const { user } = useAuth();

  return (
    <main>
      <h1 className="font-extrabold text-white-400 text-center text-lg mx-5 py-5">
        TODO APP
      </h1>
      <Navbar />

      {user ? (
        <>
          <AddToDo />
          <Todos />
          <Logout />
          <Login/>
          <Register/>
        </>
      ) : (
        <Routes>
          
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<Navigate to="/register" />} />
        </Routes>
      )}
    </main>
  );
};

export default App;
