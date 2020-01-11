import React from 'react';
import { useRoutes } from './routes';
import { BrowserRouter as Router } from 'react-router-dom';
import { useAuth } from './hooks/auth.hook';
import { AuthContext } from './context/AuthContext';
import { Navbar } from './components/Navbar';
import 'materialize-css'
import { Loader } from './components/Loader';

function App() {
  const { token, login, logout, userId, ready } = useAuth()
  const isAuthenticated = !!token// зареган пользователь или нет, !! - привести к bool
  const routes = useRoutes(isAuthenticated)

if (!ready){
  return <Loader />
}

  return (
    <AuthContext.Provider value={{
      token, login, logout, userId, isAuthenticated
    }}>
      <Router>
        <div className="App">
          {isAuthenticated && <Navbar />}
          <div className="container">
            {routes}
          </div>
        </div>
      </Router>
    </AuthContext.Provider>

  );
}

export default App;
