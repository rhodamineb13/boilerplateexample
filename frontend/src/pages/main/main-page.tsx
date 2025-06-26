import { JSX, useState, useRef, useEffect } from 'react';
import './main-page.scss'; // Assuming you have a CSS file for styling
import { Carousel, Tab, Tabs} from 'react-bootstrap';
import tanks from '../../assets/tanks.png'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import { NewsDTO } from '../../models/dto/news_dto';
import { GetNews } from '../../api/news';
import { ConvertCurrentDateTime, ConvertToReadableFormat, DateTime } from '../../utils/date_conversion';
import NewsComponent from '../../components/news/news';


type EventKey = string | number;


export default function MainPage(): JSX.Element {
  const [activeTab, setActiveTab] = useState<EventKey | undefined>('news');
  const [dateTime, setDateTime] = useState<DateTime>();
  const [allNews, setAllNews] = useState<NewsDTO[]>([]);
  const calendarRef = useRef<any>(null);

  useEffect(() => {
    GetNews().then((news : NewsDTO[]) => setAllNews(news))
  }, [])

  useEffect(() => {
    const tick = () => {
      const currentDateTime : DateTime = ConvertCurrentDateTime();

      setDateTime(currentDateTime)
    }

    tick();
    // then update every second
    const id = window.setInterval(tick, 1_000);

    return () => window.clearInterval(id);
    
  }, [])

  useEffect(() => {
    // Update calendar size when events tab becomes active
    if (activeTab === 'events' && calendarRef.current) {
      const calendarApi = calendarRef.current.getApi();
      calendarApi.updateSize();
    }
  }, [activeTab]);

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', padding: '20px' }}>
      <div className="date-time-section">
        <div className="date-time-title" style={{ 
          marginBottom: '20px', 
          borderBottom: '2px solid #e0e0e0',
          paddingBottom: '10px'
        }}>
          <h2 style={{ 
            fontSize: '24px', 
            fontWeight: 'bold',
            color: '#2c3e50'
          }}>CURRENT DATE AND TIME</h2>
        </div>
        <div className="date-time" style={{
          backgroundColor: '#002f5f', 
          color: '#fff', 
          height: '250px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-evenly',
          alignItems: 'center',
          borderRadius: '8px'
        }}>
          <div className="date" style={{ textAlign: 'center' }}>
            <h3 style={{ textTransform: 'uppercase' }}>
              {dateTime?.day}, {dateTime?.date} {dateTime?.month} {dateTime?.year}
            </h3>
          </div>
          <div className="time" style={{ textAlign: 'center' }}>
            <h1 style={{ textTransform: 'uppercase', fontSize: '80px' }}>
              {dateTime?.time}
            </h1>
          </div>
          <div className="timezone" style={{ textAlign: 'center' }}>
            <h5 style={{ textTransform: 'uppercase' }}>
              {dateTime?.tz}
            </h5>
          </div>
        </div>
      </div>      
      <div className="carousel-news" style={{ marginTop: '40px' }}>
        <div className="carousel-news-title" style={{ 
          marginBottom: '20px', 
          borderBottom: '2px solid #e0e0e0',
          paddingBottom: '10px'
        }}>
          <h2 style={{ 
            fontSize: '24px', 
            fontWeight: 'bold',
            color: '#2c3e50'
          }}>LATEST NEWS</h2>
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

      <div className="news-and-events" style={{marginTop: '60px'}}>
        <Tabs activeKey={activeTab} onSelect={(key : string | null) => setActiveTab(key as EventKey)}>
          <Tab eventKey="news" title="News">
              <NewsComponent data={allNews} />
          </Tab>
          <Tab eventKey="events" title="Events">
            <div id="calendar" style={{ marginTop: '30px' }}>
              {activeTab === 'events' && (
                <FullCalendar
                  ref={calendarRef}
                  plugins={[dayGridPlugin]}
                  initialView="dayGridMonth"
                  initialDate={new Date()}
                />
              )}
            </div>
          </Tab>
        </Tabs>
      </div>
    </div>

    
  );
}