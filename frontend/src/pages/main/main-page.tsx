import { JSX} from 'react';
import './main-page.scss'; // Assuming you have a CSS file for styling
import { Carousel} from 'react-bootstrap';
import tanks from '../../assets/tanks.png'



export default function MainPage(): JSX.Element {
  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', padding: '20px' }}>
      <h1 style={{ margin: '20px auto', textAlign: 'center' }}>MAIN PAGE</h1>
      
      <div className="carousel-news" style={{ marginTop: '40px' }}>
        <div className="carousel-news-title" style={{ 
          marginBottom: '20px', 
          borderBottom: '2px solid #e0e0e0',
          paddingBottom: '10px'
        }}>
          <span style={{ 
            fontSize: '24px', 
            fontWeight: 'bold',
            color: '#2c3e50'
          }}>Latest News</span>
        </div>
        
        <div className="carousel-news-contents">
          <Carousel 
            style={{ 
              borderRadius: '10px', 
              overflow: 'hidden',
              boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
            }}
          >
            {/* Image Slide 1 with Caption */}
            <Carousel.Item style={{ height: '400px' }}>
              <div style={{ 
                position: 'relative', 
                height: '100%',
                width: '100%'
              }}>
                <img 
                  src={tanks} 
                  alt="Military tanks"
                  style={{ 
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    display: 'block'
                  }}
                />
                <div style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  backgroundColor: 'rgba(0, 0, 0, 0.7)',
                  color: 'white',
                  padding: '15px',
                  textAlign: 'left'
                }}>
                  <h3>Military Parade</h3>
                  <p>Annual military parade showcases latest defense technology</p>
                </div>
              </div>
            </Carousel.Item>
            
            {/* Image Slide 2 with Caption */}
            <Carousel.Item style={{ height: '400px' }}>
              <div style={{ 
                position: 'relative', 
                height: '100%',
                width: '100%'
              }}>
                <img 
                  src={tanks} 
                  alt="Mountain landscape"
                  style={{ 
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    display: 'block'
                  }}
                />
                <div style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  backgroundColor: 'rgba(0, 0, 0, 0.7)',
                  color: 'white',
                  padding: '15px',
                  textAlign: 'left'
                }}>
                  <h3>Mountain Expedition</h3>
                  <p>Adventure team completes record-breaking mountain climb</p>
                </div>
              </div>
            </Carousel.Item>
            
            {/* Image Slide 3 with Caption */}
            <Carousel.Item style={{ height: '400px' }}>
              <div style={{ 
                position: 'relative', 
                height: '100%',
                width: '100%'
              }}>
                <img 
                  src={tanks} 
                  alt="Ocean view"
                  style={{ 
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    display: 'block'
                  }}
                />
                <div style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  backgroundColor: 'rgba(0, 0, 0, 0.7)',
                  color: 'white',
                  padding: '15px',
                  textAlign: 'left'
                }}>
                  <h3>Ocean Conservation</h3>
                  <p>New initiative to protect marine ecosystems launched</p>
                </div>
              </div>
            </Carousel.Item>
          </Carousel>
        </div>
      </div>
      
      <div style={{ marginTop: '40px', textAlign: 'center', color: '#7f8c8d' }}>
        <p>Scroll down for more news and updates</p>
        <div style={{ fontSize: '24px' }}>↓</div>
      </div>
    </div>
  );
}