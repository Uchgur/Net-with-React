import GenreForm from "./GenreForm";
import { URLGenres } from "../Endpoints";
import { genreCreationDTO, genreDTO } from "./Genres.model";
import EditEntity from "../utils/EditEntity";

export default function EditGenre(){
    

    return (
        <>
            <EditEntity<genreCreationDTO, genreDTO> url ={URLGenres} entityName="Genres" indexURL="/genres">
                {(entity, edit) => 
                    <GenreForm model={entity} 
                        onSubmit={async value => {
                            await edit(value);
                    }} />
                }
            </EditEntity>
        </>
    )
}