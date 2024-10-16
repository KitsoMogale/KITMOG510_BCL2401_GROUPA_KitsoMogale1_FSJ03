'use client'
import { useState } from 'react';
import { getAuth } from 'firebase/auth';
import app from '../firebaseConfig';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { useAuth } from '../Authcontext';
import { redirect, useRouter } from 'next/navigation'; // Optional, for redirecting


const auth = getAuth(app);
export default function Auth() {
  const { user,login} = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false); // Toggle between Sign In and Sign Up
  const [name,setName] = useState('');
  const [surname,setSurname] = useState('')
  const route = useRouter();

  const handleAuth = async (e) => {
    e.preventDefault();
   console.log('123456789')
    try {
      if (isSignUp) {
        // Sign Up
        await createUserWithEmailAndPassword(auth, email, password);
        console.log('User signed up');
        localStorage.setItem('name',name);
        localStorage.setItem('surname',surname);
        setIsSignUp(!isSignUp)
        handleAuth()
      } else {
        // Sign In
        await signInWithEmailAndPassword(auth, email, password);
        console.log('User signed in');
        if (typeof window !== "undefined") {
          localStorage.setItem('isLoggedIn',true);
          login();
          alert('Successfully loggedIn')
         route.back()
        }

      }
    } catch (error) {
      console.error('Error with authentication', error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-6">
    <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
      <h1 className="text-2xl font-semibold text-center mb-6">
        {isSignUp ? <p className='bg-blue-600 w-fit rounded p-2 text-white'>Sign Up</p>  : <p className='bg-green-600 w-fit rounded p-2 text-white'>Sign In</p>}
      </h1>
      <form onSubmit={handleAuth} className="space-y-4">
     {isSignUp?<input
          type="name"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />:null}   
       {isSignUp? <input
          type="surname"
          placeholder="surname"
          value={surname}
          onChange={(e) => setSurname(e.target.value)}
          required
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />:null} 
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-3 rounded-md hover:bg-blue-600 transition duration-200"
        >
          {isSignUp ? 'Sign Up' : 'Sign In'}
        </button>
      </form>
      <div className="text-center mt-4">
        <button
          onClick={() => setIsSignUp(!isSignUp)}
          className="text-blue-500 hover:underline"
        >
          {isSignUp ? 'Already have an account? Sign In' : 'Don’t have an account? Sign Up'}
        </button>
      </div>
    </div>
  </div>
  );
}
