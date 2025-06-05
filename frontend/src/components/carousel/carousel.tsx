import { Carousel } from 'react-bootstrap';
import { CSSProperties, JSX } from 'react';
import './carousel.scss';

interface data {
    id : number,
    image : string,
    title : string,
    description : string
};

interface CarouselsProps {
    by : 'latest' | 'most-viewed'
    limit? : number
    style? : CSSProperties
};

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
];


export function CarouselImage(props : CarouselsProps) : JSX.Element {
    const limit : number = props.limit? props.limit : 5;
    const cd : data[] = cardsData.slice(0, limit);
    const className : string = "main-carousel" + `-${props.by}`
    return (
      <div className={className} style={props.style}>
        <Carousel controls indicators={false} interval={null}>
          {cd.map((card) => (
            <Carousel.Item key={card.id}>
              <div className="carousel-item-container">
                <div className="image-wrapper">
                  <img 
                    src={card.image} 
                    className="carousel-image"
                    alt={card.title}
                  />
                </div>
                <div className="carousel-content">
                  <div className="content-wrapper">
                    <h3>{card.title}</h3>
                    <p style={{overflow: "hidden", display: '-webkit-box', textOverflow: 'ellipsis', WebkitLineClamp: 2, WebkitBoxOrient: "vertical"}}>{card.description}</p>
                  </div>
                </div>
              </div>
            </Carousel.Item>
          ))}
        </Carousel>
      </div>
    );
}