import React from 'react'
import { Button, Grid, Paper, TextField } from '@mui/material'

export default function Login() {
  return (
    <Grid container spacing={2} width="50%" margin="auto" justifyContent="center">
      <Paper style={{ width: '100%', padding: '5%', marginTop: '10%' }}>
        <Grid textAlign="center" fontSize="20px" fontWeight="bold">
          ログイン
        </Grid>
        <Grid textAlign="center" marginTop="2%" >
          <TextField id="outlined-basic" label="ID" variant="outlined" />
        </Grid>
        <Grid textAlign="center" marginTop="2%" >
          <TextField id="outlined-basic" label="パスワード" variant="outlined" type='password' />
        </Grid>
        <Grid textAlign="center" marginTop="2%" >
          <Button variant="contained">ログイン</Button>
        </Grid>
      </Paper>
    </Grid>
  )
}
