import { Route, Routes } from 'react-router-dom';
import Login from './Pages/Login/Login';
import Signup from './Pages/Signup/Signup';
import Chart from './Pages/Chart/Chart';
import PageNotFound from './Pages/PageNotFound/PageNotFound';
function App() {
  return (
    <div className="">
      <Routes>
        <Route exact path='/' element={<Login />} />
        <Route exact path='/signup' element={<Signup />} />
        <Route exact path='/chart' element={<Chart />} />
        <Route exact path='*' element={<PageNotFound />} />
      </Routes>
    </div>
  );
}

export default App;
