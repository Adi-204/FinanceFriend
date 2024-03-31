import React, { useContext, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import {
    Card,
    Input,
    Checkbox,
    Button,
    Typography,
} from "@material-tailwind/react";

export const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const { setAccessToken } = useAuth();

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const response = await axios.post('/api/user/login', formData,{
                withCredentials: true
            });
            const accessToken = response.data.accessToken;
            setAccessToken(accessToken);
            setFormData({
                email: '',
                password: ''
            });
            navigate(from,{replace : true});
        } catch (error) {
            console.log(error);
            setError(error.response.data);
        } finally {
            setLoading(false);
        }
    };

    const onChangeHandler = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    return (
        <div className="flex justify-center items-center h-screen">
        <Card color="transparent" shadow={false} >
        <Typography variant="h4" color="blue-gray">
            Login
        </Typography>
        <Typography color="gray" className="mt-1 font-normal">
            Nice to meet you! Enter your details to login.
        </Typography>
        <form 
            className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96" 
            onSubmit={handleSubmit}
        >
            <div className="mb-1 flex flex-col gap-6">
            <div className="w-72">
                <Input
                    label='Email'
                    size="lg"
                    placeholder="name@mail.com"
                    type="email"
                    required
                    name="email"
                    value={formData.email}
                    onChange={onChangeHandler}
                />
            </div>
            <div className="w-72">
                <Input
                    label='Password'
                    size="lg"
                    placeholder="********"
                    required
                    name="password"
                    value={formData.password}
                    onChange={onChangeHandler}
                />
            </div>
            </div>
            {error && <p className="text-red-500 mt-2">{error}</p>}
            <Button className="mt-6" type='submit'> 
             Login
            </Button>
            <Typography color="gray" className="mt-4 text-center font-normal">
            Account doesn't exist?{" "}
            <a href="/signup" className="font-medium text-gray-900">
                Sign Up
            </a>
            </Typography>
        </form>
        </Card>
        </div>
    );
};
