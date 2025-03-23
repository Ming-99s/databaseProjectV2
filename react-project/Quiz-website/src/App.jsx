import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './page/Home';
import Setting from './page/Setting';
import Login from './page/Login';
import SignUp from './page/SignUp';
import Result from './page/Result';
import Question from './page/Question';
import { Container, Typography ,Box} from '@mui/material';
import CreateQuiz from './page/CreateQuiz';
import AdminDashboard from './page/AdminDashboard';

function App() {
  return (
    <>
    <BrowserRouter>
      <Container maxWidth= 'sm' >
        <Box textAlign='center' width='100%'>
          <Routes>
          <Route path="/" element={<Home />} />
          <Route path='/setting' element={
            <>
              <Typography variant='h2' fontWeight="bold">Quiz app</Typography>
              <Setting></Setting>
            </>}></Route>
            <Route path="/login" element={<Login />} />
            <Route path="/createquiz" element={<CreateQuiz />} />
            <Route path="/admin" element={<AdminDashboard />} />


            <Route path="/signup" element={<SignUp />} />
            <Route path="/result" element={<Result />} />
            <Route path="/question" element={<Question />} />
          </Routes>
        </Box>
      </Container>
      
    </BrowserRouter>
    </>

  );
}

export default App;
