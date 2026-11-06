import { Link, useSearchParams } from "react-router";
import { useEffect, useState } from "react";
import styles from "./Search.module.css";
import SearchBar from "../components/SearchBar.jsx";


function Search() {
    const [searchParams] = useSearchParams();
    const k = searchParams.get("keyword");

    const [loading, setLoading] = useState(false);
    const [list, setList] = useState([]);


    useEffect(() => {
        if (!k) return;

        setLoading(true);
        setList([]);

        fetch(`https://www.omdbapi.com/?apikey=6a0a8eb4&s=${k}`)
            .then(res => res.json())
            .then(json => {
                if (json.Response === "True") {
                    setList(json.Search);
                } else {
                    setList([]);
                }
            })
            .catch(err => console.log(err))
            .finally(() => setLoading(false));
    }, [k]);

    return (
        <div className={styles.container}>
            <h2>검색 키워드 : {k}</h2>

            <SearchBar keyword={k} />

            {loading ? (
                <div className={styles.message}>로딩 중입니다...</div>
            ) : list.length === 0 ? (
                <div className={styles.message}>검색 결과가 없습니다.</div>
            ) : (
                list.map((item, index) => {
                    return (
                        // OMDb API의 고유 ID는 item.imdbID 입니다.
                        <Link key={item.imdbID} to={`/detail/${item.imdbID}`} className={styles.movie}>
                            {/* 포스터가 존재하지 않거나 N/A인 경우 처리 */}
                            {item.Poster !== "N/A" ? (
                                <img className={styles.cover} src={item.Poster} alt={item.Title} />
                            ) : (
                                <div className={styles.no_cover}>No Cover</div>
                            )}

                            <div>
                                {/* OMDb API 속성(Title, Year)으로 변경 */}
                                <div className={styles.title}>{item.Title}</div>
                                <div className={styles.authors}>{item.Year}</div>
                            </div>
                        </Link>
                    );
                })
            )}
        </div>
    );
}

export default Search;
