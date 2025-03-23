import React from 'react'
import { FormControl, Select,Box,MenuItem,InputLabel } from '@mui/material'

function QuizSelect(props) {
  return (
    <Box mt={2}>
        <FormControl size='small' fullWidth>
            <InputLabel>{props.label}</InputLabel>
                <Select value={props.value} label={props.label} >
                    {props.options.map(({id,name})=>(
                        <MenuItem value={id} key={id}>{name}</MenuItem>
                    ))}
                </Select>

        </FormControl>
    </Box>
  )
}

export default QuizSelect