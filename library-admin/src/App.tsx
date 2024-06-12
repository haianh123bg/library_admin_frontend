import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { BookManagement } from './pages/bookManagement/BookManagement';
import { BorrowAndReturnBook } from './pages/borrowAndReturnBook/BorrowAndReturnBook';
import './App.css';
function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Navigate to={'/bookmanagement'} />} />
                <Route path="/bookmanagement" element={<BookManagement />} />
                <Route path="/borrowreturn" element={<BorrowAndReturnBook />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
