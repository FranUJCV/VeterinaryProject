import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../config/config';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { Container, Typography, TextField, Button, CircularProgress, Grid, Paper, Box, Avatar } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';

function Registro() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const handleRegistro = async () => {
    try {
      if (password !== confirmPassword) {
        setError("Las contraseñas no coinciden.");
        return;
      }

      setLoading(true);
      await createUserWithEmailAndPassword(auth, email, password);
      setLoading(false);
      navigate('/');
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  }

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  }

  const handleToggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  }

  return (
    <Grid container justifyContent="center" alignItems="center" style={{ height: '100vh' }}>
      <Container component={Paper} elevation={5} maxWidth="xs">
        <Box p={4}>
          <Avatar style={{ margin: 'auto', backgroundColor: 'primary.main' }}>
            <AccountCircleIcon />
          </Avatar>
          <Typography variant="h4" align="center" gutterBottom>
            Crear una cuenta
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
            <TextField
              label="Confirmar Contraseña"
              type={showConfirmPassword ? 'text' : 'password'}
              fullWidth
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              margin="normal"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={handleToggleConfirmPasswordVisibility}
                      edge="end"
                    >
                      {showConfirmPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={handleRegistro}
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} /> : 'Registrarse'}
            </Button>
            {error && (
              <Typography color="error" align="center" style={{ marginTop: 8 }}>
                {error}
              </Typography>
            )}
            <Typography variant="body2" align="center" style={{ marginTop: 16 }}>
              ¿Ya tienes una cuenta? <Link to="/">Iniciar sesión</Link>
            </Typography>
          </form>
        </Box>
      </Container>
    </Grid>
  );
}

export default Registro;
