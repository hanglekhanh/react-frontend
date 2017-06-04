/*import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          Hello To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;*/
import RouteNavItem from './components/RouteNavItem';
import React, { Component } from 'react';
import {
  withRouter,
  Link
} from 'react-router-dom';
import {
  Nav,
  NavItem,
  Navbar
} from 'react-bootstrap';
import './App.css';
import Routes from './Routes';
import { CognitoUserPool, } from 'amazon-cognito-identity-js';
import config from './config.js';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userToken: null,
      isLoadingUserToken: true,
    };
  }

  handleLogout = (event) => {
    const currentUser = this.getCurrentUser();

    if (currentUser !== null) {
      currentUser.signOut();
    }

    this.updateUserToken(null);

    this.props.history.push('/login');
  }

  updateUserToken = (userToken) => {
    this.setState({
      userToken: userToken
    });
  }


  handleNavLink = (event) => {
    event.preventDefault()
    this.props.history.push(event.currentTarget.getAttribute('href'));
  }

  getCurrentUser() {
    const userPool = new CognitoUserPool({
      UserPoolId: config.cognito.USER_POOL_ID,
      ClientId: config.cognito.APP_CLIENT_ID
    });
    return userPool.getCurrentUser();
  }

  getUserToken(currentUser) {
    return new Promise((resolve, reject) => {
      currentUser.getSession(function (err, session) {
        if (err) {
          reject(err);
          return;
        }
        resolve(session.getIdToken().getJwtToken());
      });
    });
  }

  async componentDidMount() {
    const currentUser = this.getCurrentUser();

    if (currentUser === null) {
      this.setState({ isLoadingUserToken: false });
      return;
    }
    try {
      const userToken = await this.getUserToken(currentUser);
      this.updateUserToken(userToken);
    } catch (e) {
      alert(e);
    }
    this.setState({ isLoadingUserToken: false });
  }

  render() {
    const childProps = {
      userToken: this.state.userToken,
      updateUserToken: this.updateUserToken,
    };

    return ! this.isLoadingUserToken
    &&
    (
      <div className="App container">
        <Navbar fluid collapseOnSelect>
          <Navbar.Header>
            <Navbar.Brand>
              <Link to="/">Scratch</Link>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav pullRight>
              {   this.state.userToken
                ? <NavItem onClick={this.handleLogout}> logout </NavItem>
                : [<RouteNavItem key={1} onClick={this.handleNavLink} href="/signup">Signup</RouteNavItem>,
                <RouteNavItem key={2} onClick={this.handleNavLink} href="/login">Login</RouteNavItem>
                ]}
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <Routes childProps={childProps} />
      </div>
    );
  }
}

export default withRouter(App);