import { BrowserRouter, Link, Switch } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Signup from "./Components/Signup";
import Login from "./Components/Login";
import { Container, Nav, Navbar } from "react-bootstrap";
import Dashboard from "./Components/Dashboard";
import PrivateRoute from "./Components/Routes/privateRoute";
import PublicRoute from "./Components/Routes/publicRoute";
import Logout from "./Components/Logout";
import { useSelector } from "react-redux";
import { Redirect } from "react-router";

function App() {
  const token = useSelector((state) => state.Users.token);
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar bg="dark" variant="dark">
          <Container>
            <Navbar.Brand as={Link} to="/">
              React App
            </Navbar.Brand>
            <Nav className="me-auto">
              {token ? (
                <>
                  <Nav.Link as={Link} to="/">
                    Welcome
                  </Nav.Link>
                  <Nav.Link as={Link} to="/logout">
                    Logout
                  </Nav.Link>
                </>
              ) : (
                <>
                  <Nav.Link as={Link} to="/login">
                    Login
                  </Nav.Link>
                  <Nav.Link as={Link} to="/signup">
                    Signup
                  </Nav.Link>
                </>
              )}
            </Nav>
          </Container>
        </Navbar>

        <Switch>
          <PrivateRoute component={Logout} exact path="/logout" />
          <PrivateRoute component={Dashboard} exact path="/welcome" />
          <PrivateRoute exact path="/">
            <Redirect to="/welcome" />
          </PrivateRoute>
          <PublicRoute component={Signup} exact path="/signup" />
          <PublicRoute component={Login} exact path="/login" />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
