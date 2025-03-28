import { Typography, Box, FormControl, TextField, Button, RadioGroup, FormControlLabel, Radio, MenuItem, Select } from '@mui/material';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function CreateQuiz() {
    const navigate = useNavigate();
    const [categories, setCategories] = useState([]);
    const [categoryId, setCategoryId] = useState('');
    const [question, setQuestion] = useState('');
    const [difficulty, setDifficulty] = useState('');
    const [type, setType] = useState('');
    const [correctAnswer, setCorrectAnswer] = useState('');
    const [incorrectAnswers, setIncorrectAnswers] = useState(["", "", ""]);
    const [error, setError] = useState('');

    // Fetch categories from the backend
    useEffect(() => {
        axios.get('http://localhost:8800/categories')
            .then(response => {
                setCategories(response.data);
            })
            .catch(error => {
                console.error('Error fetching categories:', error);
            });
    }, []);

    const handletoAdmin = () => {
        navigate('/admin');
    };

    const handleSubmit = async () => {
        // Validation: Ensure that all required fields are filled
        if (!categoryId || !question || !difficulty || !type || !correctAnswer) {
            setError('Please fill all required fields');
            return;
        }

        const quizData = {
            type,
            difficulty,
            category_id: categoryId,  // Using category ID instead of category name
            question,
            correct_answer: correctAnswer,
            incorrect_answers: type === "multiple" ? incorrectAnswers.filter(ans => ans.trim() !== '') : []
        };

        try {
            await axios.post('http://localhost:8800/add-quiz', quizData);
            alert('Quiz question added successfully!');
            
            // Clear form after submission
            setCategoryId('');
            setQuestion('');
            setDifficulty('');
            setType('');
            setCorrectAnswer('');
            setIncorrectAnswers(["", "", ""]);
            setError(''); // Clear the error message after successful submission
        } catch (error) {
            console.error('Error adding quiz:', error);
            alert('Failed to add quiz.');
        }
    };

    const DifficultyOptions = [
        { id: 'easy', name: 'Easy' },
        { id: 'medium', name: 'Medium' },
        { id: 'hard', name: 'Hard' }
    ];

    const TypeOptions = [
        { id: "multiple", name: "Multiple Choice" },
        { id: "boolean", name: "True / False" }
    ];

    return (
        <>
            <Typography variant='h3' fontWeight='bold' mt={3}>Add Quiz</Typography>

            <Box mt={2}>
                <Typography variant='h6' mt={2}>Add Question</Typography>
                <FormControl fullWidth>
                    <TextField
                        variant='outlined'
                        label='Question'
                        type="text"
                        size="small"
                        value={question}
                        onChange={(e) => setQuestion(e.target.value)}
                    />
                </FormControl>
            </Box>

            {/* Dynamic Category Dropdown */}
            <Box mt={2}>
                <FormControl fullWidth>
                    <Typography variant='h6'>Select Category</Typography>
                    <Select
                        value={categoryId}
                        onChange={(e) => setCategoryId(e.target.value)}
                        displayEmpty
                    >
                        <MenuItem value="" disabled>Select a Category</MenuItem>
                        {categories.map(category => (
                            <MenuItem key={category.id} value={category.id}>
                                {category.name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Box>

            {/* Difficulty Dropdown */}
            <Box mt={2}>
                <FormControl fullWidth>
                    <Typography variant='h6'>Select Difficulty</Typography>
                    <Select
                        value={difficulty}
                        onChange={(e) => setDifficulty(e.target.value)}
                        displayEmpty
                    >
                        <MenuItem value="" disabled>Select Difficulty</MenuItem>
                        {DifficultyOptions.map(option => (
                            <MenuItem key={option.id} value={option.id}>{option.name}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Box>

            {/* Type Dropdown */}
            <Box mt={2}>
                <FormControl fullWidth>
                    <Typography variant='h6'>Select Question Type</Typography>
                    <Select
                        value={type}
                        onChange={(e) => setType(e.target.value)}
                        displayEmpty
                    >
                        <MenuItem value="" disabled>Select Type</MenuItem>
                        {TypeOptions.map(option => (
                            <MenuItem key={option.id} value={option.id}>{option.name}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Box>

            {/* Correct & Incorrect Answers */}
            <Box mt={2}>
                {type === "boolean" ? (
                    <FormControl component="fieldset">
                        <Typography variant="h6">Select Correct Answer</Typography>
                        <RadioGroup value={correctAnswer} onChange={(e) => setCorrectAnswer(e.target.value)}>
                            <FormControlLabel value="True" control={<Radio />} label="True" />
                            <FormControlLabel value="False" control={<Radio />} label="False" />
                        </RadioGroup>
                    </FormControl>
                ) : type === "multiple" ? (
                    <>
                        <Typography variant="h6">Correct Answer</Typography>
                        <TextField
                            fullWidth
                            variant='outlined'
                            label='Correct Answer'
                            type="text"
                            size="small"
                            value={correctAnswer}
                            onChange={(e) => setCorrectAnswer(e.target.value)}
                        />

                        <Typography variant="h6" mt={2}>Incorrect Answers</Typography>
                        {incorrectAnswers.map((answer, index) => (
                            <TextField
                                key={index}
                                fullWidth
                                variant='outlined'
                                label={`Incorrect Answer ${index + 1}`}
                                type="text"
                                size="small"
                                value={answer}
                                onChange={(e) => {
                                    const newAnswers = [...incorrectAnswers];
                                    newAnswers[index] = e.target.value;
                                    setIncorrectAnswers(newAnswers);
                                }}
                                sx={{ mt: 1 }}
                            />
                        ))}
                    </>
                ) : null}
            </Box>

            {/* Error Message */}
            {error && (
                <Box mt={2}>
                    <Typography variant="body1" color="red">{error}</Typography>
                </Box>
            )}

            <Box mt={3}>
                <Button fullWidth variant='contained' onClick={handleSubmit}>Submit</Button>
            </Box>
            <Box mt={3}>
                <Button fullWidth variant='contained' onClick={handletoAdmin}>Back to Admin Dashboard</Button>
            </Box>
        </>
    );
}

export default CreateQuiz;
