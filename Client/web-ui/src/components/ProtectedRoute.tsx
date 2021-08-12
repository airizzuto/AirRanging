import { Redirect, Route, RouteProps } from 'react-router';

export type ProtectedRouteProps = {
  isAuthenticated: any;
  authenticationPath: string;
} & RouteProps;

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ isAuthenticated, authenticationPath, ...routeProps }) => {
  console.log("Trying to access protected route...");
  
  if (isAuthenticated) {
    return <Route {...routeProps} />;
  } else {
    return <Redirect to={{ pathname: authenticationPath }} />;
  }
};

export default ProtectedRoute;
