import styles from "./home.module.css"
import { BsSearch } from "react-icons/bs";

export function Home() {
  return (
    <main className={styles.container}>
      <form className={styles.form} action="">
        <input type="search" name="" id="" placeholder="Digite o nome de filme que deseja procurar"/>
        <button type="submit">
          <BsSearch size={30} color="white"/>
        </button>
      </form>

      <div className={styles.movie_container}>
        <div className={styles.movie_item}>1</div>
        <div className={styles.movie_item}>2</div>
        <div className={styles.movie_item}>3</div>
        <div className={styles.movie_item}>4</div>
        <div className={styles.movie_item}>5</div>
        <div className={styles.movie_item}>6</div>
        <div className={styles.movie_item}>7</div>
        <div className={styles.movie_item}>8</div>
      </div>
    </main>
  )
}
