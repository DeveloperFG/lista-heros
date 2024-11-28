import React,{ useState, useEffect } from 'react'
import { AiFillCloseCircle } from "react-icons/ai";

import api from './api/api';

import './Styles/index.css'



function App() {
 

 const[values, setValues]= useState('')
 const[atk, setAtk]= useState('')
 const[avatar, setAvatar]= useState('')
 const[id, setId]= useState()
 const [lista, setLista] = useState( '' || [])

 const[index, setIndex]= useState()
 const [control, setControl] = useState(false)



 useEffect(()=>{
    ListaHeros()
 },[control])

function ListaHeros(){
  const response = api.get('/lista')
  .then((res)=> 
    // console.log(res.data),
    setLista(res.data)
  )
  .catch((erro)=> console.log('deu algum errro'))
  
}

const addListaHeros = () =>{ 

  let idCreate = lista.length

  api.post("/lista", {
    id: idCreate + 1,
    nome: values,
    atk: atk,
    avatar: avatar
  
  }).then((res) => {

    let data = []

    data.push = {
      id: idCreate,
      name: values,
      atk: atk,
      avatar: avatar
  }
    setLista(list => [...list, data])

    setControl(!control)
    setValues('')
    setAtk('')
    setAvatar('')
    setId('')

  }).catch((err)=>{
    console.log('deu algum erro!' + err)
  })
}

const selecionarHeros = (item) =>{
    const ind = lista.findIndex((e) => e.nome === item.nome)

    setIndex(ind)
    setId(item.id)
    setValues(item.nome)
    setAtk(item.atk)
    setAvatar(item.avatar)
}

const editeListaHeros = () =>{ 

  api.put(`/lista/${id}`, {
    nome: values,
    atk: atk,
    avatar: avatar

  }).then((res) => {

    let data = []
    data.push = {
      name: values,
      atk: atk,
      avatar: avatar
  }

    alert('Editado com sucesso!')
    setLista(list => [...list ])
    setControl(!control)

  }).catch((err)=>{
    console.log('deu algum erro!' + err)
  })

}

const deletarHeros = () =>{ 

  api.delete(`/lista/${id}`, {
  
  }).then((res) => {

    // console.log(res.data)

    let data = []
    data.push = {
      name: values,
      atk: atk,
      avatar: avatar
  }

    alert('Deletado com sucesso!')
    setLista(list => [...list ])
    setId('')
    setValues('')
    setAtk('')
    setAvatar('')
    setControl(!control)

  }).catch((err)=>{
    console.log('deu algum erro!' + err)
  })

}

 
const DeleteUrl = () => {
    setAvatar('')
}


  return (
    <div className="container">
      <h1 style={{marginTop:'5%', marginBottom:'5%'}}>CRUD HEROS </h1>
      

      <div style={{width:'73%', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:"center"}}>

      <small>Digite o id:</small>
          <input style={{ flexDirection:'row', border:'1px solid blue', backgroundColor:'transparent', width:'100%', height:'10px'}}
            value={id}
            onChange={(e)=> setId(e.target.value)}
          />


          <small>Digite o nome:</small>
          <input style={{ flexDirection:'row', border:'1px solid blue', backgroundColor:'transparent', width:'100%', height:'10px'}}
            value={values}
            onChange={(e)=> setValues(e.target.value)}
          />

        <small>Digite o atk :</small>
                  <input style={{ flexDirection:'row', border:'1px solid blue', backgroundColor:'transparent', width:'100%', height:'10px'}}
                    value={atk}
                    onChange={(e)=> setAtk(e.target.value)}
                  />

        <div style={{display:'flex', alignItems:"center", justifyContent:'center', width:'100%', flexDirection:'column', marginLeft:`${avatar != '' ? '5%' : ''}` }}>
                  <small>Avatar:</small>
                 <div style={{display:'flex', alignItems:"center", justifyContent:'center', width:'100%', }}>
                          <input style={{ flexDirection:'row', border:'1px solid blue', backgroundColor:'transparent', width:'100%', height:'10px', marginRight:`${avatar != '' ? '2%' : ''}` }}
                              value={avatar}
                              onChange={(e)=> setAvatar(e.target.value)}
                        />

                  {avatar != '' ? <AiFillCloseCircle size={25} onClick={DeleteUrl}/> : ''}

               </div>
              

              
        </div>
                

          
      <div style={{display:'flex', alignItems:'center', justifyContent:'center'}}>
          <button style={{ width:'150px', height:'30px', marginRight:'5px'  }} onClick={ListaHeros}>LISTAR </button>
          <button style={{  width:'150px', height:'30px', marginRight:'5px' }} onClick={addListaHeros}>ADICIONAR </button>
      </div>

      <div style={{display:'flex', alignItems:'center', justifyContent:'center', marginTop:'-20%'}}>
          <button style={{ width:'150px', height:'30px', marginRight:'5px' }} onClick={editeListaHeros}>EDITAR </button>
          <button  style={{  width:'150px', height:'30px',marginRight:'5px' }}  onClick={deletarHeros}>DELETAR </button>

      </div>
       
      </div>
     


     <p style={{marginBottom:'5%', }}>LISTA DE HEROS NA API</p>


      {lista == '' ?  <small>Nenhum item cadastrado...</small> :
      <>
        {lista.map((item, index)=>{
          return(
            <div key={index} style={{ width:'80%', height:'aito', display:'flex',
                backgroundColor:'gray', padding:'2%',alignItems:'center', justifyContent:'space-between', borderRadius: 5, margin: 3,}} onClick={()=> selecionarHeros(item)}>
                  <div style={{display:'flex', alignItems:'center', justifyContent:'center'}}>
                      <img
                        width={60}
                        height={60}
                        style={{objectFit:'contain'}}
                        src={item.avatar}
                      />
                  <span style={{color:"#fff"}}>{item.nome}</span>
                  </div>
                  
                <span style={{color:"#fff"}}>{item.atk}</span>
            </div>
          )
        })}
      
      </>
      
      }
      
    </div>
  )
}

export default App;
