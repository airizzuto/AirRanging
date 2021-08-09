import { Redirect, Route, RouteProps } from 'react-router';
import { isUserAuthenticated } from '../helpers/tokenHelper';

export type ProtectedRouteProps = {
  authenticationPath: string;
} & RouteProps;

export default function ProtectedRoute({ authenticationPath, ...routeProps }: ProtectedRouteProps) {
  if(isUserAuthenticated()) {
    return <Route {...routeProps} />;
  } else {
    return <Redirect to={{ pathname: authenticationPath }} />;
  }
}
