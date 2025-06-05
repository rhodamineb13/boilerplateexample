import { JSX } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Card } from "react-bootstrap";
import "./cards.scss";
import { NavigateFunction, useNavigate } from "react-router-dom";

interface data {
    id : number,
    image : string,
    title : string,
    description : string
}

interface CardProps {
  display : 'latest' | 'most-viewed' | undefined
}

const cardsData : data[] = [
    {
      id: 1,
      image: "../public/300x250.jpg",
      title: "Card 1",
      description: "aspogjas jagjaioj aiogjiaogjiaogjiaogjoaijgoaij oagjoaj osaigj asoij oasj saiojiaojiaoj saioj gasiogjfasofa jaoij io asfasaiihaiuhauih gaiu ghaiqgh aig haiug haih idasdas",
    },
    {
      id: 2,
      image: "../public/300x250.jpg",
      title: "Card 2",
      description: "This is the description for card 2"
    },
    {
      id: 3,
      image: "../public/300x250.jpg",
      title: "Card 3",
      description: "This is the description for card 3"
    },
    {
      id: 4,
      image: "../public/300x250.jpg",
      title: "Card 4",
      description: "This is the description for card 5"
    },
    {
      id: 5,
      image: "../public/300x250.jpg",
      title: "Card 4",
      description: "This is the description for card 5"
    },
    {
      id: 5,
      image: "../public/300x250.jpg",
      title: "Card 4",
      description: "This is the description for card 5"
    },
    {
      id: 5,
      image: "../public/300x250.jpg",
      title: "Card 4",
      description: "This is the description for card 5"
    },
    {
      id: 5,
      image: "../public/300x250.jpg",
      title: "Card 4",
      description: "This is the description for card 5"
    },
    {
      id: 5,
      image: "../public/300x250.jpg",
      title: "Card 4",
      description: "This is the description for card 5"
    },
  ];

export default function Cards(props : CardProps) : JSX.Element {
  const navigate : NavigateFunction = useNavigate();
  const cd : data[] = props.display ? cardsData.slice(0, 5) : cardsData;
  
  return (
    <>
    <div className="cards-main-title">
          <h2>{props.display === 'latest' ? "Latest Items" : "Most Viewed Items"}</h2>
    </div>
    <div className="cards-container" style={{display: 'flex', marginBottom: '60px'}}>
      {cd.map(card => (
          <Card
        key={card.id}
        className="shadow" 
        style={{
          margin: "auto",
          height: "300px",
          width: "220px", // Add fixed width
          cursor: "pointer"
        }}
        onClick={() => navigate(`/products/${encodeURIComponent(card.id)}`)}
      >
        <Card.Img 
          src={card.image} 
          variant="top" 
          style={{
            width: "100%",
            height: "160px", // Fixed height for images
            objectFit: "fill",
            objectPosition: "center center"
          }}
        />
        <Card.Body style={{
          padding: "1rem",
          height: "calc(100% - 160px)", // Remaining space after image
          display: "flex",
          flexDirection: "column",
          justifyContent: 'flex-start', // Changed from space-between
          gap: '0.3rem' // Directly controls space between title and text
        }}>
          <Card.Title style={{ 
            overflow: "hidden",
            textOverflow: "ellipsis",
            display: "-webkit-box",
            WebkitLineClamp: "2",
            WebkitBoxOrient: "vertical",
            marginBottom: "0.2rem",  // Reduced from 0.5rem
            lineHeight: "1.3",       // Tighter line spacing
            marginTop: "0"           // Remove default top margin
          }}>
            {card.title}
          </Card.Title>
          <Card.Text style={{
             overflow: "hidden",
             display: "-webkit-box",
             textOverflow: "ellipsis",
             WebkitLineClamp: "3",
             WebkitBoxOrient: "vertical",
             marginTop: "0",          // Remove default top margin
             lineHeight: "1.4",       // Slightly looser than title
             marginBottom: "0"        // Remove default bottom margin
          }}>
            {card.description}
          </Card.Text>
        </Card.Body>
      </Card>
        ))}
    </div>
    </>
  )
};