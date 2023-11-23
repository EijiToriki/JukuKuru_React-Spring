import React from 'react'
import { Box, Button } from '@mui/material'

export default function BusinessImplButton({businessFunction, buttonStr}) {
  return (
    <Box flexDirection="row" justifyContent="flex-end" display="flex">
      <Button variant="contained" color="primary" onClick={businessFunction}>{buttonStr}</Button>
    </Box>
  )
}
