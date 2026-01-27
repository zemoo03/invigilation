import { Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import StudentDashboard from './pages/StudentDashboard';
import InstitutionDashboard from './pages/InstitutionDashboard';
import AdminDashboard from './pages/AdminDashboard';
import About from './pages/About';
import Contact from './pages/Contact';

function App() {
    return (
        <Routes>
            <Route path="/" element={<MainLayout><Home /></MainLayout>} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/student/dashboard" element={<MainLayout><StudentDashboard /></MainLayout>} />
            <Route path="/center/dashboard" element={<MainLayout><InstitutionDashboard /></MainLayout>} />
            <Route path="/admin/dashboard" element={<MainLayout><AdminDashboard /></MainLayout>} />
        </Routes>
    );
}

export default App;
