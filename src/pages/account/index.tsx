import Box from '@mui/material/Box';
import * as React from 'react';
import {
    TableCell,
    TableContainer,
    Typography,
    Card,
    Divider,
    Grid,
    IconButton,
    Switch,
    FormControlLabel,
    Button,
    TextField,
    Autocomplete,
    Checkbox,
    ButtonGroup,
    InputAdornment,
    FormGroup,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import axios from 'axios'
import { useCallback, useEffect, useState } from 'react'
import { GetServerSideProps } from 'next';
import { Edit as EditIcon, CameraAlt as CameraIcon, BorderAllRounded } from '@mui/icons-material';
import { Visibility, VisibilityOff, Info, AddBoxOutlined, Create, Remove, Add } from '@mui/icons-material';

interface Commission {
    asset_class: string;
    price_per_lot: number;
}

interface SymbolMapping {
    mapping: string;
    symbol: string;
}

interface TradingAccount {
    account_id: number;
    account_name: string;
    auto_be_level: number;
    balance: number;
    commissions: Commission[];
    daily_loss_limit: number;
    equity: number;
    exchange: string;
    leverage: number;
    max_lot_sizes: any[];
    one_click: boolean;
    risk: number;
    show_leaderboard: boolean;
    starting_balance: number;
    status: string;
    symbol_mappings: SymbolMapping[];
    take_profit_level: number;
}

interface DataProps {
    account: TradingAccount
}


const Account: React.FC<DataProps> = ({ account }) => {
    const [showBalance, setShowBalance] = useState(true);
    const [selectedButton, setSelectedButton] = useState<string | null>(null);
    const [valuePrice, setValuePrice] = useState(0);
    const [valueQuantity, setValueQuantity] = useState(0);

    const handleIncreasePrice = () => {
        setValuePrice(valuePrice + 1);
    };
  
    const handleDecreasePrice = () => {
        setValuePrice(valuePrice - 1);
    };

    const handleIncreaseQuantity = () => {
        setValueQuantity(valueQuantity + 1);
    };
  
    const handleDecreaseQuantity = () => {
        setValueQuantity(valueQuantity - 1);
    };

    const toggleVisibility = () => {
        setShowBalance(!showBalance);
    };

    const handleButtonClick = (button: string) => {
        setSelectedButton(button);
    };

    const IOSSwitch = styled((props) => (
        <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
      ))(({ theme }) => ({
        width: 42,
        height: 26,
        padding: 0,
        '& .MuiSwitch-switchBase': {
          padding: 0,
          margin: 2,
          transitionDuration: '300ms',
          '&.Mui-checked': {
            transform: 'translateX(16px)',
            color: '#fff',
            '& + .MuiSwitch-track': {
              backgroundColor: theme.palette.mode === 'dark' ? '#2ECA45' : '#E74694',
              opacity: 1,
              border: 0,
            },
            '&.Mui-disabled + .MuiSwitch-track': {
              opacity: 0.5,
            },
          },
          '&.Mui-focusVisible .MuiSwitch-thumb': {
            color: '#33cf4d',
            border: '6px solid #fff',
          },
          '&.Mui-disabled .MuiSwitch-thumb': {
            color:
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[600],
          },
          '&.Mui-disabled + .MuiSwitch-track': {
            opacity: theme.palette.mode === 'light' ? 0.7 : 0.3,
          },
        },
        '& .MuiSwitch-thumb': {
          boxSizing: 'border-box',
          width: 22,
          height: 22,
        },
        '& .MuiSwitch-track': {
          borderRadius: 26 / 2,
          backgroundColor: theme.palette.mode === 'light' ? '#E9E9EA' : '#E74694',
          opacity: 1,
          transition: theme.transitions.create(['background-color'], {
            duration: 500,
          }),
        },
      }));
      
    const commissionsCount = account.commissions.length
    const symbolMappingsCount = account.symbol_mappings.length
    return (
        <Grid container>
            <Grid item xs={6}>
                <Card sx={{ 
                    width: 360,
                    height: 934,
                    backgroundColor: 'black',
                    color: 'white',
                    borderColor: '#898587',
                    borderWidth: 2,
                    padding: 3,
                    borderStyle: 'solid' }}>
                    <Box display="flex" justifyContent="space-between">
                        <Box display="flex" alignItems="center">
                            <Info sx={{ marginRight: 1, color: 'white', fontSize: 20 }} />
                            <Typography>EURUSD</Typography>
                        </Box>
                        <Typography>1.06921</Typography>
                    </Box>
                    <Divider sx={{ borderColor: '#898587', marginY: 3, width: '100%' }} />
                    <Box display="flex" justifyContent="space-between">
                        <Box display="flex" alignItems="center">
                            <Typography paddingRight={2} fontWeight={'bold'}>Limit</Typography>
                            <Typography>Market</Typography>
                        </Box>
                        <Typography sx={{ fontSize: '12px', color: '#E74694' }}>Calculator</Typography>
                    </Box>
                    <Box mt={3}>
                    <ButtonGroup disableElevation variant="contained" aria-label="Disabled button group">
                        <Button
                        onClick={() => handleButtonClick('balance')}
                        sx={{
                            width: '155px',
                            bgcolor: selectedButton === 'balance' ? 'grey.500' : '#252223',
                            '&:hover': { bgcolor: selectedButton === 'balance' ? 'grey.700' : '#4F494C' },
                            color: selectedButton === 'balance' ? 'white' : 'white',
                        }}
                        >
                        <Typography sx={{ fontSize: '13px' }}>Open by Lots</Typography>
                        </Button>
                        <Button
                        onClick={() => handleButtonClick('dailyPL')}
                        sx={{
                            width: '155px',
                            bgcolor: selectedButton === 'dailyPL' ? 'grey.500' : '#252223',
                            '&:hover': { bgcolor: selectedButton === 'dailyPL' ? 'grey.700' : '#4F494C' },
                            color: selectedButton === 'dailyPL' ? 'white' : 'white',
                        }}
                        >
                        <Typography sx={{ fontSize: '13px' }}>Open by SL</Typography>
                        </Button>
                    </ButtonGroup>
                    </Box>
                    <div className='my-5'>
                        <Typography sx={{ fontSize: '12px' }}>Limit Price</Typography>
                        <Box display="flex" alignItems="center" justifyContent="center" sx={{
                        borderColor: '#898587',
                        borderWidth: 2,
                        borderRadius: 2 }}>
                        <TextField
                            value={valuePrice}
                            onChange={(e) => setValuePrice(parseInt(e.target.value))}
                            sx={{ mx: 2, input: { textAlign: 'center', color: 'white' } }}
                            InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                <IconButton onClick={handleDecreasePrice} sx={{ color: 'white' }}>
                                    <Remove />
                                </IconButton>
                                </InputAdornment>
                            ),
                            endAdornment: (
                                <InputAdornment position="end">
                                <IconButton onClick={handleIncreasePrice} sx={{ color: 'white' }}>
                                    <Add />
                                </IconButton>
                                </InputAdornment>
                            ),
                            style: { color: 'white' } 
                            }}
                            variant="outlined"
                            inputProps={{ style: { textAlign: 'center' } }}
                        />
                        </Box>
                    </div>
                    <div className='my-5'>
                        <Box display="flex" justifyContent="space-between">
                            <Typography sx={{ fontSize: '12px' }}>Quantity</Typography>
                            <Typography sx={{ fontSize: '12px' }}>$199,287.50</Typography>
                        </Box>
                        <Box display="flex" alignItems="center" justifyContent="center" sx={{
                        borderColor: '#898587',
                        borderWidth: 2,
                        borderRadius: 2 }}>
                        <TextField
                            value={valueQuantity}
                            onChange={(e) => setValueQuantity(parseInt(e.target.value))}
                            sx={{ mx: 2, input: { textAlign: 'center', color: 'white' } }}
                            InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                <IconButton onClick={handleDecreaseQuantity} sx={{ color: 'white' }}>
                                    <Remove />
                                </IconButton>
                                </InputAdornment>
                            ),
                            endAdornment: (
                                <InputAdornment position="end">
                                <IconButton onClick={handleIncreaseQuantity} sx={{ color: 'white' }}>
                                    <Add />
                                </IconButton>
                                </InputAdornment>
                            ),
                            style: { color: 'white' } 
                            }}
                            variant="outlined"
                            inputProps={{ style: { textAlign: 'center' } }}
                        />
                        </Box>
                    </div>
                    <div className='my-5'>
                        <FormGroup>
                            <FormControlLabel control={<Checkbox sx={{ color: 'grey' }} />} label="Add Set TP (Optional)" />
                            <FormControlLabel control={<Checkbox sx={{ color: 'grey' }} />} label="Add TP (Optional)" />
                        </FormGroup>
                    </div>
                    <div className='my-5'>
                        <ButtonGroup disableElevation variant="contained" aria-label="Disabled button group">
                            <Button sx={{ width: '155px' }} >
                            <Typography sx={{ fontSize: '13px' }}>1.06915</Typography>
                            </Button>
                            <Button sx={{ width: '155px' }} >
                            <Typography sx={{ fontSize: '13px', color: 'white' }}>1.06939</Typography>
                            </Button>
                        </ButtonGroup>
                    </div>
                    <div className='my-2'>
                        <Box display="flex" justifyContent="space-between">
                            <Button variant="contained" sx={{ width: '150px', backgroundColor: '#31C48D' }}>Buy / Long</Button>
                            <Button variant="contained" sx={{ width: '150px',  backgroundColor: '#F05252' }}>Sell / Short</Button>
                        </Box>
                    </div>

                    <div className='my-36'>
                    <Divider sx={{ backgroundColor: 'grey.700', marginY: 2 }} />
                    <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                        <Box display="flex" alignItems="center">
                            <Typography>
                            Account Info
                            </Typography>
                            <IconButton onClick={toggleVisibility} sx={{ color: 'white' }}>
                            {showBalance ? <Visibility /> : <VisibilityOff />}
                            </IconButton>
                        </Box>
                    </Box>
                    <Box display="flex" justifyContent="space-between">
                        <Typography sx={{color: '#898587'}}>Name:</Typography>
                        <Typography>{ showBalance ? account.account_name : '--' }</Typography>
                    </Box>
                    <Box display="flex" justifyContent="space-between">
                        <Typography sx={{color: '#898587'}}>Balance:</Typography>
                        <Typography>{ showBalance ? account.balance : '--'}</Typography>
                    </Box>
                    <Box display="flex" justifyContent="space-between">
                        <Typography sx={{color: '#898587'}}>Equity:</Typography>
                        <Typography>{ showBalance ? account.equity : '--'}</Typography>
                    </Box>
                    <Box display="flex" justifyContent="space-between">
                        <Typography sx={{color: '#898587'}}>Exchange:</Typography>
                        <Typography>{ showBalance ? account.exchange : '--'}</Typography>
                    </Box>

                    </div>
                </Card>
            </Grid>
            <Grid item xs={6}>
                <Card sx={{ 
                    width: 360,
                    height: 530,
                    backgroundColor: 'black',
                    color: 'white',
                    borderColor: '#898587',
                    borderWidth: 2,
                    padding: 3,
                    borderStyle: 'solid' }}>
                    <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                        <Box display="flex" alignItems="center">
                            <Typography>
                            Account Info
                            </Typography>
                            <IconButton onClick={toggleVisibility} sx={{ color: 'white' }}>
                            {showBalance ? <Visibility /> : <VisibilityOff />}
                            </IconButton>
                        </Box>
                    </Box>
                    <Box display="flex" justifyContent="space-between">
                        <Typography sx={{color: '#898587'}}>Name:</Typography>
                        <Typography>{ showBalance ? account.account_name : '--' }</Typography>
                    </Box>
                    <Box display="flex" justifyContent="space-between">
                        <Typography sx={{color: '#898587'}}>Balance:</Typography>
                        <Typography>{ showBalance ? account.balance : '--'}</Typography>
                    </Box>
                    <Box display="flex" justifyContent="space-between">
                        <Typography sx={{color: '#898587'}}>Equity:</Typography>
                        <Typography>{ showBalance ? account.equity : '--'}</Typography>
                    </Box>
                    <Box display="flex" justifyContent="space-between">
                        <Typography sx={{color: '#898587'}}>Exchange:</Typography>
                        <Typography>{ showBalance ? account.exchange : '--'}</Typography>
                    </Box>

                    <Divider sx={{ backgroundColor: 'grey.700', marginY: 2 }} />

                    <Box display="flex" justifyContent="space-between">
                        <Box display="flex" alignItems="center">
                            <Info sx={{ marginRight: 1, color: 'white', fontSize: 20 }} />
                            <Typography variant="body2" sx={{ color: '#898587' }}>Risk:</Typography>
                        </Box>
                        <Typography>{ showBalance ? `${account.risk}%` : '--'}</Typography>
                    </Box>
                    <Box display="flex" justifyContent="space-between">
                        <Box display="flex" alignItems="center">
                            <Info sx={{ marginRight: 1, color: 'white', fontSize: 20 }} />
                            <Typography variant="body2" sx={{ color: '#898587' }}>Daily Loss Limit:</Typography>
                        </Box>
                        <Typography>{ showBalance ? `${account.daily_loss_limit}%` : '--'}</Typography>
                    </Box>
                    <Box display="flex" justifyContent="space-between">
                        <Box display="flex" alignItems="center">
                            <Info sx={{ marginRight: 1, color: 'white', fontSize: 20 }} />
                            <Typography variant="body2" sx={{ color: '#898587' }}>Take Profit (RR):</Typography>
                        </Box>
                        <Typography>{ showBalance ? account.take_profit_level : '--'}</Typography>
                    </Box>
                    <Box display="flex" justifyContent="space-between">
                        <Box display="flex" alignItems="center">
                            <Info sx={{ marginRight: 1, color: 'white', fontSize: 20 }} />
                            <Typography variant="body2" sx={{ color: '#898587' }}>Auto BE Level (RR):</Typography>
                        </Box>
                        <Typography>{ showBalance ? account.auto_be_level : '--'}</Typography>
                    </Box>

                    <Divider sx={{ backgroundColor: 'grey.700', marginY: 2 }} />

                    <Box display="flex" justifyContent="space-between" mb={1}>
                        <Typography sx={{color: '#898587'}}>One Click Trade</Typography>
                        <FormControlLabel
                            label=""
                            control={<IOSSwitch />} />
                    </Box>
                    <Box display="flex" justifyContent="space-between">
                        <Typography sx={{color: '#898587'}}>Show Account on  Leaderboard:</Typography>
                        
                        <FormControlLabel
                            label=""
                            control={<IOSSwitch />} />
                    </Box>

                    <Divider sx={{ backgroundColor: 'grey.700', marginY: 2 }} />

                    <Box display="flex" justifyContent="space-between">
                        <Typography sx={{color: '#898587'}}>Max Lot Sizes:</Typography>
                        <AddBoxOutlined sx={{color: '#E74694'}}/>
                    </Box>
                    <Box display="flex" justifyContent="space-between">
                        <Typography sx={{color: '#898587'}}>Account Commissions:</Typography>
                        <Box display="flex" alignItems="center">
                            <Button variant="contained" size="small" sx={{ height: '20px' }}>
                                <Typography sx={{ color: '#E74694', fontSize: '15px' }}>{commissionsCount}</Typography> rules
                            </Button>
                            <Create />
                        </Box>
                    </Box>
                    <Box display="flex" justifyContent="space-between">
                        <Typography sx={{color: '#898587'}}>Symbol Mapping:</Typography>
                        <Box display="flex" alignItems="center">
                        <Button variant="contained" size="small" sx={{ height: '20px' }}>
                            <Typography sx={{ color: '#E74694', fontSize: '15px' }}>{symbolMappingsCount}</Typography> rules
                        </Button>
                        <Create />
                        </Box>
                    </Box>
                </Card>
            </Grid>
        </Grid>
    )
}

export default Account; 

export const getServerSideProps: GetServerSideProps = async () => {
    try {
      const response = await axios.get('http://13.41.72.245/account_details');
      return {
        props: {
            account: response.data,
        },
      };
    } catch (error) {
      console.error('Error fetching open accounts:', error);
      return {
        props: {
            account: {},
        },
      };
    }
  };