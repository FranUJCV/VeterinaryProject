import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Container,
  Divider,
  Paper,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import DomainIcon from '@mui/icons-material/Domain';
import AccountCircle from '@mui/icons-material/AccountCircle';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import PersonIcon from '@mui/icons-material/Person';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import GroupIcon from '@mui/icons-material/Group';
import HistoryIcon from '@mui/icons-material/History';
import HistoryEduIcon from '@mui/icons-material/HistoryEdu';
import ScheduleIcon from '@mui/icons-material/Schedule';
import PetsIcon from '@mui/icons-material/Pets';
import WorkIcon from '@mui/icons-material/Work';
import BusinessIcon from '@mui/icons-material/Business';
import DescriptionIcon from '@mui/icons-material/Description';
import VaccinesIcon from '@mui/icons-material/Vaccines';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Icon from './logotipo.png';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../../config/config';

const drawerWidth = 200;

export default function Layout({ children }) {
  const [openDrawer, setOpenDrawer] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [setIsAuthenticated] = useState(false);
  const navigate = useNavigate();
  const toggleDrawer = (open) => () => {
    setOpenDrawer(open);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setIsAuthenticated(false);
      setAnchorEl(null);
      navigate('/');
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  return (
    <div>
      <AppBar position="fixed">
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={toggleDrawer(true)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6">
            PharmaPet
          </Typography>
          <IconButton
            style={{ marginLeft: '10px' }}
            color="inherit"
            onClick={() => navigate('/inicio')}
          >
            <HomeIcon />
            <Typography variant="button" style={{ marginLeft: '5px' }}>Inicio</Typography>
          </IconButton>
          <div style={{ marginLeft: 'auto' }}>
            <IconButton
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={handleLogout}>Cerrar Sesión</MenuItem>
            </Menu>
          </div>
        </Toolbar>
      </AppBar>
      <div style={{ marginTop: '64px' }}>
        <Drawer
          variant="temporary"
          anchor="left"
          open={openDrawer}
          onClose={toggleDrawer(false)}
        >
          <Paper style={{ width: drawerWidth }} elevation={5}>
            <div style={{ display: 'flex', alignItems: 'center', padding: 15 }}>
              <IconButton
                edge="start"
                color="inherit"
                onClick={toggleDrawer(false)}
              >
                <MenuIcon />
              </IconButton>
              <img src={Icon} alt='' style={{ height: 80, marginLeft: 10, marginRight: 'auto' }} />
            </div>
            <Divider />
            <List>
              <ListItem button onClick={() => navigate('/departamentos')}>
                <ListItemIcon>
                  <DomainIcon />
                </ListItemIcon>
                <ListItemText primary="Departamentos" />
              </ListItem>
              <ListItem button onClick={() => navigate('/ciudad')}>
                <ListItemIcon>
                  <LocationCityIcon />
                </ListItemIcon>
                <ListItemText primary="Ciudad" />
              </ListItem>
              <ListItem button onClick={() => navigate('/cliente')}>
                <ListItemIcon>
                  <PersonIcon />
                </ListItemIcon>
                <ListItemText primary="Cliente" />
              </ListItem>
              <ListItem button onClick={() => navigate('/colonia')}>
                <ListItemIcon>
                  <LocationOnIcon />
                </ListItemIcon>
                <ListItemText primary="Colonia" />
              </ListItem>
              <ListItem button onClick={() => navigate('/detalle-vacuna')}>
                <ListItemIcon>
                  <LocalHospitalIcon />
                </ListItemIcon>
                <ListItemText primary="Detalle de Vacuna" />
              </ListItem>
              <ListItem button onClick={() => navigate('/empleado')}>
                <ListItemIcon>
                  <GroupIcon />
                </ListItemIcon>
                <ListItemText primary="Empleado" />
              </ListItem>
              <ListItem button onClick={() => navigate('/historico-puesto')}>
                <ListItemIcon>
                  <HistoryIcon />
                </ListItemIcon>
                <ListItemText primary="Historico de Puesto" />
              </ListItem>
              <ListItem button onClick={() => navigate('/historico-sucursal')}>
                <ListItemIcon>
                  <HistoryEduIcon />
                </ListItemIcon>
                <ListItemText primary="Historico de Sucursal" />
              </ListItem>
              <ListItem button onClick={() => navigate('/horario')}>
                <ListItemIcon>
                  <ScheduleIcon />
                </ListItemIcon>
                <ListItemText primary="Horario" />
              </ListItem>
              <ListItem button onClick={() => navigate('/mascota')}>
                <ListItemIcon>
                  <PetsIcon />
                </ListItemIcon>
                <ListItemText primary="Mascota" />
              </ListItem>
              <ListItem button onClick={() => navigate('/puesto')}>
                <ListItemIcon>
                  <WorkIcon />
                </ListItemIcon>
                <ListItemText primary="Puesto" />
              </ListItem>
              <ListItem button onClick={() => navigate('/sucursal')}>
                <ListItemIcon>
                  <BusinessIcon />
                </ListItemIcon>
                <ListItemText primary="Sucursal" />
              </ListItem>
              <ListItem button onClick={() => navigate('/tipo-documento')}>
                <ListItemIcon>
                  <DescriptionIcon />
                </ListItemIcon>
                <ListItemText primary="Tipo de Documento" />
              </ListItem>
              <ListItem button onClick={() => navigate('/vacuna')}>
                <ListItemIcon>
                  <VaccinesIcon />
                </ListItemIcon>
                <ListItemText primary="Vacuna" />
              </ListItem>
            </List>
          </Paper>
        </Drawer>
        <main>
          <Container maxWidth="lg">
            {children}
          </Container>
        </main>
      </div>
    </div>
  );
}
