import { signOut } from 'firebase/auth';
import { auth } from '../../utils/firebaseConfig';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/login');
    } catch (err) {
      console.error('Logout failed', err);
    }
  };

  return (
    <button
      onClick={handleLogout}
      className=' w-64 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 focus:outline-none'
    >
      Logout
    </button>
  );
};

export default Logout;
