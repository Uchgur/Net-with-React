import { Form, Formik, FormikHelpers } from "formik";
import TextField from "../Forms/TextField";
import Button from "../utils/Button";
import { Link } from "react-router-dom";
import { movieTheaterCreationDTO } from "./MovieTheater.model";
import * as Yup from 'yup';
import Map from '../utils/Map';
import MapField from "../Forms/MapField";
import coordinateDTO from "../utils/Coordinates.model";

export default function MovieTheaterForm(props: movieTeaterFormProps) {
    function transformCoordinates(): coordinateDTO[] | undefined {
        if(props.model.latitude && props.model.longitude) {
            const response: coordinateDTO = {lat: props.model.latitude, lng: props.model.longitude}
            return [response];
        }

        return undefined;
    }
    
    return(
        <Formik
            initialValues={props.model}
            onSubmit={props.onSubmit}
            validationSchema={Yup.object({
                name: Yup.string().required('This field is required').firstLetterUppercase()
            })}
        >
            {(formikProps) => (
                <Form>
                    <TextField displayName="Name" field="name" />

                    <div style={{marginBottom: '1rem'}}>
                        <MapField latField="latitude" lngField="longtitude" 
                        coordinates={transformCoordinates()} />
                    </div>

                    <Button disabled={formikProps.isSubmitting} type="submit">Save Changes</Button>
                    <Link className="btn btn-secondary" to="/movietheaters">Cancel</Link>
                </Form>
            )}
        </Formik>
    )
}

interface movieTeaterFormProps {
    model: movieTheaterCreationDTO;
    onSubmit(values: movieTheaterCreationDTO, actions: FormikHelpers<movieTheaterCreationDTO>) : void;
}