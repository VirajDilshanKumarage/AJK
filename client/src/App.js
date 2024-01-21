
import './App.css';
import { BrowserRouter as Router ,Routes, Route} from 'react-router-dom';
import Home from './Page/HomePage/Home';
import Employee from './Page/EmployeePage/Employee';
import Department from './Page/DepartmentPage/Department';
import Navigationbar from './Component/Navbar/Navigationbar';
import Loader from './Component/Loader/Loader';


function App() {
  return (

   <>
  {/* just loader  */}
   <Loader/>
   <Navigationbar/>
      <Router>
      <Routes>
         <Route path='/' element={<Home/>} />
         <Route path='/Employee' element={<Employee/>}/>
         <Route path='/Department' element={<Department/>}/>
      </Routes>
    </Router>
    
    </>
    
  );
}

export default App;


//2024/1/21