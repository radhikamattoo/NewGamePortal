import {
  Redirect,
  Route,
  RouteComponentProps,
  RouteProps
} from 'react-router-dom';
import * as React from 'react';
import { store } from '../stores/index';

type RouteComponent =
  | React.StatelessComponent<RouteComponentProps<{}>>
  | React.ComponentClass<{}>;

// TODO: Add a login route that shows login screen
const PrivateRoute: React.StatelessComponent<RouteProps> = ({
  component,
  ...rest
}) => {
  const renderFn = (Component?: RouteComponent) => (props: RouteProps) => {
    if (!Component) {
      return null;
    }

    if (store.getState().myUser.myUserId.length > 0) {
      return <Component {...props} />;
    }

    const redirectProps = {
      to: {
        pathname: '/login',
        state: { from: props.location }
      }
    };

    return <Redirect {...redirectProps} />;
  };

  return <Route {...rest} render={renderFn(component)} />;
};

export default PrivateRoute;
