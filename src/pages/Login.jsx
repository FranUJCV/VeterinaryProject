import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../config/config';
import {
  Container,
  Typography,
  TextField,
  Button,
  CircularProgress,
  Grid,
  Paper,
  Box,
  Avatar,
} from '@mui/material';
import { signInWithEmailAndPassword } from 'firebase/auth';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      setLoading(true);
      await signInWithEmailAndPassword(auth, email, password);
      setLoading(false);
      navigate('/inicio');
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  }

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  }

  return (
    <Grid container justifyContent="center" alignItems="center" style={{ height: '100vh' }}>
      <Container component={Paper} elevation={5} maxWidth="xs">
        <Box p={4}>
          <Avatar style={{ margin: 'auto', backgroundColor: 'primary.main' }}>
            <AccountCircleIcon />
          </Avatar>
          <Typography variant="h4" align="center" gutterBottom>
            Iniciar Sesión
          </Typography>
          <form>
            <TextField
              label="Email"
              type="email"
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              margin="normal"
            />
            <TextField
              label="Contraseña"
              type={showPassword ? 'text' : 'password'}
              fullWidth
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              margin="normal"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={handleTogglePasswordVisibility}
                      edge="end"
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={handleLogin}
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} /> : 'Iniciar Sesión'}
            </Button>
            {error && (
              <Typography color="error" align="center" style={{ marginTop: 8 }}>
                {error}
              </Typography>
            )}
            <Typography variant="body2" align="center" style={{ marginTop: 16 }}>
              ¿No tienes una cuenta? <Link to="/registro">Registrarse</Link>
            </Typography>
          </form>
        </Box>
      </Container>
    </Grid>
  );
}

export default Login;
