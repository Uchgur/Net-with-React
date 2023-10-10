import { useEffect, useState } from "react";
import { genreDTO } from "../genres/Genres.model";
import { movieTheaterDTO } from "../movietheaters/MovieTheater.model";
import MovieForm from "./MovieForm";
import axios, { AxiosResponse } from "axios";
import { URLMovies } from "../Endpoints";
import { movieCreationDTO, moviesPostGetDTO } from "./movies.model";
import Loading from "../utils/Loading";
import { convertMovieToFormData } from "../utils/FormDataUtils";
import { useHistory } from "react-router-dom";
import DisplayErrors from "../utils/DisplayErrors";

export default function CreateMovie(){
    const [nonSelectedGenres, setNonSelectedGenres] = useState<genreDTO[]>([]);
    const [nonSelectedMovieTheaters, setNonSelectedMovieTheaters] = useState<movieTheaterDTO[]>([]);
    const [loading, setLoading] = useState(true);
    const [errors, setErrors] = useState<string[]>([]);
    const history = useHistory();
    
    useEffect(() => {
        axios.get(`${URLMovies}/postget`).then((response: AxiosResponse<moviesPostGetDTO>) => {
            setNonSelectedGenres(response.data.genres);
            setNonSelectedMovieTheaters(response.data.movieTheaters);
            setLoading(false);
        })
    }, [])

    async function create(movie: movieCreationDTO) {
        try {
            const formData = convertMovieToFormData(movie);
            const response = await axios({
                method: 'post',
                url: URLMovies,
                data: formData,
                headers: {'Content-Type': 'multipart/form-data'}
            })

            history.push(`/movie/${response.data}`);
        } catch(error: any) {
            setErrors(error.response.data);
        }
    }
    
    return (
        <>
            <h3>Create Movie</h3>
            <DisplayErrors errors={errors} />
            {loading ? <Loading /> :
                <MovieForm model={{title: '', inTheaters: false, trailer: ''}} 
                    onSubmit={async values => await create(values)}
                    nonSelectedGenres={nonSelectedGenres}
                    selectedGenres={[]}
                    nonSelectedMovieTheaters={nonSelectedMovieTheaters}
                    selectedMovieTheaters={[]}
                    selectedActors={[]} 
                /> 
            } 
        </>
    )
}