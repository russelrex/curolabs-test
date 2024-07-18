import Box from '@mui/material/Box';
import * as React from 'react';
import { Table,
    TableBody,
    TableCell,
    Typography,
    CardContent,
    Card,
    TableHead,
    TableRow,
    Paper,
    Button,
    IconButton,
    Grid,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import axios from 'axios'
import { useCallback, useEffect, useState } from 'react'
import { GetServerSideProps } from 'next';
import AddIcon from '@mui/icons-material/Add';
import RefreshIcon from '@mui/icons-material/Refresh';

interface DailySummary {
    date: string;
    num_losing_trades: number;
    num_trades: number;
    num_winning_trades: number;
    total_fees: number;
    total_loss: number;
    total_lots: number;
    total_pl: number;
    total_profit: number;
    total_roi: number;
}

interface MetricsData {
    account_id: number;
    average_loss: number;
    average_pl: number;
    average_profit: number;
    balance: number;
    daily_dd: number;
    daily_summary: DailySummary[];
    equity: number;
    losing_days: number;
    losing_trades: number;
    max_daily_dd: number;
    max_dd: number;
    max_loss: number;
    max_win: number;
    min_trading_days: number;
    net_pl: number;
    profit_factor: number;
    profit_target: number;
    starting_balance: number;
    status: string;
    total_dd: number;
    total_fees: number;
    total_trades: number;
    trade_expectancy: number;
    trading_days: number;
    win_rate: number;
    winning_days: number;
    winning_trades: number;
}

interface DataProps {
    metricsData: MetricsData
}

const MetricsComponent: React.FC<DataProps> = ({ metricsData }) => {
    return (
        <Box
            width={1368}
            my={4}
            display="flex"
            alignItems="center"
            gap={4}
            p={2}
            sx={{ border: '2px solid grey' }}
        >
            <div className="grid grid-rows-2 grid-flow-col">
                <div>
                    <div className="grid grid-cols-3 grid-flow-col">
                        <div>
                            <div className="flex items-center">
                                <div>
                                    <img src='/binance.png' alt="Binance Icon" style={{ width: 40, height: 40 }} />
                                </div>
                                <div className="ml-4">
                                    <Typography variant="h6">SecondaryAccount</Typography>
                                    <Typography variant="body2" sx={{ color: '#898587' }}>Account ID: {metricsData.account_id}</Typography>
                                </div>
                            </div>
                        </div>
                        <div style={{ marginLeft: '-50px' }}>
                            <div className="grid grid-cols-5">
                                <div className="flex flex-col items-center">
                                    <Typography sx={{ color: '#898587' }}>Trading Days</Typography>
                                    <Typography variant="body2">{metricsData.trading_days}</Typography>
                                </div>
                                <div className="flex flex-col items-center">
                                    <Typography sx={{ color: '#898587' }}>Daily DD</Typography>
                                    <Typography variant="body2">{metricsData.daily_dd}</Typography>
                                </div>
                                <div className="flex flex-col items-center">
                                    <Typography sx={{ color: '#898587' }}>Max Daily DD</Typography>
                                    <Typography variant="body2">{metricsData.max_daily_dd}%</Typography>
                                </div>
                                <div className="flex flex-col items-center">
                                    <Typography sx={{ color: '#898587' }}>Max DD</Typography>
                                    <Typography variant="body2">{metricsData.max_dd}%</Typography>
                                </div>
                                <div className="flex flex-col items-center">
                                    <Typography sx={{ color: '#898587' }}>Profit Target</Typography>
                                    <Typography variant="body2">{metricsData.profit_target}%</Typography>
                                </div>
                            </div>
                        </div>
                        <div style={{ marginLeft: '50px' }}>
                            <div className="grid grid-cols-2 gap-2">
                                <div>
                                    <Button variant="contained" startIcon={<AddIcon />} sx={{ width: '170px', backgroundColor: '#B93876' }}>Import trades</Button>
                                </div>
                                <div>
                                    <Button variant="contained" startIcon={<RefreshIcon />} sx={{ width: '200px', backgroundColor: '#B93876' }}>Update objectives</Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <div className="grid grid-cols-5 gap-4">
                        <div>
                        <Card sx={{ backgroundColor: '#151314', color: 'white' }}>
                            <CardContent>
                                <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 1 }}>
                                    <img src={'/dollar.png'} alt="Dollar Icon" style={{ marginRight: 8 }} />  
                                    <Typography sx={{color: '#898587'}}>
                                        Balance
                                    </Typography>
                                </Box>
                                <Typography ml={4}>
                                    ${metricsData.balance}
                                </Typography>
                            </CardContent>
                        </Card>
                        </div>
                        <div>
                            <Card sx={{ backgroundColor: '#151314', color: 'white' }}>
                                <CardContent>
                                    <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 1 }}>
                                        <img src={'/net.png'} alt="Dollar Icon" style={{ marginRight: 8 }} />  
                                        <Typography sx={{color: '#898587'}}>
                                            Net P&L
                                        </Typography>
                                    </Box>
                                    <Typography ml={4}>
                                        ${metricsData.net_pl}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </div>
                        <div>
                            <Card sx={{ backgroundColor: '#151314', color: 'white' }}>
                                <CardContent>
                                    <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 1 }}>
                                        <img src={'/wallet.png'} alt="Dollar Icon" style={{ marginRight: 8 }} />  
                                        <Typography sx={{color: '#898587'}}>
                                            Equity
                                        </Typography>
                                    </Box>
                                    <Typography ml={4}>
                                        ${metricsData.equity}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </div>
                        <div>
                            <Card sx={{ backgroundColor: '#151314', color: 'white' }}>
                                <CardContent>
                                    <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 1 }}>
                                        <img src={'/scale.png'} alt="Dollar Icon" style={{ marginRight: 8 }} />  
                                        <Typography sx={{color: '#898587'}}>
                                            Avg Win / Loss
                                        </Typography>
                                    </Box>
                                    <Typography ml={4}>
                                        ${metricsData.average_profit}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </div>
                        <div>
                            <Card sx={{ backgroundColor: '#151314', color: 'white' }}>
                                <CardContent>
                                    <div className="grid grid-cols-2 divide-x divide-gray-500 p-0.5">
                                        <div className="flex flex-col justify-center items-center h-full">
                                            <div>
                                                <Typography sx={{ color: '#898587' }}>
                                                    Win Rate
                                                </Typography>
                                            </div>
                                            <div>
                                                <Typography sx={{ color: 'green' }}>
                                                    13.79%
                                                </Typography>
                                            </div>
                                        </div>
                                        <div className="flex flex-col justify-center items-center h-full">
                                            <div>
                                                <Typography sx={{ color: '#898587' }}>
                                                    Profit Factor
                                                </Typography>
                                            </div>
                                            <div>
                                                <Typography>
                                                    0.04
                                                </Typography>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
                </div>

        </Box>
    )
}

export default MetricsComponent;

export const getServerSideProps: GetServerSideProps = async () => {
    try {
        const response = await axios.get('http://13.41.72.245/fetch_metrics');
        return {
            props: {
                metricsData: response.data,
            },
        };
    } catch (error) {
        console.error('Error fetching open accounts:', error);
        return {
            props: {
                metricsData: {},
            },
        };
    }
};