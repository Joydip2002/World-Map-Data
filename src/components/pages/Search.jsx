import { Box, TextField } from '@mui/material';
import React, { useState } from 'react';
import { useApi } from '../../contextApi/ApiContext';

function Search() {
    const {data} = useApi();
    const [searchText, setSearch] = useState('');
    console.log(data?.name );

    return (
        <>
            <Box
                component="form"
                sx={{
                    display : 'flex', justifyContent:'center',
                    mt:3
                }}
                noValidate
                autoComplete="off"
            >
                <TextField id="standard-basic" sx={{width:'50%'}} label="Filter by Country Name" variant="outlined"  />
                
            </Box>
        </>
    )
}

export default Search;