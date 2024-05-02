import React, { useContext } from 'react';
import Button from '@mui/material/Button';
import { AuthContext } from '../../../contexts/auth/Auth.Context';

const LoginMessage = () => {
    const { login } = useContext(AuthContext);

    // Handle login action
    const handleLogin = () => {
        login();
    };

    return (
        <div style={{
            padding: "20px 50px",
            textAlign: "center"
        }}>
            <img src="/illustrations/access.svg" className='max-w-[360px] inline-block' />
            <h1 className='h1 mt-6'>Connect Web3 Identity</h1>
            <Button variant="contained" color='black' onClick={handleLogin} style={{ margin: "20px 0" }}>
                <img src="/icp-logo.svg" alt="ICP Logo" style={{ width: 24, marginRight: 10 }} /> Internet Identity
            </Button>
        </div>
    );
};

export default LoginMessage;
