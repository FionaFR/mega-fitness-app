import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import PropTypes from 'prop-types';
import { navTheme } from '../StyleSheet';
import { container } from '../store/reducers/User';
import { authService } from '../Firebase';
import LoggedInStack from './LoggedInStack';
import LoggedOutStack from './LoggedOutStack';

function Navigation({ user, storeLogin }): JSX.Element {
  React.useEffect(() => {
    const unsubscribe = authService.getCurrentUser(
      (receivedUser: { uid: string; email: string }) => {
        if (receivedUser) {
          storeLogin(receivedUser);
        }
      }
    );
    return unsubscribe;
  }, [storeLogin]);

  return (
    <NavigationContainer theme={navTheme}>
      {user.uid ? <LoggedInStack /> : <LoggedOutStack />}
    </NavigationContainer>
  );
}

Navigation.propTypes = {
  user: PropTypes.shape({
    uid: PropTypes.string,
    email: PropTypes.string,
  }).isRequired,
  storeLogin: PropTypes.func.isRequired,
};

export default container(Navigation);
