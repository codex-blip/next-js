'use client';
import { useState } from 'react';
import './Login.css';
import { FaGithub } from 'react-icons/fa';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';

export default function Login() {
    const [email , setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isRegister , setIsRegister] = useState(false);
    const [isAuthenticating, setIsAuthenticating] = useState(false);
    const [error, setError] = useState(null);

    const {login,signup} = useAuth();
    const router = useRouter();

    const cantAuth = (!email.includes('@') || password.length < 6) 

    async function handleAuthUser() {

        if (cantAuth){
            setError('Please enter a valid email and password with at least 6 characters.');
            console.alert({error})
            setIsAuthenticating(false);
            return;
        }
        
        
        setIsAuthenticating(true);
        try{
            if (isRegister){
                // register them
                await signup(email, password);
            }else{
                //login them
                await login(email, password);
            }
            router.push('/notes')

        }catch(err) {
            setError(err.message);
            console.error("Authentication error:", err);
        }finally {
            setIsAuthenticating(false);
        }
    }

    return(
        <>
            <div className="login-container">
                <h1 className="text-gradient">NotesNest</h1>
                <h2>Your thoughts, organized. Your ideas, unleashed.</h2>
                <p>Sign in to access your notes and keep your ideas safe.</p>
                <p>Simple, secure, and always available.</p>
                <div className="full-line"></div>
                <h6>{isRegister ? 'Create an account' : 'Log In'}</h6>
                <div>
                    <p>Email</p>
                    <input type="text" value={email} onChange={(e) => { 
                        setEmail(e.target.value); 
                        setError(null); // Clear error on input change
                    }} placeholder="Enter your Email Address"/>
                </div>
                <div>
                    <p>Password</p>
                    <input type="password" placeholder="*********" 
                    value={password} 
                    onChange={(e) => { 
                        setPassword(e.target.value); 
                        setError(null); // Clear error on input change
                    }}/>
                </div>
                <button className="submit-btn" 
                onClick={handleAuthUser} disabled={cantAuth || isAuthenticating}>
                    {isAuthenticating ? 'Submitting...' : 'Submit'}
                </button>
                <p id = 'err'>{error && <p className="error-message">{error}</p>}</p>
                <div className="secondary-btns-container">
                    <button className="card-button-secondary" onClick = {() => {
                        setIsRegister(!isRegister);
                    }}>
                        <small>{!isRegister ? 'Sign Up' : 'Log In'}</small>
                    </button>
                    <button className='card-button-secondary'>
                        <small>Forgot Password?</small>
                    </button>
                </div>
                <div className='full-line'></div>
                <footer>
                    <a target='_blank' href="https://github.com/codex-blip">
                        <img src="https://avatars.githubusercontent.com/u/133332252?s=96&v=4" alt="pfp" />
                        <h6>@codex-blip</h6>
                        <FaGithub style={{ marginLeft: '8px', verticalAlign: 'middle' }} />
                    </a>
                </footer>
            </div>
        </>
    );
}