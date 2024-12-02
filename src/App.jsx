import { Outlet } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Footer  from './components/Footer';
import {AuthProvider} from './context/AuthContext';
function App() {
  return (
    <>
    <AuthProvider>
    <Navbar/>
    <main className='primary'>
        <Outlet></Outlet>
      </main>
      <Footer></Footer>
      </AuthProvider>
    </>
  )
}

export default App;
