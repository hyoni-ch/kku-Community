import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { useSelector } from "react-redux";
import firebase from "../firebase";
import "../App.css";

function Header() {

  const user = useSelector((state) => state.user);
  const navigate = useNavigate();

  const LogoutHandler = () => {
    firebase.auth().signOut();
    alert("로그아웃 되었습니다.");
    navigate("/");
  };

  return (
    <>
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">함께해요</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <NavDropdown title="커뮤니티" id="basic-nav-dropdown">
              <NavDropdown.Item as={Link} to="/commuWalk">산책해요</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/commuAsk">궁금해요</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/commuPic">추억해요</NavDropdown.Item>
            </NavDropdown>
            <Nav.Link as={Link} to="/cafe">애견동반카페</Nav.Link>
          </Nav>
        </Navbar.Collapse>

        <Navbar.Collapse className="justify-content-end">
          {user.accessToken ? (
            <Nav>
              <Navbar.Text as={Link} to="/favorite"
                style={{ cursor: 'pointer', marginRight: '10px'}}
              >
                찜
              </Navbar.Text>

              <Navbar.Text 
                style={{ cursor: 'pointer', marginRight: '10px'}}
                onClick={() => LogoutHandler()}
              >
                로그아웃
              </Navbar.Text>
            </Nav>
          ) : (
            <Link
              to="/login"
              style={{
                marginTop: '7px',
                color: 'gray',
              }}
            >
              로그인
            </Link>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
    
    </>
    
  );
}

export default Header;