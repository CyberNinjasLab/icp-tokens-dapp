import React, { useContext } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import Button from '@mui/material/Button';
import { AuthContext } from '../../../contexts/auth/Auth.Context';
import CloseIcon from '@mui/icons-material/Close';

const LoginModal = ({ open, onClose }) => {
    const { login } = useContext(AuthContext);
    
    // Handle login action
    const handleLogin = () => {
        login();
    };
    
    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle style={{
                padding: "30px 50px 20px 50px"
            }}>
                <span className='h1'>Connect Web3 Identity</span>
                <Button onClick={onClose} color='black' style={{ position: 'absolute', right: 6, top: 6, minWidth: 30, minHeight: 24 }}>
                    <CloseIcon />
                </Button>
            </DialogTitle>
            <DialogContent style={{
                paddingBottom: 30
            }}>
                <Button variant="contained" color='black' onClick={handleLogin} className='w-full'>
                    <img src="/icp-logo.svg" className='w-6 mr-2' /> Internet Identity
                </Button>
            </DialogContent>
        </Dialog>
    );
};

export default LoginModal;
