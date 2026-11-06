import { useNavigate, useParams } from "react-router";
import { useEffect, useState } from "react";
import styles from "./Detail.module.css";

function Detail() {
    const navigate = useNavigate();
    const { id } = useParams();

    const [movie, setMovie] = useState(null);

    useEffect(() => {
        fetch(`https://www.omdbapi.com/?apikey=6a0a8eb4&i=${id}&plot=full`)
            .then(res => res.json())
            .then(json => setMovie(json))
            .catch(err => console.log(err));
    }, [id]);

    if (!movie) {
        return <div className={styles.container}>Loading...</div>;
    }

    return (
        <div className={styles.container}>
            <button
                className={styles.backBtn}
                onClick={() => {
                    navigate(-1);
                }}>
                &larr; Back
            </button>

            {/* 1. 포스터 이미지를 제목보다 위로 배치 */}
            {movie.Poster !== "N/A" ? (
                <img className={styles.cover} src={movie.Poster} alt={movie.Title} />
            ) : (
                <div className={styles.no_cover}>No Cover</div>
            )}

            {/* 2. 제목을 포스터 아래로 배치 */}
            <h2>{movie.Title}</h2>

            <p>
                <strong>Year:</strong> {movie.Year}
            </p>
            <p>
                <strong>Genre:</strong> {movie.Genre}
            </p>
            <p>
                <strong>Director:</strong> {movie.Director}
            </p>
            <p style={{ marginTop: "15px" }}>{movie.Plot}</p>
        </div>
    );
}

export default Detail;
