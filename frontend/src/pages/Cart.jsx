import { useCart } from '../context/CartContext';
import { Container, ListGroup, Button, Alert, Row, Col } from 'react-bootstrap';

function Cart() {
  const { cart, removeFromCart, clearCart } = useCart();

  if (cart.length === 0) {
    return (
      <Container className="mt-4">
        <Alert variant="info">🛒 Корзина пуста</Alert>
      </Container>
    );
  }

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <Container className="mt-4">
      <h2>🛒 Корзина</h2>
      <ListGroup>
        {cart.map((item, index) => (
          <ListGroup.Item key={index} className="d-flex justify-content-between align-items-center">
            <div>
              <strong>{item.name}</strong>
              <br />
              <small className="text-muted">{item.car}</small>
            </div>
            <div>
              <span className="fw-bold me-3">{item.price} ₽</span>
              <Button 
                variant="danger" 
                size="sm"
                onClick={() => removeFromCart(item.id)}
              >
                Удалить
              </Button>
            </div>
          </ListGroup.Item>
        ))}
      </ListGroup>

      <Row className="mt-4">
        <Col>
          <h4>Итого: {total} ₽</h4>
        </Col>
        <Col className="text-end">
          <Button variant="outline-danger" onClick={clearCart}>
            Очистить корзину
          </Button>
        </Col>
      </Row>
    </Container>
  );
}

export default Cart;