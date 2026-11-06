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
            .then(json => setList(json))
            .catch(err => console.log(err))
            .finally(() => setLoading(false));
    }, []);

    return (
        <div className={styles.container}>
            <h2>검색 키워드 : {k}</h2>

            <SearchBar />

            {loading ? (
                <div className={styles.message}>로딩 중입니다...</div>
            ) : list.length === 0 ? (
                <div className={styles.message}>검색 결과가 없습니다.</div>
            ) : (
                list.map((item, index) => {
                    return (
                        <Link key={index} to={`/detail/${item.id}`} className={styles.movie}>
                            {item.volumeInfo.imageLinks ? (
                                <img
                                    className={styles.cover}
                                    src={item.volumeInfo.imageLinks.thumbnail}
                                    alt={item.volumeInfo.title}
                                />
                            ) : (
                                <div className={styles.no_cover}>No Cover</div>
                            )}

                            <div>
                                <div className={styles.title}>{item.volumeInfo.title}</div>
                                <div className={styles.authors}>{item.volumeInfo.authors?.join(", ")}</div>
                            </div>
                        </Link>
                    );
                })
            )}
        </div>
    );
}

export default Search;
