import React from 'react';
import Box from '@mui/system/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';


const ProductSidebar = () => {
  return (
    <>
      <Box>
        <AppBar position='static' color='primary'>
          <Toolbar>
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ 'aria-label': 'search' }}
              />
            </Search>
          </Toolbar>
        </AppBar>   
      </Box>
    </>
  )
}

export default ProductSidebar;