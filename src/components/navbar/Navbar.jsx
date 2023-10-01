import { AppBar, Box, Button, IconButton, TextField, Toolbar, Typography } from '@mui/material';
import React from 'react';
import { Link, NavLink } from 'react-router-dom';
function Navbar() {
    return (
        <>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            sx={{ mr: 2 }}
                        >
                            {/* <MenuIcon /> */}
                        </IconButton>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1, textDecoration: 'none' }}>
                            <NavLink to='/' style={{ textDecoration: 'none', fontWeight: 700 }}>World Map Data </NavLink>
                        </Typography>
                        <Button color="inherit">
                            
                        </Button>
                    </Toolbar>
                </AppBar>
            </Box>
        </>
    )
}
export default Navbar;