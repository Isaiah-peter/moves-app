import React, {useState, useEffect} from 'react'
import  user  from '../img/user.jpg'
import  play  from '../img/play-button.png'
import moviedb from '../api/moviesapi'

export const MoviesDetail = (props) => {
    const [detail, setDetail] = useState({})
    const [cast, setCast] = useState({})
    const [currentCast, setCurrentCast] = useState(0)
    const [castImage, setCastImage] = useState([])


    
      const getDetail = async() => {
      const Id = props.match.params.id;
      const response = await moviedb.get(`/movie/${Id}`)
      setDetail(response.data)
     
    }

    const getCast = async() => {
      const Id = props.match.params.id;
      const response = await moviedb.get(`/movie/${Id}/credits`)
      setCast(response.data.cast[currentCast])
      setCastImage(response.data.cast)
    }

    useEffect(() =>{ 
      getDetail()
      window.setTimeout(()=>{
        setCurrentCast(currentCast + 1)
        if(currentCast == 20){
          setCurrentCast(0)
        }
      },2000)
      getCast()}, [detail])

    const getGenres = () => {
      let result = [];
      
     if(detail.genres){
      detail.genres.map((item) => {
        result.push(item.name)
    })
     }else{
      result.push('genres')
     }
       
      
      return result.join(',')
    }

    const getCastdata = () =>{
      if(cast){
          return(
            <div className='feature__info'>
          <div>
            <div className='feature__info-header'>{cast.character}</div>
          </div>
          <div>
            <div className='feature__info-header'>{cast.original_name}</div>
          </div>
        </div>
          )
      }
    }

   
      const renderCastImage = castImage.map((image)=>{
            if(image){
              return(
                <div className='play-cast__box'>
                <img src={`https://image.tmdb.org/t/p/w500/${image.profile_path}`} alt='cast' className='play-cast__image'/>
                <div className='play-cast__detail'>
                <h2 className='play-cast__nameR'>{image.name}</h2>
                <h4 className='play-cast__name'>{image.character}</h4>
                </div>
            </div>
              )
            }
          })
      
    
  
    return(
      <div className='p5'>
      <div className='movie-info'>
          <img src={`https://image.tmdb.org/t/p/w500/${detail.poster_path}`} className='movie-info__image' alt='movie detail'/>
          <div className='movie-info__details'>
            <div className='movie-info__header'>
              <h1 className='movie-info__header-name'>{detail.original_title}</h1>
              <h4 className='movie-info__header-name-detail'>⭐ {Math.floor(detail.popularity * 100 / 10000)}% 
              <span className='mr-2 ml-2'>|</span>
              {detail.release_date}
              <span className='mr-2 ml-2'>|</span>
              {getGenres()}
              </h4>
            </div>
            <div className='movie-info__detail'>
             {detail.overview}
             </div>  
              <div className='feature'>
                <div className='feature__header'>Feature Cast</div>
                  {getCastdata()}
              </div>
              <div className='play-btn'>
              <img src={play} alt='play' className='play-btn-icon'/>
              <a href='#' className='thriller'>Play Trailer</a>
              </div>
          </div>
      </div>
       <div className="p5">
       
       <h2 className='play-cast__header'>Cast</h2>
      <div className='play-cast'>
          {renderCastImage}
       </div>
      </div>

      <div className='border-buttom'>
         </div>

      <div className="p5">
       <h2 className='play-cast__header'>Cast</h2>
      <div className='image-cast'>
         <div className='image-cast__box'>
          <img src={user} alt='cast' className='image-cast__image'/>
         </div>

      </div>
      </div>
      </div>
  )
    
}