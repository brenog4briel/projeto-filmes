import { useEffect, useState } from "react";
import styles from "./home.module.css"
import { BsSearch } from "react-icons/bs";
import {Rating} from "@mui/material"
import { Link } from "react-router-dom";

const API_TOKEN = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzMzU5MDE4NTBlYTYzMGE4Y2RkZmIyYjU3M2M5MjBmZiIsInN1YiI6IjY2NDhiNTVkYTBmNzE0NGU0NDkyNTZjZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Kfvpp9RCd-x6hrX8QlGgbqgOyyFRF7psvKsrpLGdiSk"

interface MovieProps {
    adult: boolean;
    backdrop_path: string;
    genre_ids: number[];
    id: number;
    original_language: string;
    original_title: string;
    overview: string;
    poster_path: string;
    popularity: number;
    release_date: string;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
}

interface DataProps {
  page:number;
  results: MovieProps[];
  total_pages: number;
  total_results:number;
}
export function Home() {

  const [movies,setMovies] = useState<MovieProps[]>();
  const [page,setPage] = useState(1);

  useEffect(() => {
    getData()
  },[page])


  function formatDate(date:string) {
    const newData = new Date(date)
    return newData.toLocaleDateString("pt-br");
  }

  async function getData() {
    fetch(`https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=${page}&sort_by=popularity.desc`,{
      method:"get",
       headers: {
        'Content-type': 'application/json',
        'Authorization': `Bearer ${API_TOKEN}`, // notice the Bearer before your token
    },
    })
    .then((res) => res.json())
    .then((data : DataProps) => {
      if (page === 1) {setMovies(data.results)}
      else {
        const newArr = [...(movies as MovieProps[])]
        console.log(newArr)
        const newItems = data.results;
        const result = newArr.concat(newItems);
        setMovies(result);
      }
    }
  )
  }

  function handleMoreMovies(e: React.MouseEvent){
    e.preventDefault()
    setPage(page + 1)
  }

  return (
    <main className={styles.container}>
      <form className={styles.form} action="">
        <input type="search" name="" id="" placeholder="Digite o nome de filme que deseja procurar"/>
        <button type="button" onClick={() => formatDate("2024-01-18")}>
          <BsSearch size={25} color="white"/>
        </button>
      </form>

      <div className={styles.movie_container}>
        {movies ? movies.map((movie,index) => (
          
          <Link key={index} to={`/detail/:${movie.id}`}>
          <div className={styles.movie_item}>
              <img className={styles.movie_poster} src={`https://image.tmdb.org/t/p/w300/${movie.poster_path}`} alt=""/>
              <div className={styles.movie_info}>
                <div className={styles.container_title}>
                 <h3>{movie.title}</h3>
                 <Rating defaultValue={Math.round(movie.vote_average)} precision={1} max={10} readOnly/>
                </div>
                <p>Data de lançamento: {formatDate(movie.release_date)}</p>
              </div>
          </div>
          </Link>
        )) : <p>carregando...</p>}

      </div>
       <div className={styles.container_more_btn}>
        <a href="" className={styles.more_btn} onClick={handleMoreMovies}>Mostrar mais</a>
       </div>
    </main>
  )
}
