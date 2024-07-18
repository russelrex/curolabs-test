import React, { useEffect, useState } from 'react';
import { Box, Button, Grid, ButtonGroup } from '@mui/material';
import {
  LineChart as RechartsLineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  AreaChart,
  Legend,
  Area
} from 'recharts';
import './chart.css';

const data = [
    {
      name: 'Jan 21',
      uv: 15000,
      pv: 2400,
      amt: 2400,
    },
    {
      name: 'Jan 22',
      uv: 3000,
      pv: 1398,
      amt: 2210,
    },
    {
      name: 'Jan 23',
      uv: 2000,
      pv: 9800,
      amt: 2290,
    },
    {
      name: 'Jan 24',
      uv: 2780,
      pv: 3908,
      amt: 2000,
    },
    {
      name: 'Jan 25',
      uv: 1890,
      pv: 4800,
      amt: 2181,
    },
    {
      name: 'Jan 26',
      uv: 2390,
      pv: 3800,
      amt: 2500,
    },
    {
      name: 'Jan 27',
      uv: 3490,
      pv: 4300,
      amt: 2100,
    },
  ];

const ChartComponent = () => {

  const [isClient, setIsClient] = useState(false);
  const [selectedButton, setSelectedButton] = useState<string | null>(null);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  const formatDollar = (tickItem: any) => {
    return `$${tickItem}`;
  };

  const handleButtonClick = (button: string) => {
    setSelectedButton(button);
  };

  return (
    <Box
        my={4}
        display="flex"
        alignItems="center"
        gap={4}
        p={2}
    >
    <Grid container spacing={5}>
        <Grid item>
          <ButtonGroup disableElevation variant="contained" aria-label="Disabled button group">
            <Button
              onClick={() => handleButtonClick('balance')}
              sx={{
                bgcolor: selectedButton === 'balance' ? 'grey.500' : '#252223',
                '&:hover': { bgcolor: selectedButton === 'balance' ? 'grey.700' : '#4F494C' },
                color: selectedButton === 'balance' ? 'white' : 'white',
              }}
            >
              Balance
            </Button>
            <Button
              onClick={() => handleButtonClick('dailyPL')}
              sx={{
                bgcolor: selectedButton === 'dailyPL' ? 'grey.500' : '#252223',
                '&:hover': { bgcolor: selectedButton === 'dailyPL' ? 'grey.700' : '#4F494C' },
                color: selectedButton === 'dailyPL' ? 'white' : 'white',
              }}
            >
              Daily PL
            </Button>
          </ButtonGroup>
        </Grid>
        <Grid item>
            <AreaChart
                width={1200}
                height={400}
                data={data}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
                <defs>
                <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="70%" stopColor="#B93876" stopOpacity={1} />
                    <stop offset="100%" stopColor="#B93876" stopOpacity={0} />
                </linearGradient>
                </defs>
                <CartesianGrid stroke="#ccc" strokeDasharray="0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} />
                <YAxis tickFormatter={formatDollar} axisLine={false} tickLine={false} />
                <Tooltip formatter={(value) => `$${value}`} />
                <Area type="monotone" dataKey="pv" stroke="none" fill="url(#colorPv)" />
            </AreaChart>
        </Grid>
    </Grid>
        
    </Box>
  );
};

export default ChartComponent;