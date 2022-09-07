import React from 'react';
import {movies} from './getmovie';
class Banner extends React.Component
{
    render()
    {
        return(
            <div className="card card-banner">
                <img src={`https://image.tmdb.org/t/p/original${movies.results[0].backdrop_path}`} className="card-img-top banner-img col-sm-12" alt={movies.results[0].title}/>
                    <div className="card-body card-info">
                        <h1 className="card-title"><strong>{movies.results[0].title}</strong></h1>
                        <p className="card-text col-sm-12"><strong>{movies.results[0].overview}</strong></p>
                        {/*<a href="www.google.com" className="btn btn-primary">Go somewhere</a>*/}
                    </div>
            </div>
      );
    }
}
export default Banner;