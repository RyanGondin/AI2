import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
const baseUrl = "http://localhost:3000";
export default function Edit() {
  const [dataFilmes, setdataFilmes] = useState("");
  const [campTitulo, setcampTitulo] = useState("");
  const [campDescricao, setcampDescricao] = useState("");
  const [campFoto, setcampFoto] = useState("");
  const [Genero, setGenero] = useState("");
  const[selectGeneroId, setselectGeneroId] = useState("");
  const [dataGenero, setdataGenero] = useState([]);
  
  const { filmesId } = useParams();
  useEffect(() => {
    const url = baseUrl + "/filmes/get/" + filmesId;
    axios.get(url)
      .then((res) => {
        if (res.data.success) {
          const data = res.data.data[0];
          setdataFilmes(data);
          setcampTitulo(data.titulo);
          setcampDescricao(data.descricao);
          setcampFoto(data.foto);
          setGenero(data.genero.descricao);
          setselectGeneroId(data.generoId);
          console.log(JSON.stringify(data.genero.genero));
        } else {
          alert("Error web service");
        }
      })
      .catch((error) => {
        alert("Error server: " + error);
      });

    const urlgenero = baseUrl + "/genero/list";
    axios.get(urlgenero)
      .then((res) => {
        if (res.data.success) {
          const data = res.data.data;
          setdataGenero(data);
        } else {
          alert("Erro Web Service");
        }
      })
      .catch((error) => {
        alert(error);
      });
  }, [filmesId]);
  return (
    <div>
      <div className="form-row justify-content-center">
        <div className="form-group col-md-6">
          <label htmlFor="inputPassword4">Titulo</label>
          <input
            type="text"
            className="form-control"
            placeholder="Titulo"
            value={campTitulo}
            onChange={(value) => setcampTitulo(value.target.value)}
          />
        </div>
        <div className="form-group col-md-6">
          <label htmlFor="inputEmail4">Descrição</label>
          <input
            type="text"
            className="form-control"
            placeholder="Descricao"
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
            value={selectGeneroId}
            onChange={(value) => setselectGeneroId(value.target.value)}>
            
            <LoadFillData/>
          </select>
        </div>
        <div className="form-group col-md-6">
          <label htmlFor="inputEmail4">Foto</label>
          <input
            type="text"
            className="form-control"
            placeholder="Foto"
            value={campFoto}
            onChange={(value) => setcampFoto(value.target.value)}
          />
        </div>
      </div>
      <button type="submit" class="btn btn-primary" onClick={() => SendUpdate()}>Update</button>
    </div>
  );

  function SendUpdate() {
    // url de backend
    if (selectGeneroId === "0") {
      alert("Escolha um Genero!")
  }
  else if (campFoto === "") {
      alert("Insira a Foto!")
  }
  else if (campTitulo === "") {
      alert("Insira o Titulo!")
  }
  else if (campDescricao === "") {
      alert("Insira a Descrição!")
  }else{
    const url = baseUrl + "/filmes/update/" + filmesId
    const datapost = {
      titulo: campTitulo,
      descricao: campDescricao,
      foto: campFoto,
      generoId: selectGeneroId,
    };
    axios.put(url, datapost)
      .then((response) => {
        if (response.data.success === true) {
          alert(response.data.message);
        } else {
          alert("Error");
        }
      })
      .catch((error) => {
        alert("Error 34 " + error);
      });
    }
  }

  function LoadFillData(){
    return dataGenero.map((genero) => {
        return(
        <option key={genero.id} value={genero.id}>{genero.descricao}</option>
    )
    });
}
}
