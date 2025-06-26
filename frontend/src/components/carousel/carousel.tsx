import React from 'react';
import { Carousel, Row, Col, Card, Button } from 'react-bootstrap';

export interface CardItem {
  id: number;
  title: string;
  text: string;
  imgSrc?: string;
}

// Props for the CardCarousel component
interface CardCarouselProps {
  items: CardItem[];
}

export default function CardCarousel(props : CardCarouselProps) {
  const n = props.items.length;

  if (n === 0) {
    return null;
  }

  return (
    <Carousel indicators={false} interval={3000} wrap>
      {props.items.map((_, i) => (
        <Carousel.Item key={i}>
          <Row className="justify-content-center">
            {[0, 1, 2].map((offset) => {
              const index = (i + offset) % n;
              const item = props.items[index];
              return (
                <Col key={item.id} md={4} className="d-flex align-items-stretch">
                  <Card className="mb-3">
                    {item.imgSrc && (
                      <Card.Img variant="top" src={item.imgSrc} alt={item.title} />
                    )}
                    <Card.Body>
                      <Card.Title>{item.title}</Card.Title>
                      <Card.Text>{item.text}</Card.Text>
                      <Button variant="primary">Go</Button>
                    </Card.Body>
                  </Card>
                </Col>
              );
            })}
          </Row>
        </Carousel.Item>
      ))}
    </Carousel>
  );
}