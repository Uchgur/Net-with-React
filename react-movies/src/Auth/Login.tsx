import axios from 'axios';
import { authenticationResponse, userCredentials } from './Auth.models';
import AuthForm from './AuthForm';
import {URLAccounts} from '../Endpoints';
import { useContext, useState } from 'react';
import DisplayErrors from '../utils/DisplayErrors';
import { getClaims, saveToken } from './HandleJWT';
import AuthenticationContext from './AuthenticationContext';
import { useHistory } from 'react-router-dom';

export default function Login(){

    const [errors, setErrors] = useState<string[]>([]);
    const {update} = useContext(AuthenticationContext);
    const history = useHistory();

    async function login(credentials: userCredentials){
        try {
            setErrors([]);
            const response = await axios
            .post<authenticationResponse>(`${URLAccounts}/login`, credentials);
            saveToken(response.data);
            update(getClaims());
            history.push('/');
        }
        catch (error: any){
            setErrors(error.response.data);
        }
    }

    return (
        <>
            <h3>Login</h3>
            <DisplayErrors errors={errors} />
            <AuthForm model={{email: '', password: ''}}
             onSubmit={async values => await login(values)}
            />
        </>
    )
}