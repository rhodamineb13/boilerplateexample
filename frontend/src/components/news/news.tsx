import { JSX } from "react";
import { NewsDTO } from "../../models/dto/news_dto";
import { ConvertToReadableFormat } from "../../utils/date_conversion";
import './news.scss';

interface NewsProps {
    data : NewsDTO[];
}

export default function NewsComponent(props : NewsProps) : JSX.Element {
    return (
        <>
        { props.data.map((news) => <div className="news">
            <div className="news-image"><img src={"http://localhost:8080/api/uploads/" + news.image_url}/></div>
                <div className="news-text">
                    <div className="news-text-title"><h5>{news.title.toUpperCase()}</h5></div>
                    <div className="news-text-subtitle"><span>{news.subtitle}</span></div>
                    <div className="news-text-published"><span>Published on {ConvertToReadableFormat(news.created_at)}</span></div>
                </div>
            </div>) }
        </>
    )
}