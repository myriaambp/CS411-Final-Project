import React from 'react';

class Movie extends React.Component {
   render() {
       const {description, ID, Image, Title} = this.props;
       return (
           <div className="movie">
               <div className="title-year">
                   <h1 className="title">{Title}</h1>
                   <h2 className="year">{ID}</h2>
               </div>
               <div className="poster">
                   <img src={Image} alt="my movie poster"/>
               </div>
               <div className = "description">
                   {description}
               </div>
           </div>
       )
   }
}
export default Movie;