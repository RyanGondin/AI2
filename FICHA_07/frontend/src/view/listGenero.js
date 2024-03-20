import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import axios from 'axios';
import React ,{useEffect, useState} from "react";
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2'


const baseUrl = "http://localhost:3000";

export default function ListGenero(){

    const [dataGenero, setdataGenero] = useState([]);

    useEffect(() => {
        LoadGenero();
    }, []);

    function LoadGenero() {
        const url = baseUrl + "/genero/list";
        axios.get(url)
        .then(res => {
            if (res.data.success === true){
                const data = res.data.data;
                setdataGenero(data);
            }
            else {
                alert("Erro Web Service");
            }
        })
        .catch(error => {
            alert(error)
        });
    }

    return (
        <table className="table table-hover table-striped">
            <thead className = "thead-dark">
                <tr>
                    <th scope="col">id</th>
                    <th scope="col">Genero</th>
                </tr>
            </thead>
            <tbody>
                <LoadFillData/>
            </tbody>
        </table>
    );

    function LoadFillData(){
        return dataGenero.map((data, index) => {
            return(
            <tr key = {index}>
                <th>{data.id}</th>
                <td>{data.descricao}</td>
                <td>
                    <Link className='btn btn-outline-info' to = {"/genero/update/" + data.id}>Update</Link>
                </td>
                <td>
                    <button className='btn btn-outline-danger' onClick={() => onDelete(data.id)}>Delete</button>
                </td>
            </tr>
        )
        });
    }

    function onDelete(id){
        Swal.fire({
            title: 'Are you sure?',
            text: 'It won\'t be able to recover it later!',
            type: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete!',
            cancelButtonText: 'No, keep'
        }).then((result) => {
            if (result.value) {
                sendDelete(id)
            } else if (result.dismiss === Swal.DismissReason.cancel) {
                Swal.fire(
                'Canceled',
                'Genero was not deleted',
                'error'
                )
            }
        })
    }

    function sendDelete(userId){
        const url = baseUrl + "/genero/delete/" + userId
        axios.post(url,{
            id:userId
        })
        .then(response =>{
            if (response.data.success){
                Swal.fire(
                    'Deleted!',
                    'Genre was removed.',
                    'success'
                )
                LoadGenero();
            }
            else{
                Swal.fire(
                    'Canceled',
                    'Genre is assosiated to a movie!',
                    'error'
                )
            }
        })
        .catch ( error => {
            alert("Error 325 ")
        });
    }
}