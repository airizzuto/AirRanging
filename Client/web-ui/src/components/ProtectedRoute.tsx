import { Redirect, Route, RouteProps } from 'react-router';
import { isUserAuthenticated } from '../helpers/tokenHelper';

export type ProtectedRouteProps = {
  authenticationPath: string;
} & RouteProps;

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ authenticationPath, ...routeProps }) => {
  if(isUserAuthenticated()) {
    return <Route {...routeProps} />;
  } else {
    return <Redirect to={{ pathname: authenticationPath }} />;
  }
};

export default ProtectedRoute;
