import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Contact } from './pages/Contact';
import { Login } from './pages/Login';
import { Dashboard } from './pages/Dashboard';
import { ChicoBotDashboard } from './pages/ChicoBotDashboard';
import { ApiTester } from './pages/ApiTester';

function App() {
  return (
    <Router>
      <div className="min-h-screen">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/chicobot" element={<ChicoBotDashboard />} />
            <Route path="/api-tester" element={<ApiTester />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
