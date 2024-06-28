import { Route, Routes } from 'react-router-dom';
import Login from './Pages/Login/Login';
import Signup from './Pages/Signup/Signup';
import Chart from './Pages/Chart/Chart';
import PageNotFound from './Pages/PageNotFound/PageNotFound';
import Home from './Pages/Home/Home';
function App() {
  const user = localStorage.getItem("token")
  return (
    <div className="">
      <Routes>
        <Route exact path='/' element={<Home />} />
        {!user && <Route exact path='/login' element={<Login />} />}
        {user && <Route exact path='/signup' element={<Signup />} />}
        {user && <Route exact path='/chart' element={<Chart />} />}
        <Route exact path='*' element={<PageNotFound />} />
      </Routes>
    </div>
  );
}

export default App;
