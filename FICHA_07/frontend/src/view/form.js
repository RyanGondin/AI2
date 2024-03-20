import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import React, { useEffect, useState } from "react";
import axios from "axios";
const baseUrl = "http://localhost:3000";

export default function Form() {
  const [campTitilo, setcampTitulo] = useState("");
  const [campDescricao, setcampDescricao] = useState("");
  const [campFoto, setcampFoto] = useState("");
  const [Genero, setGenero] = useState("");
  const [dataGenero, setdataGenero] = useState([]);

  useEffect(() => {
    const url = baseUrl + "/genero/list";
    axios.get(url).then((res) => {
        if (res.data.success === true) {
          const data = res.data.data;
          setdataGenero(data);
        } else {
          alert("Erro Web Service");
        }
      })
      .catch((error) => {
        alert(error);
      });
  }, []);

  return (
    <div>
      <div className="form-row justify-content-center">
        <div className="form-group col-md-6">
          <label htmlFor="inputPassword4">Titulo </label>
          <input
            type="text"
            className="form-control"
            placeholder="Titulo"
            value={campTitilo}
            onChange={(value) => setcampTitulo(value.target.value)}
          />
        </div>
        <div className="form-group col-md-6">
          <label htmlFor="inputEmail4">Descrição</label>
          <input
            type="text"
            className="form-control"
            placeholder="Descrição"
            value={campDescricao}
            onChange={(value) => setcampDescricao(value.target.value)}
          />
        </div>
      </div>
      <div className="form-row">
        <div className="form-group col-md-6">
          <label htmlFor="inputState">Genero</label>
          <select
            id="inputState"
            className="form-control"
            onChange={(value) => setGenero(value.target.value)}
          >
            <option defaultValue>Choose...</option>
            <LoadGenero />
          </select>
        </div>
        <div className="form-group col-md-6">
          <label htmlFor="inputEmail4">Foto</label>
          <input
            type="file"
            className="form-control"
            placeholder="Foto"
            value={campFoto}
            onChange={(value) => setcampFoto(value.target.value)}
          />
        </div>
      </div>

      <button
        type="submit"
        className="btn btn-primary"
        onClick={() => SendSave()}
      >
        Save
      </button>
    </div>
  );

  function LoadGenero() {
    return dataGenero.map((data, index) => {
      return (
        <option key={index} value={data.id}>
          {data.descricao}
        </option>
      );
    });
  }

  function SendSave() {
    if (Genero === "") {
      alert("Escolha um Genero!");
    } else if (campFoto === "") {
      alert("Insira a Foto!");
    } else if (campTitilo === "") {
      alert("Insira o Titulo!");
    } else if (campDescricao === "") {
      alert("Insira a Descrição!");
    } else {
      const baseUrl = "http://localhost:3000/filmes/create";
      const datapost = {
        titulo: campTitilo,
        descricao: campDescricao,
        foto: campFoto,
        generoId: Genero,
      };

      axios.post(baseUrl, datapost)
      .then((response) => {
          if (response.data.success === true) {
            alert(response.data.message);
          } else {
            alert(response.data.message);
          }
        })
        .catch((error) => {
          alert("Error 34 " + error);
        });
    }
  }
}
