import React from 'react';
import { login } from '../http/employeeApi';
import { useState } from 'react';
import { MAINPAGE_ROUTE } from '../utils/consts';
import { useNavigate } from 'react-router-dom';
import { Alert, Button, Container, Stack, TextField, Typography } from '@mui/material';
import { observer } from 'mobx-react-lite';

const AuthPage = () => {
    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [show, setShow] = React.useState(false);

    const click = async () => {
        try {
            let data;

            data = await login({ email: email, password: password });

            localStorage.setItem('token', data.token)
            localStorage.setItem('isAuth', true)

            navigate(MAINPAGE_ROUTE);
            window.location.reload()
        } catch (error) {
            if (error.response.status === 404 || error.response.status === 500) {
                setShow(true);
            }
        }
    };

    return (
        <Container>
            <Stack spacing={2} style={{marginTop: "10%"}}>
                <Typography>Войти</Typography>
                <TextField id="email"
                    label="Почта" variant="outlined"
                    type='email' onChange={(e) => setEmail(e.target.value)} />
                <TextField id="password"
                    label="Пароль" variant="outlined"
                    type='password' onChange={(e) => setPassword(e.target.value)} />
                <Button variant='contained' onClick={click} style={{width: "200px"}}>Войти</Button>
                {show ?
                    <Alert severity="error">Неверный логин или пароль</Alert>
                    :
                    <></>
                }
            </Stack>
        </Container>
    );
}

export default observer(AuthPage);
