import { JSX } from 'react';

export function Card() : JSX.Element {
    return (
        <div className="card-component" style={{height: '150px', backgroundColor: 'gold'}}>
            <div className="card-bg-picture">
                <i className="fa-solid fa-suitcase" style={{fontSize: '150px', zIndex: '100'}}></i>
            </div>
            <div className="description" style={{zIndex: '2'}}> Halo </div>
        </div>
    )
}