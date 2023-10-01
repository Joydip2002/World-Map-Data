import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Navbar from '../navbar/Navbar';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import axios from 'axios';
import { useState } from 'react';
import { CircularProgress } from '@mui/material';

export default function CountryDetails() {
    const { countryCode } = useParams();
    const[loading,isloading] = useState(false);
    const [getDetails, setCountryDetails] = useState('');
    
    const getCountryDeatils = async (code) => {
        const res = await axios.get(`https://restcountries.com/v3.1/name/${code}`);
        console.log(res.data);
        setCountryDetails(res.data[0]);
        isloading(true);
    }

    useEffect(() => {
        getCountryDeatils(countryCode);
    }, [])

    return (
        <>
            <Navbar />
           {loading?<div className="app" style={{marginTop:'1rem'}}>
                <div className="card-wrapper" >
                        <CardMedia
                            component="img"
                            alt="green iguana"
                            image={getDetails.flags?.png}
                            sx={{width:'40%'}}
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                                {getDetails.name?.common}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                            {getDetails.capital} | {getDetails.population}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                            Region : {getDetails.region} 
                            </Typography>
                             
                        </CardContent>
                        <CardActions>
                            <Button size="small">Share</Button>
                            <Button size="small">Learn More</Button>
                        </CardActions>
                </div>
            </div>:<div style={{textAlign:'center'}}><CircularProgress/></div> }
        </>
    );
}
