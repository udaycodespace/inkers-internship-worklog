// Final Task Management Implementation
import { useSelector, useDispatch } from 'react-redux';
import { login, logout } from './features/auth/authSlice';
import Tasks from './components/Tasks';

function App() {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>Task Management App</h1>
      
      {!isAuthenticated ? (
        <div>
          <p>Please log in to manage tasks.</p>
          <button onClick={() => dispatch(login({ name: 'Uday' }))}>
            Login
          </button>
        </div>
      ) : (
        <div>
          <div style={{ marginBottom: '20px', borderBottom: '1px solid #ccc', pb: '10px' }}>
            <span>Welcome, <strong>{user.name}</strong>! </span>
            <button onClick={() => dispatch(logout())}>Logout</button>
          </div>
          <Tasks />
        </div>
      )}
    </div>
  );
}

export default App;