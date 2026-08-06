import { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Spinner } from 'react-bootstrap';
import { useCart } from '../context/CartContext';

function Catalog() {
  const [firmwares, setFirmwares] = useState([]);
  const [loading, setLoading] = useState(true);

  const { addToCart, isAdded, markAsAdded } = useCart();

  useEffect(() => {
    fetch('/api/firmwares')
      .then((res) => res.json())
      .then((data) => {
        setFirmwares(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const handleAddToCart = (firmware) => {
    addToCart(firmware);
    markAsAdded(firmware.id);
  };

  if (loading) {
    return (
      <Container className="text-center mt-5">
        <Spinner animation="border" variant="primary" />
        <p>Загрузка прошивок...</p>
      </Container>
    );
  }

  return (
    <Container className="mt-4">
      <h2 className="mb-4">📦 Каталог прошивок</h2>
      <Row>
        {firmwares.map((firmware) => {
          const added = isAdded(firmware.id);

          return (
            <Col key={firmware.id} md={4} className="mb-4">
              <Card className="h-100 shadow-sm">
                <Card.Body className="d-flex flex-column">
                  <Card.Title>{firmware.name}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">
                    {firmware.car}
                  </Card.Subtitle>
                  <Card.Text>
                    <strong>Двигатель:</strong> {firmware.engine}
                    <br />
                    <strong>Прирост:</strong> {firmware.power}
                  </Card.Text>
                  <Card.Text className="text-muted small">
                    {firmware.description}
                  </Card.Text>
                  <h5 className="text-primary">{firmware.price} ₽</h5>

                  <Button
                    variant={added ? 'secondary' : 'success'}
                    className="w-100 mt-auto"
                    onClick={() => handleAddToCart(firmware)}
                    disabled={added}
                  >
                    {added ? '✅ Добавлено!' : '🛒 Добавить в корзину'}
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          );
        })}
      </Row>
    </Container>
  );
}

export default Catalog;