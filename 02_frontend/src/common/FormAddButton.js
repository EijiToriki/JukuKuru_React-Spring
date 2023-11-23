import React from 'react'
import { Box, Button } from '@mui/material'
import { handleFormAdd } from '../methods/commonProcess'

export default function FormAddButton({formCnt, setFormCnt}) {
  return (
    <Box flexDirection="row" justifyContent="flex-end" display="flex">
      <Button variant="contained" color="success" onClick={() => handleFormAdd(formCnt, setFormCnt)}>追加</Button>
    </Box>
  )
}
