import { actorMovieDTO } from "../actors/Actors.model";
import { genreDTO } from "../genres/Genres.model";
import { movieTheaterDTO } from "../movietheaters/MovieTheater.model";
import MovieForm from "./MovieForm";

export default function EditMovie(){
    const nonSelectedGenres: genreDTO[] = [{id: 2, name: 'Drama'}]
    const selectedGenres: genreDTO[] = [{id: 1, name: 'Comedy'}]

    const nonSelectedMovieTheaters: movieTheaterDTO[] = [{id: 1, name: 'Oktyabr'}]
    const selectedMovieTheaters: movieTheaterDTO[] = [{id: 2, name: 'Titan'}]

    const selectedActors: actorMovieDTO[] = [{
        id: 1, name: 'Tom Hanks', character: 'Geralt', picture: ''
    }]
    
    return (
        <>
            <h3>Edit Movie</h3>
            <MovieForm model={{title: 'Toy Story', inTheaters: true, trailer: 'url', releaseDate: new Date('2019-01-01T00:00:00')}}
                onSubmit={values => console.log(values)}
                nonSelectedGenres={nonSelectedGenres}
                selectedGenres={selectedGenres}
                nonSelectedMovieTheaters={nonSelectedMovieTheaters}
                selectedMovieTheaters={selectedMovieTheaters}
                selectedActors={selectedActors} />
        </>
    )
}