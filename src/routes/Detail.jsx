import { useNavigate, useParams } from "react-router";
import { useEffect, useState } from "react";
import styles from "./Detail.module.css";

function Detail() {
    const navigate = useNavigate();

    const { id } = useParams();

    const [movies, setMovies] = useState(null);

    useEffect(() => {
        fetch(`https://www.omdbapi.com/?apikey=6a0a8eb4&i=${id}&plot=full`)
            .then(res => res.json())
            .then(json => setMovies(json))
            .catch(err => console.log(err));
    }, []);

    if (!movies) {
        return <div className={styles.container}>Loading...</div>;
    }

    return (
        <div>
            <button
                className={styles.backBtn}
                onClick={() => {
                    navigate(-1);
                }}>
                &larr; Back
            </button>
            <h2>{movies.volumeInfo.title}</h2>
            {movies.volumeInfo.imageLinks ? (
                <img
                    className={styles.cover}
                    src={movies.volumeInfo.imageLinks.thumbnail}
                    alt={movies.volumeInfo.title}
                />
            ) : (
                <div className={styles.no_cover}>No Cover</div>
            )}
            <p>{movies.volumeInfo.authors?.join(", ")}</p>
            <p dangerouslySetInnerHTML={{ __html: movies.volumeInfo.description }}></p>
        </div>
    );
}

export default Detail;
