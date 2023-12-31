import React, { useEffect, useState} from 'react';
import Axios from "axios";
import Container from "react-bootstrap/Container";
import { useAuth } from "../Contexts/AuthContext";
import '../styles/userstatistics.css';
import {Pie} from "react-chartjs-2"
import { Chart, ArcElement, CategoryScale, Title, Tooltip, Legend } from 'chart.js';
import 'chartjs-plugin-datalabels';

Chart.register(ArcElement, CategoryScale, Title, Tooltip, Legend);

export default function UserStatistics() {
  const [GenderList, setGender]=useState([]);
  const [AgeList, setAge]=useState([]);
  const [MyRole, setRole]=useState([]);
  const { authUser, setAuthUser, isLoggedIn, setIsLoggedIn } = useAuth();
  const [chartData, setChartData] = useState({});

  const getStatsgender = ()=>{
    Axios.get("http://localhost:3001/statsgender", {
    }).then((response)=>{
      setGender(response.data);
      /*alert("Mostrando Mis Planes");*/
  })
}

const getMyRole = (id)=>{
  Axios.get("http://localhost:3001/searchMyRole", {
    params: {
      id: id
    }
  }).then((response)=>{
    setRole(response.data);
    /*alert("Mostrando Mis Planes");*/
})
}

const getStatsAge = ()=>{
  Axios.get("http://localhost:3001/statsage", {
  }).then((response1)=>{
    setAge(response1.data);
    /*alert("Mostrando Mis Planes");*/
})
}
  useEffect(() => {
    getStatsgender();
    getStatsAge();
    if(authUser){//Si esta loggeado
      getMyRole(authUser.idUser);//Obtener el tipo de rol del usuario
    }
  }, []);

  const dataGender={
    labels:['Masculino','Femenino','Bombastik'],
    datasets:[{
      data :[54.56,38.23,7.21],
      backgroundColor:['#0525F3','#D305F3','#F3DA05']
    }]
  }
  const opciones = {
    responsive: true,
    legend:{
      display:true,
      position: "bottom" 
    },
    datalabels: {
      color: '#fff',
      formatter: (value, ctx) => {
        let datasets = ctx.chart.data.datasets;
        if (datasets.indexOf(ctx.dataset) === datasets.length - 1) {
          let sum = datasets[0].data.reduce((a, b) => a + b, 0);
          let percentage = Math.round((value / sum) * 100) + '%';
          return percentage;
        } else {
          return null;
        }
      },
    },
  }
  return (
    <>
      <Container fluid className='ContenedorEstadisticasUsuario'>
        <center>
              <h1 className="Titulos">
                  Estadisticas de Usuarios
              </h1>
              <div>
              {MyRole[0]?.role === "ADMIN" ? (
                <div>
                  {AgeList.map((val,key)=>{
                    return(
                      <div style={{textAlign: 'left', width:"1000px"}}>
                          <p><strong>Número de Miembros Plantastik:  </strong>{val.EdadA+val.EdadB+val.EdadC+val.EdadD+val.Otro}</p>
                      </div>
                    )
                })}
                <div className="Estadisticas">
                  <h2 className="Subtitulos">
                      Estadisticas Por Genero de los Usuarios Registrados
                  </h2>
                  Los generos de los usuarios que se encuentran registrados en la Plantastik se encuentran distribuidos de la siguiente manera
                  <br>
                  </br>
                  <br>
                  </br>
                  <div className='ContenedorEstadisticas'>
                    {GenderList.map((val,key)=>{
                        return(
                          <center>
                            <table key={key}>
                                <tr>
                                    <th>Genero</th>
                                    <th>Número de Usuarios</th>
                                </tr>
                                <tr>
                                    <td>Femenino</td>
                                    <td>{val.Femenino}</td>
                                </tr>
                                <tr>
                                    <td>Maculino</td>
                                    <td>{val.Masculino}</td>
                                </tr>
                                <tr>
                                    <td>Bombastik</td>
                                    <td>{val.Bombastik}</td>
                                </tr>
                                <tr>
                                  <td><strong>Total</strong></td>
                                  <td><strong>{val.Femenino+val.Masculino+val.Bombastik}</strong></td>
                                </tr>
                            </table>
                          </center>
                        )
                    })}
                    <div className='ContenedorTorta'>
                    {GenderList.map((val,key)=>{
                      const datos=[val.Masculino,val.Femenino,val.Bombastik];
                      return(
                      <Pie data={crearDataGender(datos)} options={opciones} className='PieChart'/>)
                    })}
                    </div>
                  </div>
              </div>
              <div className="Estadisticas">
                  <h2 className="Subtitulos">
                      Estadisticas Por Edad de los Usuarios Registrados
                  </h2>
                  Los usuarios que se encuentran registrados en Plantastik, se encuentran distribuidos de la siguiente manera en este rango de edad
                  <br>
                  </br>
                  <br>
                  </br>
                  <div className='ContenedorEstadisticas'>
                    {AgeList.map((val,key)=>{
                        return(
                          <center>
                          <table key={key}>
                              <tr>
                                  <th>Limite Inferior Edad</th>
                                  <th>Limite Superior Edad</th>
                                  <th>Numero de Usuarios</th>
                              </tr>
                              <tr>
                                  <td>18 Años</td>
                                  <td>24 Años</td>
                                  <td>{val.EdadA}</td>
                              </tr>
                              <tr>
                                  <td>25 Años</td>
                                  <td>40 Años</td>
                                  <td>{val.EdadB}</td>
                              </tr>
                              <tr>
                                  <td>41 Años</td>
                                  <td>60 Años</td>
                                  <td>{val.EdadC}</td>
                              </tr>
                              <tr>
                                  <td>61 Años</td>
                                  <td>100 Años</td>
                                  <td>{val.EdadD}</td>
                              </tr>
                              <tr>
                                  <td>101 Años</td>
                                  <td>150 Años</td>
                                  <td>{val.Otro}</td>
                              </tr>
                              <tr>
                                  <td><strong>Total</strong></td>
                                  <td></td>
                                  <td><strong>{val.EdadA+val.EdadB+val.EdadC+val.EdadD+val.Otro}</strong></td>
                              </tr>
                          </table>
                        </center>
                        )
                    })}
                    <div className='ContenedorTorta'>
                    {AgeList.map((val,key)=>{
                      const datos=[val.EdadA,val.EdadB,val.EdadC,val.EdadD,val.Otro];
                      return(
                      <Pie data={crearDataAge(datos)} options={opciones} className='PieChart'/>)
                    })}
                    </div>
                  </div>
              </div>
                </div>
              ) : (
                <div>Este Contenido Se encuentra Límitado Únicamente para usuarios que han iniciado sesión en un rol de <strong>ADMINISTRADOR</strong></div>
              )}
              </div>
              
        </center>
      </Container>
    </>
  )
}
function crearDataAge(data) {
  return {
    labels: ['18 a 24 Años','25 a 40 Años','41 a 60 Años','61 a 100 Años', 'Otra Edad'],
    datasets: [{
      data: data,
      backgroundColor: ['#F3E505','#CCC108','#FEF554','#A29C39','#E7CEA1']
    }]
  };
}
function crearDataGender(data){
  return{
    labels:['Masculino','Femenino','Bombastik'],
    datasets:[{
      data :data,
      backgroundColor:['#0525F3','#D305F3','#F3DA05']
    }]
  }
}
