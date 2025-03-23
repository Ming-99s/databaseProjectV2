import React, { useState } from 'react';
import SelectBox from '../components/selectBox';
import { Box, Button, CircularProgress, Typography } from '@mui/material';
import NumbeCom from '../components/NumbeCom';
import useAxois from '../hook/useAxois';
import { useNavigate } from 'react-router-dom';

function Setting() {
    const navigate = useNavigate();

    const [category, setCategory] = useState("");
    const [difficulty, setDifficulty] = useState("");
    const [type, setType] = useState("");
    const [amount, setAmount] = useState("");

    function handleClick() {
        // Validate all fields before navigating
        if (!category || !difficulty || !type || !amount) {
            alert('Please select all options');
            return;
        }
        // Proceed to the next page if all fields are selected
        navigate('/question');
    }

    const { response, loading, error } = useAxois({ url: "/categories" });

    console.log(response);
    if (loading) {
        return (
            <Box mt={10}>
                <CircularProgress />
            </Box>
        );
    }

    if (error) {
        return (
            <Box mt={10}>
                <Typography variant='h3' fontWeight='bold' color='red'>
                    You are Cooked🤡
                </Typography>
                <Typography variant='p' fontSize={20} color='black'>
                    Something went Wrong
                </Typography>
            </Box>
        );
    }

    const DifficultyOp = [
        { id: 'easy', name: 'Easy' },
        { id: 'medium', name: 'Medium' },
        { id: 'hard', name: 'Hard' }
    ];

    const Type = [
        { id: "multiple", name: "Multiple Choice" },
        { id: "boolean", name: "True / False" }
    ];

    if (response) {
        return (
            <>
                <SelectBox label="Category" options={response} onChange={setCategory} />
                <SelectBox label="Difficulty" options={DifficultyOp} onChange={setDifficulty} />
                <SelectBox label="Type" options={Type} onChange={setType} />
                <NumbeCom label="Amount of Question" onChange={setAmount} />

                <Box mt={3}>
                    <Button fullWidth variant='contained' type='submit' onClick={handleClick}>Get Started</Button>
                </Box>
            </>
        );
    }
}

export default Setting;
