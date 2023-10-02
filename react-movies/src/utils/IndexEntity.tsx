import axios, { AxiosResponse } from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Pagination from "./Pagination";
import RecordsPerPageSelect from "./RecordPerPageSelect";
import Button from "./Button";
import CustomConfirm from "./CustomConfirm";
import GenericList from "./GenericList";
import { ReactElement } from "react-markdown/lib/react-markdown";

export default function IndexEntity<T>(props: indexEntityProps<T>) {
    const [entity, setEntity] = useState<T[]>();
    const [totalAmountOfPages, setTotalAmountOfPages] = useState(0);
    const [recordsPerPage, setRecordsPerPage] = useState(5);
    const [page, setPage] = useState(1);

    useEffect(() => {
        loadData();
    }, [page, recordsPerPage]);

    function loadData() {
        axios.get(props.url, {
            params: {page, recordsPerPage}
        }).then((response: AxiosResponse<T[]>) => {
            const totalAmountOfRecords = parseInt(response.headers['totalamountofrecords'], 10);
            setTotalAmountOfPages(Math.ceil(totalAmountOfRecords / recordsPerPage));
            setEntity(response.data);
        })
    }

    async function deleteEntity(id: number) {
        try {
            await axios.delete(`${props.url}/${id}`);
            loadData();
        }
        catch (error: any) {
            if (error && error.response) {
                console.error(error.response.data);
            }
        }
    }

    const buttons = (editURL: string, id: number) => <>
        <Link className="btn btn-success" to={editURL}>Edit</Link>

        <Button onClick={() => CustomConfirm(() => deleteEntity(id))} className="btn btn-danger">Delete</Button>
    </>

    return (
        <>
            <h3>{props.title}</h3>
            <Link className="btn btn-primary" to={props.createURL}>Create {props.entityName}</Link>

            <RecordsPerPageSelect onChange={amountOfRecords => {
                setPage(1);
                setRecordsPerPage(amountOfRecords)
            }} />

            <Pagination currentPage={page} totalAmountOfPages={totalAmountOfPages} onChange={newPage => setPage(newPage)} />

            <GenericList list={entity}>
                <table className="table table-striped">
                    {props.children(entity!, buttons)}
                </table>
            </GenericList>
        </>
    )
}

interface indexEntityProps<T> {
    url: string;
    title: string;
    createURL: string;
    entityName: string;
    children(entity: T[], buttons: (editURL: string, id: number) => ReactElement): ReactElement;
}