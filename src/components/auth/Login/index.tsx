import React, { useState } from 'react';
import { getAuth, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
  const auth = getAuth();
  const navigate = useNavigate();  // Hook to navigate to different routes
  const [authing, setAuthing] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');

  // Google SignIn handler
  const signInWithGoogle = async (): Promise<void> => {
    setAuthing(true);
    signInWithPopup(auth, new GoogleAuthProvider())
      .then((response) => {
        console.log(response.user.uid);
        navigate('/');  // Navigate to home on successful login
      })
      .catch((error) => {
        console.log(error);
        setAuthing(false);
      });
  };

  // Email and Password SignIn handler
  const signInWithEmail = async (): Promise<void> => {
    setAuthing(true);
    setError('');  // Clear any previous errors

    signInWithEmailAndPassword(auth, email, password)
      .then((response) => {
        console.log(response.user.uid);
        navigate('/');  // Navigate to home on successful login
      })
      .catch((error) => {
        console.log(error);
        setError(error.message);  // Set the error message from Firebase
        setAuthing(false);
      });
  };

  // Navigate to sign-up page
  const navigateToSignUp = () => {
    navigate('/signup');  // Ensure this is the correct path for your SignUp page
  };

  return (
    <div className='w-full h-screen flex'>
      <div className='w-1/2 h-full flex flex-col bg-[#28c34] items-center justify-center'>
      </div>
      <div className='w-1/2 h-full bg-[#1a1a1a] flex flex-col p-20 justify-center'>
        <div className='w-full flex flex-col max-w-[450px] mx-auto'>
          <div className='w-full flex flex-col mb-10 text-white'>
            <h3 className='text-4xl font-bold mb-2'>Login</h3>
            <p className='text-lg mb-4'>Welcome back! Please enter your details</p>
          </div>
          <div className='w-full flex flex-col mb-6'>
            <input
              type="email"
              placeholder="Email"
              className='w-full text-white py-2 mb-4 bg-transparent border-b border-gray-500 focus:outline'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder='Password'
              className='w-full text-white py-2 mb-4 bg-transparent border-b border-gray-500 focus:outline'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className='w-full flex flex-col mb-4'>
            <button
              className='w-full bg-transparent border border-white text-white my-2 font-semibold rounded-md'
              onClick={signInWithEmail}
              disabled={authing}
            >
              Log In With Email and Password
            </button>
          </div>
          {error && <div className='text-red-500 mb-4'>{error}</div>}
          <div className='w-full flex items-center justify-center relative py-4'>
            <div className='w-full h-[1px] bg-gray-500'></div>
            <p className='text-lg absolute text-gray-500 bg-[#1a1a1a] px-2'>OR</p>
          </div>
          <button
            className='w-full bg-white text-black font-semibold rounded-md p-4 text-center flex items-center'
            onClick={signInWithGoogle}
            disabled={authing}
          >
            Log In With Google
          </button>
        </div>
        <div className='w-full flex items-center justify-center mt-10'>
          <p className='text-sm font-normal text-gray-400'>
            Don't have an account?
            <span
              className='font-semibold text-white cursor-pointer'
              onClick={navigateToSignUp}  // Trigger navigation to sign-up page
            >
              Sign Up
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
