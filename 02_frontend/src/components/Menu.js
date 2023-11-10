import { Box, Button, Grid, Typography } from '@mui/material'
import React from 'react'
import CreateIcon from '@mui/icons-material/Create';
import SearchIcon from '@mui/icons-material/Search';
import PublishedWithChangesIcon from '@mui/icons-material/PublishedWithChanges';
import { useNavigate } from 'react-router-dom';

export default function Menu() {
  const navigate = useNavigate()

  const handleRegister = () =>{
    navigate("/register")  
  }

  const handleInquiry = () =>{
    navigate("/inquiry")  
  }

  const handleChange = () =>{
    navigate("/change")  
  }

  const handleDelete = () =>{
    navigate("/delete")  
  }


  return (
    <Grid container spacing={2} width="80%" margin="auto">
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
          <Button variant="contained" style={{width: "60%"}} size='large' onClick={handleRegister}>受講日登録画面へ</Button>
        </Box>
      </Grid>

      <Grid item xs={6}>
        <Box marginLeft="15%">
          <Button variant="contained" style={{width: "60%"}} color="success" size='large' onClick={handleInquiry}>受講日照会画面へ</Button>
        </Box>
      </Grid>


      <Grid item xs={1} marginTop="7%">
        <PublishedWithChangesIcon fontSize='large' />
      </Grid>
      <Grid item xs={11} marginTop="7%">
        <Typography fontWeight="bold" fontSize="25px">
          受講日変更 / 削除
        </Typography>
      </Grid>

      <Grid item xs={6}>
        <Box marginLeft="15%">
          <Button variant="contained" color="inherit" style={{width: "60%"}} onClick={handleChange}>受講日変更画面へ</Button>
        </Box>
        <Box marginLeft="15%" marginTop="3%">
          <Button variant="contained" color="inherit" style={{width: "60%"}} onClick={handleDelete}>受講日削除画面へ</Button>
        </Box>
      </Grid>

      <Grid item xs={6} >
        <Box marginRight="15%">

        </Box>
      </Grid>
    </Grid>
  )
}
