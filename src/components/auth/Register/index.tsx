import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../utils/firebaseConfig';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (password.length < 6) {
        setError('Password must be at least 6 characters.');
        return;
      }
      await createUserWithEmailAndPassword(auth, email, password);
      navigate('/');
    } catch (err: any) {
      setError('Failed to create account. Please try again.');
      console.error("Registration Error:", err.code, err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='mx-auto max-w-md bg-white rounded-xl p-10 border border-gray-300 shadow-lg'>
      <h2 className='text-xl font-semibold text-center mb-6'>Register</h2>
      <form onSubmit={handleRegister} className='space-y-4'>
        <input
          className='w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500'
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        <input
          className='w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500'
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        <button 
          disabled={loading}
          className='w-full py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none'
          type="submit"
        >
          {loading ? 'Registering...' : 'Register'}
        </button>
      </form>
      {error && <p className="text-red-500 text-center mt-2">{error}</p>}
    </div>
  );
};

export default Register;
