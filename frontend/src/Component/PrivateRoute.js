import { useUser } from '../Context/UserContext';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const { user } = useUser();

  return user ? children : <Navigate to="/" replace />;
};

export default PrivateRoute;
