import MovieTheaterForm from "./MovieTheaterForm";

export default function EditMovieTheater(){
    return (
        <>
            <h3>Edit Movie Theater</h3>
            <MovieTheaterForm model={{name: 'Oktyabr', latitude: 53.924172, longtitude: 27.595500}} onSubmit={values => console.log(values)} />
        </>
    )
}