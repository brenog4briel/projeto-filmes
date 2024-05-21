import { useNavigate, useParams } from "react-router-dom"
import { IoMdArrowBack } from "react-icons/io";
import styles from "./detail.module.css"
import { useEffect, useState } from "react";
import { CircularProgress } from "@mui/material";

const API_TOKEN = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzMzU5MDE4NTBlYTYzMGE4Y2RkZmIyYjU3M2M5MjBmZiIsInN1YiI6IjY2NDhiNTVkYTBmNzE0NGU0NDkyNTZjZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Kfvpp9RCd-x6hrX8QlGgbqgOyyFRF7psvKsrpLGdiSk"
interface genreProp {
  id:number;
  name:string
}
interface belongs_to_collectionProp {
  id:number;
  name:string;
  poster_path:string;
  backdrop_path:string
}

interface production_companiesProp {
  id:number;
  logo_path:string | null;
  name:string;
  origin_country:string;
}

interface production_countriesProp {
  iso_3166_1:string;
  name:string;
}

interface spoken_languagesProp {
  english_name:string;
  iso_639_1:string;
  name:string
}

interface MovieDetailsProps {
  
    adult: boolean;
    backdrop_path: string;
    belongs_to_collection:belongs_to_collectionProp;
    budget: number,
    genres:  genreProp[]
    homepage: string,
    id: number,
    imdb_id: string,
    origin_country: string[];
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string;
    production_companies: production_companiesProp[]
    production_countries: production_countriesProp[]
   
    release_date: string,
    revenue: number,
    runtime: number,
    spoken_languages: spoken_languagesProp[]
    status: string,
    tagline: string;
    title: string;
    video: boolean,
    vote_average: number,
    vote_count: number
  }


export function Detail() {
  const param = useParams();
  const id = Number(param.movieid)
  const navigate = useNavigate();
  const [movieInfo,ssetMovieInfo] = useState<MovieDetailsProps>()

  useEffect(() => {
    getMovieDetail(id)
  },[])

  async function getMovieDetail(id:number) {
    fetch(`https://api.themoviedb.org/3/movie/${id}`,{
      method:"get",
      headers: {
       'Content-type': 'application/json',
       'Authorization': `Bearer ${API_TOKEN}`, // notice the Bearer before your token
   },
    })
    .then((res) => res.json())
    .then((data : MovieDetailsProps) => {
      ssetMovieInfo(data)
    })
}
  return (
    <div className={styles.container}>
      
      <div className={styles.container_back}>
      <IoMdArrowBack onClick={() => navigate(-1)} size={30} color="white"/>
      </div>

      {
        movieInfo && <div className={styles.container_movie_info}>
        <div className={styles.container_poster}>
        <img className={styles.movie_poster} src={`https://image.tmdb.org/t/p/w300/${movieInfo.poster_path}`} alt=""/>

        </div>
        <div className={styles.container_detail}>

          <h1>{movieInfo.title}</h1>


          <table className={styles.table}>
            <tr>
              <th>Sinopse:</th>
              <td>{movieInfo.overview}</td>
            </tr>
            <tr>
              <th>Gênero(s):</th>
              <td> 
                {movieInfo.genres.map((genre) => (
                  <p>{genre.name}</p>
                ))}
              </td>
            </tr>
            <tr>
              <th>Duração:</th>
              <td>{movieInfo.runtime} minutos</td>
            </tr>
            <tr>
              <th>Produtoras:</th>
              <td>
                {movieInfo.production_companies.map((companies) => (
                <p>{companies.name}</p>
                ))}
              </td>
            </tr>
            <tr>
              <th>País de origem:</th>
              <td>
                {movieInfo.production_countries.map((country) => (
                <p>{country.name}</p>
                ))}
              </td>
            </tr>
          </table>
        </div>
      </div>
      }

      {!movieInfo &&  <div className={styles.container_loading}>
          <div className={styles.container_loading}>
          <CircularProgress />
        </div>
      </div>}

     

      </div>
  )
}
