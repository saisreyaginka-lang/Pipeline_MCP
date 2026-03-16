import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../redux/userSlice';
import { useNavigate } from 'react-router-dom';

function Home() {
  const user = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Redirect guests back to login
  useEffect(() => {
    if (!user) {
      navigate('/', { replace: true });
    }
  }, [user, navigate]);

  const handleLogout = () => {
    dispatch(logout());   // clear Redux state
    navigate('/', { replace: true }); // force redirect
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Welcome {user ? user.name : "Guest"}!</h2>
        {user && (
          <button 
            className="btn btn-danger w-100 mt-3 rounded-0"
            onClick={handleLogout}
          >
            Logout
          </button>
        )}
      </div>
    </div>
  );
}

export default Home;
