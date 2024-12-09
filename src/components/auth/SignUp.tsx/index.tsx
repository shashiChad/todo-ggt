import React, { useState } from 'react';
import { getAuth, GoogleAuthProvider, signInWithPopup, createUserWithEmailAndPassword, UserCredential } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const SignUp: React.FC = () => {
  const auth = getAuth();
  const navigate = useNavigate();
  
  // Add explicit types for state variables
  const [authing, setAuthing] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [error, setError] = useState<string>('');

  // Google SignUp handler
  const signUpWithGoogle = async (): Promise<void> => {
    setAuthing(true);  // Prevent further actions while signing up

    signInWithPopup(auth, new GoogleAuthProvider())
      .then((response: UserCredential) => {
        console.log(response.user.uid);
        navigate('/');  // Navigate to the home page on successful sign up
      })
      .catch((error: Error) => {
        console.log(error);
        setError('Something went wrong with Google sign-up');  // Display error message
        setAuthing(false);  // Re-enable actions
      });
  };

  // Email & Password SignUp handler
  const signInWithEmail = async (): Promise<void> => {
    if (password !== confirmPassword) {
      setError('Passwords don\'t match');
      return;
    }
    
    setAuthing(true);
    setError('');  // Clear any previous errors

    createUserWithEmailAndPassword(auth, email, password)
      .then((response: UserCredential) => {
        console.log(response.user.uid);
        navigate('/');  // Navigate to home on successful sign up
      })
      .catch((error: Error) => {
        console.log(error);
        setError(error.message);  // Display error message from Firebase
        setAuthing(false);  // Re-enable actions
      });
  };

  return (
    <div className='w-full h-screen flex'>
      <div className='w-1/2 h-full flex flex-col bg-[#282c34] items-center justify-center'>
      </div>
      <div className='w-1/2 h-full bg-[#1a1a1a] flex flex-col p-20 justify-center'>
        <div className='w-full flex flex-col max-w-[450px] mx-auto'>
          <div className='w-full flex flex-col mb-10 text-white'>
            <h3 className='text-4xl font-bold mb-2'>SignUp</h3>
            <p className='text-lg mb-4'>Welcome! Please enter your information below</p>
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
              placeholder="Password"
              className='w-full text-white py-2 mb-4 bg-transparent border-b border-gray-500 focus:outline'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <input
              type="password"
              placeholder="Re-Enter Password"
              className='w-full text-white py-2 mb-4 bg-transparent border-b border-gray-500 focus:outline'
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          {error && <div className='text-red-500 mb-4'>{error}</div>}
          <div className='w-full flex flex-col mb-4'>
            <button
              onClick={signInWithEmail}
              disabled={authing}
              className='w-full bg-transparent border border-white text-white my-2 font-semibold rounded-md'
            >
              Sign Up with Email and Password
            </button>
          </div>
          <div className='w-full flex items-center justify-center relative py-4'>
            <div className='w-full h-[1px] bg-gray-500'></div>
            <p className='text-lg absolute text-gray-500 bg-[#1a1a1a] px-2'>OR</p>
          </div>
          <button
            className='w-full bg-transparent border border-white text-white my-2 font-semibold rounded-md'
            onClick={signUpWithGoogle}
            disabled={authing}
          >
            Sign Up with Google
          </button>
        </div>
        <div className='w-full flex items-center justify-center mt-18'>
          <p className='text-sm font-normal text-gray-400'>Already have an account?</p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
