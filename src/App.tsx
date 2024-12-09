
import AddToDo from './components/base/addtodo';
import Navbar from './components/base/navbar';
import Todos from './components/base/todos';
import Logout from './components/auth/Logout';
import { useAuth } from './components/contexts/AuthContext';
import './App.css';
import { Route, Routes, Navigate } from 'react-router-dom';

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
          
        </>
      ) : (
        
      <Routes>
       <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    
      )}
    </main>
  );
};

export default App;
