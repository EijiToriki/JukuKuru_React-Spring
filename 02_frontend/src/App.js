import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Header from './common/Header';
import Menu from './components/Menu';
import RegisterScreen from './components/RegisterScreen';
import InquiryScreen from './components/InquiryScreen';
import ChangeScreen from './components/ChangeScreen';
import DeleteScreen from './components/DeleteScreen';
import Login from './components/Login';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route exact path="/" element={<Menu />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/register" element={<RegisterScreen />} />
        <Route exact path="/inquiry" element={<InquiryScreen />} />
        <Route exact path="/change" element={<ChangeScreen />} />
        <Route exact path="/delete" element={<DeleteScreen />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
