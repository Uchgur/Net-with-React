import { URLMovieTheaters } from "../Endpoints";
import EditEntity from "../utils/EditEntity";
import { movieTheaterCreationDTO, movieTheaterDTO } from "./MovieTheater.model";
import MovieTheaterForm from "./MovieTheaterForm";

export default function EditMovieTheater(){
    return (
        <EditEntity<movieTheaterCreationDTO, movieTheaterDTO>
            url={URLMovieTheaters} indexURL="/movietheaters" entityName="Movie Theater"    
        >
            {(entity, edit) => <MovieTheaterForm model={entity} onSubmit={async values => await edit(values)} />}
        </EditEntity>
    )
}