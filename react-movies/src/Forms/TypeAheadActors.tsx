import { AsyncTypeahead } from "react-bootstrap-typeahead";
import { actorMovieDTO } from "../actors/Actors.model";
import { ReactElement, useState } from "react";
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { URLActors } from "../Endpoints";

export default function TypeAheadActors(props: typeAheadActorsProps) {
   
    const [actors, setActors] = useState<actorMovieDTO[]>([]);
    const [isLoading, setisLoading] = useState(false);

    const selected: actorMovieDTO[] = [];

    const [dragElement, setDragElement] = useState<actorMovieDTO | undefined>(undefined);
    
    function handleDragStart(actor: actorMovieDTO) {
        setDragElement(actor);
    }

    function handleSearch(query: string) {
        setisLoading(true);

        axios.get(`${URLActors}/searchByName/${query}`).then((response: AxiosResponse<actorMovieDTO[]>) => {
            setActors(response.data);
            setisLoading(false);
        })
    }

    function handleDragOver(actor: actorMovieDTO) {
        if(!dragElement) {
            return;
        }

        if(actor.id !== dragElement.id) {
            const dragElementIndex = props.actors.findIndex(x => x.id === dragElement.id);
            const actorIndex = props.actors.findIndex(x => x.id === actor.id);

            const actors = [...props.actors];
            actors[actorIndex] = dragElement;
            actors[dragElementIndex] = actor;
            props.onAdd(actors);
        }
    }

    return(
        <div className="mb-3">
            <label>{props.displayName}</label>
            <AsyncTypeahead 
                id="typeahead"
                onChange={actors => {

                    if(props.actors.findIndex(x => x.id === actors[0].id) === -1) {
                        actors[0].character = '';
                        props.onAdd([...props.actors, actors[0]])
                    }

                }}
                options={actors}
                labelKey={actor => actor.name}
                filterBy={() => true}
                isLoading={isLoading}
                onSearch={handleSearch}
                placeholder="Write the name of the actor"
                minLength={1}
                flip={true}
                selected={selected}
                renderMenuItemChildren={actor => (
                    <>
                        <img alt="actor" src={actor.picture} style={{
                            height: '64px',
                            marginRight: '10px',
                            width: '64px'
                        }} />
                        <span>{actor.name}</span>
                    </>
                )}
            />

            <ul className="list-group">
                {props.actors.map(actor => <li
                key={actor.id}
                draggable={true}
                onDragStart={() => handleDragStart(actor)}
                onDragOver={() => handleDragOver(actor)}
                className="list-group-item list-group-item-action">
                    {props.listUI(actor)}
                    <span className="badge badge-primary badge-pill pointer text-dark"
                    style={{marginLeft: '0.5rem'}}
                    onClick={() => props.onRemove(actor)}>X</span>
                </li>)}
            </ul>

        </div>
    )
}

interface typeAheadActorsProps {
    displayName: string;
    actors: actorMovieDTO[];
    onAdd(actors: actorMovieDTO[]) : void;
    onRemove(actor: actorMovieDTO) : void;
    listUI(actor: actorMovieDTO) : ReactElement;
}