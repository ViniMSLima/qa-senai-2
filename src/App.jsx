import { useState, useEffect } from 'react'
import { Card } from './components/Card'
import { CardApi } from './components/CardApi'
import produtos from './constants/produtos.json'
import { api } from "./api/rmApi"
import style from './App.module.css'

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
                  <Card name={item.name} desc={item.desc} value={item.value} image={item.image} key={item.id} status={item.status}/>
                )
              })}
            </div>
          </>
        }
        {show === "api" &&
          <>
            <h2>Rick and Morty API</h2>
            <div>
              <input className={style.filterInput} type="text" placeholder=" 1/43" value={page} onChange={(event) => setPage(event.target.value)}/>
              <input className={style.filterInput} type="text" placeholder=" name" value={name} onChange={(event) => setName(event.target.value)}/>
            </div>
            <div style={{display: "flex", flexWrap: "wrap"}}>
              {data.map((item) => {
                return (
                  <div key={item.id}>
                    <CardApi name={item.name} species={item.species} image={item.image} status={item.status} type={item.type} gender={item.gender}/>
                    {/* <button onClick={() => {}}>Info</button> */}
                  </div>
                )
              })}
            </div>
          </>
        }
        {show === "map" &&
          <>
            <h2>Mapa</h2>
            <div>
              mapa aqui
            </div>
          </>
        }
      </div>
    </>
  )
}

export default App
