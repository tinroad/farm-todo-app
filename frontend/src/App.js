import { Flex, Spinner } from '@chakra-ui/react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { Authenticated } from './components/Auth/Authenticated';
import { Login } from './components/Auth/Login';
import { Public } from './components/Auth/Public';
import { Register } from './components/Auth/Register';
import { Navbar } from './components/Navbar/Navbar';
import { TodoDetail } from './components/Todo/TodoDetail';
import { TodoList } from './components/Todo/TodoList';
import { AuthConsumer, AuthProvider } from './context/JWTAuthContext';

function App () {
    return (
        <>
            <AuthProvider>
                <Router>
                    <AuthConsumer>
                        {(auth) => !auth.isInitialized ? (
                            <Flex height="100vh" alignItems="center" justifyContent="center">
                                <Spinner thickness='4px' speed='0.6s' emptyColor='blue.200' color='blue.500' size='xl' />
                            </Flex>
                        ) : (
                            <Routes>
                                <Route path='/login' element={<Public><Login /></Public>} />
                                <Route path='/register' element={<Public><Register /></Public>} />
                                <Route path='/' element={<Authenticated><Navbar /></Authenticated>}>
                                    <Route path='/' element={<TodoList />} />
                                    <Route path='/:todoId' element={<TodoDetail />} />
                                </Route>
                                <Route path='*' element={<Navigate to='/' />} />
                            </Routes>
                        )}
                    </AuthConsumer>
                </Router>
            </AuthProvider>
        </>
    )
}

export default App;
