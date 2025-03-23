import { FormControl, TextField,Box } from '@mui/material'
import React,{useState} from 'react'
import { useDispatch } from 'react-redux'
import { handleAmountChange } from '../redux/action';

function NumbeCom(props) {
    const dispatch = useDispatch();
    const [value, setValue] = useState("");

    const handleChange = (e) =>{
        dispatch(handleAmountChange(e.target.value))
        setValue(e.target.value);

        console.log(e.target.value)
        props.onChange(e.target.value);
    }
    
  return (
    <Box mt={2}>
        <FormControl fullWidth>
            <TextField
                onChange={handleChange}
                variant='outlined'
                value={value}
                label={props.label}
                type="number"
                size="small"
            />
                
        </FormControl>
    </Box>
  )
}

export default NumbeCom