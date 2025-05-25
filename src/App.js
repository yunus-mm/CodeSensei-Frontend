import React from 'react';
import { ThemeProvider, CssBaseline } from '@mui/material';
import theme from './theme';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';


// Components
import Login from './components/Login';
import Header from './components/Header';
import Register from './components/Register';

import DashboardWithHeader from './components/Dashboard';
import Feedback from './components/Feedback';
import ComplexityAnalyzer from './components/ComplexityAnalyzer';
import Chatbot from './components/Chatbot';
import GlobalSnackbar from './components/GlobalSnackbar';
import GlobalLoader from './components/GlobalLoader';


const PrivateRoute = ({ children }) => {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    return isLoggedIn ? children : <Navigate to="/login" />;
};

function App() {
    const [snackbar, setSnackbar] = React.useState({ open: false, message: '', severity: 'info' });
    const [loading, setLoading] = React.useState(false);

    const showSnackbar = (message, severity = 'info') => {
        setSnackbar({ open: true, message, severity });
    };
    const closeSnackbar = () => setSnackbar({ ...snackbar, open: false });

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Router>
                <GlobalLoader open={loading} />
                <GlobalSnackbar open={snackbar.open} message={snackbar.message} severity={snackbar.severity} onClose={closeSnackbar} />
                <AppWithRouterLogic showSnackbar={showSnackbar} setLoading={setLoading} loading={loading} />
            </Router>
        </ThemeProvider>
    );
}

function AppWithRouterLogic({ showSnackbar, setLoading, loading }) {
    const location = useLocation();
    const hideHeader = location.pathname === '/login' || location.pathname === '/register';
    return (
        <React.Fragment>
            {!hideHeader && <Header showSnackbar={showSnackbar} />}
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route
                    path="/dashboard"
                    element={
                        <PrivateRoute>
                            <DashboardWithHeader />
                        </PrivateRoute>
                    }
                />
                <Route path="/feedback" element={<Feedback />} />
                <Route path="/complexity" element={<ComplexityAnalyzer />} />
                <Route path="/chatbot" element={<Chatbot />} />
                <Route path="*" element={<Navigate to="/login" />} />
            </Routes>
        </React.Fragment>
    );
}

export default App;
