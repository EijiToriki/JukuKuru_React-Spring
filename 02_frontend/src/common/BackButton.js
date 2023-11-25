import React from 'react'
import { Box, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function BackButton() {
  const navigate = useNavigate()

  const backTopPage = () =>{
    navigate("/menu")  
  }

  return (
    <Box flexDirection="row" justifyContent="flex-end" display="flex">
      <Button variant="contained" color="inherit" onClick={backTopPage}>戻る</Button>
    </Box>
  )
}
