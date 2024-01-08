import React, { useState } from 'react'
import { Alert, Button, Grid, Paper, TextField } from '@mui/material'
import { baseURL } from '../common/Constants'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { login } from '../redux/authorizeSlice'

export default function Login() {
  const [alertFlag, setAlertFlag] = useState(false)
  const [loginId, setLoginId] = useState("")
  const [password, setPassowrd] = useState("")
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleId = (event) => {
    setLoginId(event.target.value)
  }

  const handlePassword = (event) => {
    setPassowrd(event.target.value)
  }

  const handleLogin = async() => {
    const params = {
      "login_id": loginId,
      "password": password
    }
    
    try{
      const res = await axios.get(baseURL + "getStudentInfo", {
        params
      })
      if(res.data){
        const action = login(res.data)
        dispatch(action)
        navigate("/menu")
      }else{
        setAlertFlag(true)
      }
    }catch(error){
      return -1
    }
  }

  return (
    <>
      {
      alertFlag ? 
        <Alert severity="warning" onClose={() => {setAlertFlag(false)}} width='80%'>
          IDもしくはパスワードが誤っています。
        </Alert>
      :
        <></>
      }
      <Grid container spacing={2} width="50%" margin="auto" justifyContent="center">
        <Paper style={{ width: '100%', padding: '5%', marginTop: '10%' }}>
          <Grid textAlign="center" fontSize="20px" fontWeight="bold">
            ログイン
          </Grid>
          <Grid textAlign="center" marginTop="2%" >
            <TextField id="outlined-basic" label="ID" variant="outlined" onChange={handleId} />
          </Grid>
          <Grid textAlign="center" marginTop="2%" >
            <TextField id="outlined-basic" label="パスワード" variant="outlined" type='password' onChange={handlePassword} />
          </Grid>
          <Grid textAlign="center" marginTop="2%" >
            <Button variant="contained" onClick={handleLogin}>ログイン</Button>
          </Grid>
        </Paper>
      </Grid>
    </>
  )
}
