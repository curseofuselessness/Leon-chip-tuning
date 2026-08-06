import { Link } from 'react-router-dom';
import { Navbar, Nav, Container } from 'react-bootstrap';

function Header() {
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">🚗 Firmware Shop</Navbar.Brand>
        <Nav className="ms-auto">
          <Nav.Link as={Link} to="/">Каталог</Nav.Link>
          <Nav.Link as={Link} to="/cart">🛒 Корзина</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
}

export default Header;