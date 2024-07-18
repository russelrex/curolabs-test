import Box from '@mui/material/Box';
import * as React from 'react';
import {
    Typography,
    Card,
    Divider,
    Grid
} from '@mui/material';
import axios from 'axios';
import { GetServerSideProps } from 'next';
import { Info } from '@mui/icons-material';
import audusd from '../../../public/audusd.png'

interface Prices {
    [key: string]: number;
}

interface DataProps {
    data: {
        prices: Prices;
        status: string;
    };
}

const iconMapping: { [key: string]: React.ElementType | string } = {
    AUDUSD: '/eurchf.png',
    EURCHF: '/eurchf.png',
    EURJPY: '/eurjpy.png',
    EURUSD: '/eurusd.png',
    GBPUSD: '/gbpusd.png',
    NZDUSD: '/nzdusd.png',
    USDCAD: '/usdcad.png',
};

const PricesComponent: React.FC<DataProps> = ({ data }) => {

    const getPriceColor = (price: number) => {
        if (price < 1) return 'red';
        if (price > 10) return 'green';
        return 'white';
    };
    return (
        <div className="flex justify-center">
            <div>
                <Grid container>
                    <Grid item>
                        <Card
                            sx={{
                                width: 360,
                                height: 450,
                                backgroundColor: 'black',
                                color: 'white',
                                borderColor: '#898587',
                                borderWidth: 2,
                                padding: 3,
                                borderStyle: 'solid',
                            }}
                        >
                            {Object.entries(data.prices[0]).map(([currencyPair, price]) => {
                                if ( currencyPair === 'EURUSD' ) {
                                    return (
                                        <Box
                                            key={currencyPair}
                                            display="flex"
                                            justifyContent="space-between"
                                            alignItems="center"
                                            sx={{ padding: 1, marginBottom: 1, borderRadius: 1 }}
                                        >
                                            <Box display="flex" alignItems="center">
                                                <img src={'/eurusd.png'} alt={currencyPair} style={{ marginRight: 8, height: 20 }} />
                                                <Typography variant="body1">{currencyPair}:</Typography>
                                            </Box>
                                            <Typography variant="body1" sx={{ color: getPriceColor(price) }}>{price.toString()}</Typography>
                                        </Box>
                                    )
                                }
                            })}
                            <Divider sx={{ backgroundColor: 'grey.700', marginY: 2 }} />
                            <Box>
                                {Object.entries(data.prices[0]).map(([currencyPair, price]) => {
                                        const IconComponent = iconMapping[currencyPair];
                                        return (
                                            <Box
                                                key={currencyPair}
                                                display="flex"
                                                justifyContent="space-between"
                                                alignItems="center"
                                                sx={{ padding: 1, marginBottom: 1, borderRadius: 1 }}
                                            >
                                                <Box display="flex" alignItems="center">
                                                    {typeof IconComponent === 'string' ? (
                                                        <img src={IconComponent} alt={currencyPair} style={{ marginRight: 8, height: 20 }} />
                                                    ) : (
                                                        <IconComponent sx={{ marginRight: 1, color: 'blue', fontSize: 20 }} />
                                                    )}
                                                    <Typography variant="body1">{currencyPair}:</Typography>
                                                </Box>
                                                <Typography variant="body1" sx={{ color: getPriceColor(price) }}>{price.toString()}</Typography>
                                            </Box>
                                        );
                                    })}
                            </Box>
                        </Card>
                    </Grid>
                </Grid>
            </div>
        </div>
    );
};

export default PricesComponent;

export const getServerSideProps: GetServerSideProps = async () => {
    try {
        const response = await axios.get('http://13.41.72.245/current_prices');
        return {
            props: {
                data: response.data,
            },
        };
    } catch (error) {
        console.error('Error fetching open accounts:', error);
        return {
            props: {
                data: { prices: {}, status: 'error' },
            },
        };
    }
};