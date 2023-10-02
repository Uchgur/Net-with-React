import { URLActors } from '../Endpoints'
import EditEntity from '../utils/EditEntity'
import { convertActorToFormData } from '../utils/FormDataUtils'
import ActorForm from './ActorForm'
import { actorCreationDTO, actorDTO } from './Actors.model'

export default function EditActor(){

    function transform(actor: actorDTO): actorCreationDTO {
        return {
            name: actor.name,
            pictureURL: actor.picture,
            biography: actor.biography,
            dateOfBirth: new Date(actor.dateOfBirth)
        }
    }

    return (
        <EditEntity<actorCreationDTO, actorDTO> 
         url={URLActors} indexURL="/actors" entityName="Actor" 
        //  transformFormData={convertActorToFormData}
         transform={transform}
        >
            {(entity, edit) => 
                <ActorForm 
                    model={entity}
                    onSubmit={async values => await edit(values)}
                />
            }
        </EditEntity>
    )
}