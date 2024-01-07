import { Alert, Box, Button, Grid, Typography } from '@mui/material'
import React, { useState } from 'react'
import CreateIcon from '@mui/icons-material/Create';
import SearchIcon from '@mui/icons-material/Search';
import PublishedWithChangesIcon from '@mui/icons-material/PublishedWithChanges';
import SettingsIcon from '@mui/icons-material/Settings';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../redux/authorizeSlice';

export default function Menu() {
  const [alertFlag, setAlertFlag] = useState(false)

  const navigate = useNavigate()
  const studentName = useSelector(state => state.authorize.name)
  const registerFlag = useSelector(state => state.authorize.register_flag)
  
  const handleRegister = () =>{
    navigate("/register")  
  }

  const dispatch = useDispatch()
  const handleLogout = () =>{
    const action = logout()
    dispatch(action)
    navigate("/")  
  }

  const moveFuctionScreen = (prefix) => {
    console.log(registerFlag)
    if(registerFlag ===1){
      navigate(prefix)    
    }else{
      setAlertFlag(true)
    }
  }


  return (
    <>
      {
      alertFlag ? 
        <Alert severity="warning" onClose={() => {setAlertFlag(false)}} width='80%'>
          「受講日登録画面」より、受講日の登録を行ってください。
        </Alert>
      :
        <></>
      }
      <Grid container spacing={2} width="80%" margin="auto">
        <Grid item xs={12} marginTop="2%">
          <Typography fontWeight="bold" fontSize="30px" textAlign="center">
              ようこそ！ {studentName} さん！
          </Typography>
        </Grid>
        <Grid item xs={1} marginTop="2%">
          <CreateIcon fontSize='large' />
        </Grid>
        <Grid item xs={5} marginTop="2%">
          <Typography fontWeight="bold" fontSize="25px">
            受講日登録
          </Typography>
        </Grid>

        <Grid item xs={1} marginTop="2%">
          <SearchIcon fontSize='large' />
        </Grid>
        <Grid item xs={5} marginTop="2%">
          <Typography fontWeight="bold" fontSize="25px">
            受講日照会
          </Typography>
        </Grid>

        <Grid item xs={6}>
          <Box marginLeft="15%">
            {
              registerFlag === 1 ?
                <Button variant="contained" style={{width: "60%"}} size='large' disabled>受講日登録画面へ</Button>
              :
                <Button variant="contained" style={{width: "60%"}} size='large' onClick={handleRegister}>受講日登録画面へ</Button>
            }
            
          </Box>
        </Grid>

        <Grid item xs={6}>
          <Box marginLeft="15%">
            <Button variant="contained" style={{width: "60%"}} color="success" size='large' onClick={() => moveFuctionScreen("/inquiry")}>受講日照会画面へ</Button>
          </Box>
        </Grid>


        <Grid item xs={1} marginTop="7%">
          <PublishedWithChangesIcon fontSize='large' />
        </Grid>
        <Grid item xs={5} marginTop="7%">
          <Typography fontWeight="bold" fontSize="25px">
            受講日変更 / 削除
          </Typography>
        </Grid>

        <Grid item xs={1} marginTop="7%">
          <SettingsIcon fontSize='large' />
        </Grid>
        <Grid item xs={5} marginTop="7%">
          <Typography fontWeight="bold" fontSize="25px">
            その他
          </Typography>
        </Grid>

        <Grid item xs={6}>
          <Box marginLeft="15%">
            <Button variant="contained" color="inherit" style={{width: "60%"}} onClick={() => moveFuctionScreen("/change")}>受講日変更画面へ</Button>
          </Box>
          <Box marginLeft="15%" marginTop="3%">
            <Button variant="contained" color="inherit" style={{width: "60%"}} onClick={() => moveFuctionScreen("/delete")}>受講日削除画面へ</Button>
          </Box>
        </Grid>

        <Grid item xs={6}>
          <Box marginLeft="15%">
            <Button variant="outlined" color="inherit" style={{width: "60%"}} onClick={handleLogout}>ログアウト</Button>
          </Box>
        </Grid>
      </Grid>
    </>
  )
}
