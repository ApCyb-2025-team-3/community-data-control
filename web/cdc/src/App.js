import './App.css';
import { BrowserRouter as Router, Routes, Route }
    from 'react-router-dom';
import Header from './components/Header/header';
import Main from './components/Main/main';
import Teams from './components/Teams/teams';
import Groups from './components/Groups/groups';
import Mentorship from './components/Mentorship/mentorship';
import Employees from './components/Employees/employees';

function App() {
  return (
      <Router>
        <Header />
        <Routes>
          <Route exact path='/' element={<Main />} />
          <Route path='/teams' element={<Teams />} />
          <Route path='/groups' element={<Groups />} />
          <Route path='/mentorship' element={<Mentorship />} />
          <Route path='/employees' element={<Employees />} />
        </Routes> 
      </Router>
  );
}

export default App;