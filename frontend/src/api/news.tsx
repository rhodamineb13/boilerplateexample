import { AxiosResponse } from 'axios';
import { client } from './api_client';
import { NewsDTO } from '../models/dto/news_dto';

export function GetNews() : Promise<NewsDTO[]> {
    return client.get("api/news")
        .then((res : AxiosResponse) => res.data.data as NewsDTO[])
        .catch((err) => {
            throw err
        })
}