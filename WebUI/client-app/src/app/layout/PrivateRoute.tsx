import React, { useContext } from 'react';
import {
  RouteProps,
  RouteComponentProps,
  Route,
  Redirect,
} from 'react-router-dom';
import { RootStoreContext } from '../stores/rootStore';
import { observer } from 'mobx-react-lite';

interface IProps extends RouteProps {
  component: React.ComponentType<RouteComponentProps<any>>;
  client?: boolean;
  user?: boolean;
}

const PrivateRoute: React.FC<IProps> = ({
  component: Component,
  client,
  user,
  ...rest
}) => {
  const rootStore = useContext(RootStoreContext);
  const { isLoggedIn, isClient } = rootStore.userStore;

  if (client)
    return (
      <Route
        {...rest}
        render={(props) =>
          isClient ? <Component {...props} /> : <Redirect to={'/'} />
        }
      />
    );

  if (user)
    return (
      <Route
        {...rest}
        render={(props) =>
          !isClient ? <Component {...props} /> : <Redirect to={'/'} />
        }
      />
    );

  return (
    <Route
      {...rest}
      render={(props) =>
        isLoggedIn ? <Component {...props} /> : <Redirect to={'/'} />
      }
    />
  );
};

export default observer(PrivateRoute);
