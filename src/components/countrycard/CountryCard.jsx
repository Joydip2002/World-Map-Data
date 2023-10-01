import { Box, Button, Card, CardActions, CardContent, CardMedia, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material'
import React from 'react';
import { useApi } from '../../contextApi/ApiContext';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';


const Loader = () => {
    return (
        <div className="loader" style={{ textAlign: 'center' }}>
            <img src="./images/loader.gif" alt="" />
        </div>
    );
};

const CountryCard = (props) => {
    const { data } = useApi();
    // console.log(data.length);
    const [getSearchCountry, setSeacrchCountry] = useState([]);
    const [getCountry, setCountry] = useState('');
    const [loading, isloading] = useState(true);
    const [getRegion, setRegion] = useState('');
 

    const [page, setPage] = useState(1);
    // const [getLength, setLength] = useState(data.len);

    // if (!Array.isArray(data) || data.length === 0) {
    //     console.log('no data available');
    //     return <div style={{ textAlign: 'center' }}>No data available</div>;
    // }

    const searchFunc = (e) => {
        setCountry(e.target.value);

    }

    const regionFunc = (e) => {
        // console.log(e.target.value);
        setRegion(e.target.value);
    }

    // Pagination
    const pageSelectFunc = (pageNumber) => {
        setPage(pageNumber);
    }
    const prevFunc = () => {
        if ((page - 1) > 0) { setPage(page - 1) } 
        else { 
            setPage(getSearchCountry.length/10)
         }
    };
    const nextFunc = () => {
         if((page + 1)<= getSearchCountry.length/10){setPage(page+1)}
         else{
            setPage(1);
         }
    };

    useEffect(() => {
        setTimeout(() => {
            isloading(false);
        }, 1000);
    }, []);

    // Search by Name
    useEffect(() => {
        if (getCountry.length == '') {
            setSeacrchCountry(data);
        }
        else {
            if (Array.isArray(data)) {
                const filteredData = data.filter((c) => {
                    const countryName = (c.name.common);
                    const country = countryName.includes(getCountry[0].toUpperCase() +
                        getCountry.slice(1));
                    return country;
                });
                setSeacrchCountry(filteredData);
            }
        }
    }, [getCountry, data]);

    // Search By Region
    useEffect(() => {
        if (getRegion.length == '') {
            setSeacrchCountry(data);
        }
        else {
            if (getRegion) {
                let filteredRegion = data.filter((c) => {
                    const countryRegion = (c.region);
                    if (countryRegion === getRegion) {
                        return countryRegion;
                    }
                });
                setSeacrchCountry(filteredRegion);
            }
        }

    }, [getRegion, data]);

    // Search By Region and Name
    useEffect(() => {
        if (getRegion && getCountry) {
            let filteredCountryByRegion = data.filter((c) => {
                const countryName = (c.name.common);
                const countryRegion = (c.region);
                if (countryRegion === getRegion && countryName.includes(getCountry[0].toUpperCase() +
                    getCountry.slice(1))) {
                    return countryRegion;
                }
            });
            setSeacrchCountry(filteredCountryByRegion);
        }

    }, [getRegion, getCountry, data])

    if (loading) {
        return <Loader />;
    }
    return (
        <>
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '1rem' }}>
                <Box
                    component="form"
                    sx={{
                        display: 'flex', justifyContent: 'center',
                        mt: 3
                    }}
                    noValidate
                    autoComplete="off"
                >
                    <TextField id="standard-basic" label="Filter by Country Name" variant="outlined" onChange={searchFunc} />
                </Box>
                <Box sx={{ width: '30%', mt: 3 }}>
                    <FormControl sx={{ width: '100%' }}>
                        <InputLabel id='region-filter'>Filter By Region</InputLabel>
                        <Select
                            labelId='region-filter'
                            label='Filter by region'
                            value={getRegion}
                            onChange={regionFunc}
                        >
                            <MenuItem value='Oceania'>Oceania</MenuItem>
                            <MenuItem value='Asia'>Asia</MenuItem>
                            <MenuItem value='Europe' >Europe</MenuItem>
                            <MenuItem value='Africa' >Africa</MenuItem>
                            <MenuItem value='Americas'>Americas</MenuItem>
                            <MenuItem value='Caribbean' >Caribbean</MenuItem>
                        </Select>
                    </FormControl>
                </Box>
            </Box>
            {getSearchCountry.length === 0 ? (<div style={{ display: 'flex', justifyContent: 'center', marginTop: '10%' }}><p style={{ padding: '20px', borderRadius: '5px', backgroundColor: 'lightcoral', color: 'white' }}>No matching countries found.</p></div>) :
                <div className="app">
                    <div className="card-wrapper">
                        {getSearchCountry.slice(page * 9 - 9, page * 9).map((d, index) => (
                            <Link to={`/country-details/${d.name.common}`} style={{ textDecoration: 'none' }} key={index}>
                                <Card sx={{ maxWidth: 345, mt: 4 }}>
                                    <CardMedia
                                        component="img"
                                        alt="green iguana"
                                        // height="180"
                                        image={d.flags.png}
                                    />
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="div">
                                            {d.name.common}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            {d.capital} | {d.population}
                                        </Typography>
                                    </CardContent>
                                    <CardActions>
                                        <Button size="small">Share</Button>
                                        <Button size="small">Learn More</Button>
                                    </CardActions>
                                </Card>
                            </Link>
                        ))}
                    </div>
                </div>
            }
            {
                getSearchCountry.length > 0 && (
                    <>
                        <div className='pagination'>
                            <span onClick={prevFunc}>◀️</span>
                            {
                                [...Array(getSearchCountry.length )].map((_, index) => {
                                    return <span className={page == index + 1 ? 'selectedPage' : ''} onClick={() => pageSelectFunc(index + 1)} key={index}>{index + 1}</span>
                                })
                            }
                            <span onClick={nextFunc}>▶️</span>
                        </div>
                    </>
                )
            }
        </>
    )
}

export default CountryCard;
