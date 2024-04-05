import { useState, useEffect } from 'react'
import { Card } from './components/Card'
import { CardApi } from './components/CardApi'
import produtos from './constants/produtos.json'
import { api } from "./api/rmApi"
import style from './App.module.css'

import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css';
import "leaflet-defaulticon-compatibility";

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'

import { Modal, Button, Box, Typography } from '@mui/material';
import { BasicModal } from './components/BasicModal';

import Draggable from 'react-draggable';

function MapWithPlaceholder() {
  return (
    <MapContainer
      center={[-25.425017993503214, -49.27230300000001]}
      zoom={200}
      scrollWheelZoom={false}
      style={{ height: "80vh", width: "90vw" }}
    >
      <TileLayer
        noWrap={true}
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[-25.425017993503214, -49.27230300000001]}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
    </MapContainer>
  )
}

function App() {
  const [show, setShow] = useState("")
  const [data, setData] = useState([])
  const [page, setPage] = useState("")
  const [name, setName] = useState("")

  useEffect(() => {
    api.get(`/character/?page=${page}&name=${name}`).then((response) => {
      if (!response.data.results) {
        console.log("Vazio")
      }
      setData(response.data.results)
    }).catch((error) => {
      if (error.response.status === 404) {
        alert("Esta pagina nao contem este personagem")
      }
      console.error(error)
    })
  }, [page, name])

  return (
    <>
      <div className={style.wrapBtns}>
        <button onClick={() => setShow("prod")}>Produtos</button>
        <button onClick={() => setShow("api")}>API</button>
        <button onClick={() => setShow("map")}>Mapa</button>
      </div>
      <div className={style.wrapPage}>
        <h1>Exercícios de manutenção</h1>
        {show === "prod" &&
          <>
            <h2>Showroom de produtos</h2>
            <div style={{ display: "flex", flexWrap: "wrap" }}>
              {produtos.map((item) => {
                return (
                  <Card name={item.name} desc={item.desc} value={item.value} image={item.image} key={item.id} status={item.status} />
                )
              })}
            </div>
          </>
        }
        {show === "api" &&
          <>
            <h2>Rick and Morty API</h2>

            <div>
              <input className={style.filterInput} type="text" placeholder=" 1/43" value={page} onChange={(event) => setPage(event.target.value)} />
              <input className={style.filterInput} type="text" placeholder=" name" value={name} onChange={(event) => setName(event.target.value)} />
            </div>
            <div style={{ display: "flex", flexWrap: "wrap" }}>
              {data.map((item, index) => {
                return (
                  <Draggable>
                    <div key={index} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                      <CardApi name={item.name} species={item.species} image={item.image} status={item.status} type={item.type} gender={item.gender} />
                      <BasicModal index={index} item={item} />
                    </div>
                  </Draggable>
                )
              })}
            </div>
          </>
        }
        {show === "map" &&
          <>
            <h2>Mapa</h2>
            <div style={{ width: "100vw", display: "flex", justifyContent: "center" }}>
              <MapWithPlaceholder />
            </div>
          </>
        }
      </div>
    </>
  )
}

export default App
