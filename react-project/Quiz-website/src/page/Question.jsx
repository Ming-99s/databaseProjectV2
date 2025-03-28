import { Box, Typography, Button, CircularProgress, Grid } from "@mui/material";
import useAxois from "../hook/useAxois";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { handleScoreChange } from "../redux/action";

const getRandomInt = (max) => {
  return Math.floor(Math.random() * max); // Correcting the random logic
};

const backgroundColorBox =[
  '#F04F40' , '#3C99D7' ,'#5CBF88' ,'#F9D82E'
]



function Question() {
  const navigator = useNavigate();
  const dispatch = useDispatch();

  const {
    Question_category,
    Question_difficulty,
    Question_type,
    amount_of_Question,
    score,
  } = useSelector((state) => state);

  let apiUrl =
    amount_of_Question &&
    Question_category &&
    Question_difficulty &&
    Question_type
      ? `/question?amount=${amount_of_Question}&category=${Question_category}&difficulty=${Question_difficulty}&type=${Question_type}`
      : null;

  if (!apiUrl) {
    return (
      <Box mt={3}>
        <Typography fontWeight="bold" color="red">
          Please fill all the filters to fetch questions.
        </Typography>
      </Box>
    );
  }

  const { response, loading, error } = useAxois({ url: apiUrl });
  const [indexQuestion, setQIndex] = useState(0);
  const [options, setOption] = useState([]);

  const handleNextQ = (e) => {
    const question = response[indexQuestion];
    const userAnswer = e.target.textContent.trim();
    const correctAnswer = question.correct_answer.trim();

    // Check if user answer is correct
    if (userAnswer === correctAnswer) {
      dispatch(handleScoreChange(score + 1));
    }

    if (indexQuestion + 1 < response.length) {
      setQIndex(indexQuestion + 1);
    } else {
      navigator("/Result");
    }
  };

  useEffect(() => {
    if (response?.length) {
      const question = response[indexQuestion];

      // Clean and properly format the incorrect answers
      let incorrectAnswers = question.incorrect_answers
        .replace(/\[|\]/g, '') // Remove square brackets
        .split(',') // Split by commas
        .map((answer) => answer.replace(/"/g, '').trim()) // Clean quotes and trim spaces
        .filter((answer) => answer !== ''); // Filter out any empty answers

      // Ensure we have 3 incorrect answers (adjust if needed)
      let answer = [...incorrectAnswers];

      // Randomly insert the correct answer into the options
      const randomIndex = getRandomInt(answer.length + 1);
      answer.splice(randomIndex, 0, question.correct_answer);

      setOption(answer); // Set the final list of options correctly as an array of strings
    }
  }, [response, indexQuestion]);

  // Error and loading handling
  if (loading) {
    return (
      <Box mt={5}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box mt={5}>
        <Typography color="red" fontWeight="bold">
          Error loading questions, please try again later.
        </Typography>
      </Box>
    );
  }

  if (response && response.length === 0) {
    return (
      <Box mt={3}>
        <Typography fontWeight="bold" color="red">
          No questions found for the selected filters.
        </Typography>
      </Box>
    );
  }


  return (

    <Box>
      <Typography variant="h3" mt={3} fontWeight='bold'>Question {indexQuestion + 1}</Typography>
      <Typography mt={5} variant="h6" textAlign='center' fontSize={25}>{response[indexQuestion].question}</Typography>
      
      {/* Grid2 container for two buttons per row */}
      <Grid 
  container 
  spacing={2} 
  mt={2} 
  sx={{ 
    display: "grid", 
    gridTemplateColumns: "repeat(2, 1fr)", // Ensures two columns
    gap: 2, // Adds spacing between items
  }}
>
  {options.map((option, index) => (
    <Button
      key={index}
      onClick={handleNextQ}
      variant="contained"
      sx={{
        py: 2,
        backgroundColor: backgroundColorBox[index % backgroundColorBox.length], // Cycling colors
      }}
    >
      {option}
    </Button>
  ))}
</Grid>


      
      <Box mt={4}>
        <Typography fontWeight='bold'>
          Score: {score}/{response.length}
        </Typography>
      </Box>
    </Box>
    
  );
}

export default Question;
