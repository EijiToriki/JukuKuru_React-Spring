import React, { useState } from 'react'
import { Button, Grid, Paper, TextField } from '@mui/material'
import { baseURL } from '../common/Constants'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export default function Login() {
  const [loginId, setLoginId] = useState("")
  const [password, setPassowrd] = useState("")
  const navigate = useNavigate()

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
        localStorage.setItem("studentId", res.data.id)
        localStorage.setItem("teacherId", res.data.teacher_id)
        localStorage.setItem("classroomId", res.data.classroom_id)
        localStorage.setItem("name", res.data.name)
        localStorage.setItem("registerFlag", res.data.register_flag)
        navigate("/menu")
      }else{
        console.log("ログイン失敗")
      }
    }catch(error){
      return -1
    }
  }

  return (
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
  )
}
