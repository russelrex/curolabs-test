import Box from '@mui/material/Box';
import * as React from 'react';
import { Table,
    TableBody,
    TableCell,
    Typography,
    TableContainer,
    Avatar,
    TableHead,
    TableRow,
    Paper,
    Button,
    IconButton,
    Grid,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import axios from 'axios'
import { useCallback, useEffect, useState } from 'react'
import { GetServerSideProps } from 'next';
import { Edit as EditIcon, CameraAlt as CameraIcon, BorderAllRounded } from '@mui/icons-material';

interface OpenPosition {
    account_id: number;
    balance: number;
    entry: number;
    equity: number;
    exit: number;
    exit_time: string;
    fees: number;
    open_time: string;
    order_id: string;
    pl: number;
    position_type: string;
    quantity: number;
    roi: number;
    sl: number;
    status: string;
    symbol: string;
    tp: number;
}

interface DataProps {
    positions: {
        open_trades:  OpenPosition[];
        status:  string;
    }
}

const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
backgroundColor: 'black',
}));

const StyledTableCell = styled(TableCell)(({ theme }) => ({
color: 'white',
}));

const formatDateTime = (dateTime: string) => {
    const [date, time] = dateTime.split(' ');
    return { date, time };
};

const Home: React.FC<DataProps> = ({ positions }) => {
    const openTradesCount = positions.open_trades.length;
    return (
        <Box
        my={4}
        display="flex"
        alignItems="center"
        gap={4}
        p={2}
        sx={{ border: '2px solid grey' }}
      >
        <StyledTableContainer>
            <Grid container alignItems='center' spacing={2} mb={2}>
                <Grid item>
                <Box display="flex">
                    <Typography>Open Position</Typography>
                    <Avatar sx={{ bgcolor: '#333', ml: 1, width: 24, height: 24, fontSize: 14 }}>{openTradesCount}</Avatar>
                </Box>
                </Grid>
                <Grid item>
                <Box display="flex">
                    <Typography>Open Orders</Typography>
                    <Avatar sx={{ bgcolor: '#333', ml: 1, width: 24, height: 24, fontSize: 14 }}>4</Avatar>
                    </Box>
                </Grid>
                <Grid item mr={10}>
                <Box display="flex">
                    <Typography>Order History</Typography>
                    <Avatar sx={{ bgcolor: '#333', ml: 1, width: 24, height: 24, fontSize: 14 }}>4</Avatar>
                    </Box>
                </Grid>
                <Grid item>
                <Box display="flex">
                    <Button variant="outlined" color="success" sx={{ borderRadius: '6px' }}>
                        Sync Open Trades
                    </Button>
                </Box>
                </Grid>
                <Grid item>
                <Box display="flex">
                    <Button variant="outlined" color="success" sx={{ borderRadius: '6px' }}>
                        Close Profits
                    </Button>
                </Box>
                </Grid>
                <Grid item>
                <Box display="flex">
                    <Button variant="outlined" color="error" sx={{ borderRadius: '6px' }}>
                        Close Losses
                    </Button>
                </Box>
                </Grid>
                <Grid item>
                <Box display="flex">
                    <Button variant="outlined" color="error" sx={{ borderRadius: '6px' }}>
                        Close All
                    </Button>
                </Box>
                </Grid>
            </Grid>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead sx={{ backgroundColor: '#333' }}>
                <TableRow>
                    <StyledTableCell>OPEN (GMT)</StyledTableCell>
                    <StyledTableCell>SYMBOL</StyledTableCell>
                    <StyledTableCell>POSITION</StyledTableCell>
                    <StyledTableCell>ENTRY</StyledTableCell>
                    <StyledTableCell>SIZE</StyledTableCell>
                    <StyledTableCell>TP</StyledTableCell>
                    <StyledTableCell>SL</StyledTableCell>
                    <StyledTableCell>FEES</StyledTableCell>
                    <StyledTableCell>ROI</StyledTableCell>
                    <StyledTableCell>P/L</StyledTableCell>
                    <StyledTableCell></StyledTableCell>
                    <StyledTableCell></StyledTableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                {positions.open_trades.map((position) => {
                    const { date, time } = formatDateTime(position.open_time);
                    const positionType = position.position_type.toUpperCase();
                    const positionTypeColor = positionType === 'LONG' ? 'green' : 'red';
                    const plColor = position.pl > 0 ? 'green' : 'red';
                    const roiColor = position.roi > 0 ? 'green' : 'red';
                    return (
                        <TableRow
                        key={position.order_id}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                        <StyledTableCell>
                        <Box>
                            <Typography variant="subtitle1">{date}</Typography>
                            <Typography variant="subtitle2">{time}</Typography>
                        </Box>
                        </StyledTableCell>
                        <StyledTableCell>{position.symbol}</StyledTableCell>
                        <StyledTableCell sx={{ color: positionTypeColor }}>{positionType}</StyledTableCell>
                        <StyledTableCell>{position.entry}</StyledTableCell>
                        <StyledTableCell>{position.equity}</StyledTableCell>
                        <StyledTableCell>{position.tp || '-'}</StyledTableCell>
                        <StyledTableCell>{position.sl || '-'}</StyledTableCell>
                        <StyledTableCell>${position.fees}</StyledTableCell>
                        <StyledTableCell sx={{color: roiColor}}>{position.roi}%</StyledTableCell>
                        <StyledTableCell sx={{color: plColor}}>${position.pl}</StyledTableCell>
                        <StyledTableCell>
                        <IconButton>
                            <EditIcon sx={{ color: 'white' }} />
                        </IconButton>
                        </StyledTableCell>
                        <StyledTableCell>
                        <IconButton>
                            <CameraIcon sx={{ color: 'white' }} />
                        </IconButton>
                        </StyledTableCell>
                        </TableRow>
                    )
                })}
                </TableBody>
            </Table>
        </StyledTableContainer>
      </Box>)
}

export default Home; 

export const getServerSideProps: GetServerSideProps = async () => {
    try {
      const response = await axios.get('http://13.41.72.245/open_positions');
      return {
        props: {
          positions: response.data,
        },
      };
    } catch (error) {
      console.error('Error fetching open positions:', error);
      return {
        props: {
          positions: [],
        },
      };
    }
  };