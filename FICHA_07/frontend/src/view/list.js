import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import axios from "axios";
//sweetalert2 - importação
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";
import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";

export default function ListComponent() {
  const [dataFilmes, setdataFilmes] = useState([]);

  useEffect(() => {
    const url = "http://localhost:3000/filmes/list";
    axios.get(url).then((res) => {
        if (res.data.success) {
          const data = res.data.data;
          setdataFilmes(data);
        } else {
          alert("Error Web Service!");
        }
      })
      .catch((error) => {
        alert(error);
      });
  }, []);

  return (
    <table className="table table-hover table-striped">
      <thead className="thead-dark">
        <tr>
          <th scope="col">Id</th>
          <th scope="col">Titulo</th>
          <th scope="col">Descricao</th>
          <th scope="col">Foto</th>
          <th scope="col">Genero</th>
          <th colSpan="2">Action</th>
        </tr>
      </thead>
      <tbody>
        <LoadFillData />
      </tbody>
    </table>
  );

  function LoadFillData() {
    return dataFilmes.map((data, index) => {
      return (
        <tr key={index}>
          <th>{data.id}</th>
          <td>{data.titulo}</td>
          <td>{data.descricao}</td>
          <td>
            {" "}
            <img
              alt="Foto"
              style={{ width: "75px" }}
              src={"/imagem/" + data.foto}
            />{" "}
          </td>
          <td>{data.genero.descricao}</td>
          <td>
            <Link
              class="btn btn-outline-info " to={"/filmes/update/" + data.id}
            >
              Edit
            </Link>
          </td>
          <td>
            <button className="btn btn-outline-danger"onClick={() => OnDelete(data.id)}>{" "}Delete{" "}</button>
          </td>
        </tr>
      );
    });
  }

  function OnDelete(id) {
    Swal.fire({
      title: "Are you sure?",
      text: "You will not be able to recover this imaginary file!",
      type: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, keep it",
    }).then((result) => {
      if (result.value) {
        SendDelete(id);
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire("Cancelled", "Your imaginary file is safe :)", "error");
      }
    });
  }

  function SendDelete(Id) {
    // url do backend
    const baseUrl = "http://localhost:3000/filmes/delete";
    // network
    axios
      .delete(baseUrl, {
        id: Id,
      })
      .then((response) => {
        if (response.data.success) {
          Swal.fire("Deleted!", "Your Movie has been deleted.", "success");
          LoadFilmes();
        }
      })
      .catch((error) => {
        alert("Error 325 ");
      });
  }
}
