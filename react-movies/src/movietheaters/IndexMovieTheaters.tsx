import { Link } from "react-router-dom";
import IndexEntity from "../utils/IndexEntity";
import { movieTheaterDTO } from "./MovieTheater.model";
import { URLMovieTheaters } from "../Endpoints";

export default function IndexMovieTheaters(){
    return (
        <IndexEntity<movieTheaterDTO>
            url={URLMovieTheaters} createURL="movietheaters/create"
            title="Movie Theaters" entityName="Movie Theater"    
        >
            {(entities, buttons) => <>
                <thead>
                    <tr>
                        <th></th>
                        <th>Name</th>
                    </tr>
                </thead>
                <tbody>
                    {entities?.map(entity => <tr key={entity.id}>
                        <td>
                            {buttons(`movietheaters/edit/${entity.id}`, entity.id)}
                        </td>
                        <td>
                            {entity.name}
                        </td>
                    </tr>)}
                </tbody>
            </>}
        </IndexEntity>
    )
}