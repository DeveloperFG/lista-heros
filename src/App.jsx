import * as React from 'react';
import {useState} from 'react';

import { AiFillCloseCircle } from "react-icons/ai";
import api from './api/api';
import './Styles/index.css'


function App() {
 
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const [load, setLoad] = useState(false);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

 const[values, setValues]= useState('')
 const[atk, setAtk]= useState('')
 const[avatar, setAvatar]= useState('')
 const[id, setId]= useState()
 const [lista, setLista] = useState( '' || [])

 const[index, setIndex]= useState()
 const [control, setControl] = useState(false)  


//  useEffect(()=>{
//     ListaHeros()
//  },[control])

function ListaHeros(){
  setLoad(true)

  const response = api.get('/lista')
  .then((res)=> 
    // console.log(res.data),
    setLista(res.data),
    setLoad(false)
  )
  .catch((erro)=> console.log('deu algum errro'))
    setLoad(false)
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

    alert('Atualizado com sucesso!')
    setId('')
    setValues('')
    setAtk('')
    setAvatar('')
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

  const filtrarHeroById = () =>{ 

    api.get(`/lista/${id}`, {
    
    }).then((res) => {

      setLista(res.data)
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

     
          <input placeholder='ID é gerado automático' style={{ flexDirection:'row', border:'1px solid black', backgroundColor:'transparent', width:'100%', height:'10px', marginBottom:'1%'}}
            value={id}
            onChange={(e)=> setId(e.target.value)}
          />


        
          <input  placeholder='Digite o nome' style={{ flexDirection:'row', border:'1px solid black', backgroundColor:'transparent', width:'100%', height:'10px', marginBottom:'1%'}}
            value={values}
            onChange={(e)=> setValues(e.target.value)}
          />

       
                  <input  placeholder='Digite o atk' style={{ flexDirection:'row', border:'1px solid black', backgroundColor:'transparent', width:'100%', height:'10px', marginBottom:'1%'}}
                    value={atk}
                    onChange={(e)=> setAtk(e.target.value)}
                  />

        <div style={{display:'flex', alignItems:"center", justifyContent:'center', width:'100%', flexDirection:'column', marginLeft:`${avatar != '' ? '5%' : ''}` }}>
                
                 <div style={{display:'flex', alignItems:"center", justifyContent:'center', width:'100%', }}>
                          <input  placeholder='Digite a url da imagem' style={{ flexDirection:'row', border:'1px solid black', backgroundColor:'transparent', width:'100%', height:'10px', marginRight:`${avatar != '' ? '2%' : ''}` }}
                              value={avatar}
                              onChange={(e)=> setAvatar(e.target.value)}
                        />

                  {avatar != '' ? <AiFillCloseCircle size={25} onClick={DeleteUrl}/> : ''}

               </div>
              

              
        </div>
                

          
      <div style={{display:'flex', width:'100%', flexDirection:'column' , marginBottom:'2%'}} >
          {/* <button onClick={ListaHeros}>LISTAR </button>  */}
          <button style={{width:"100%", marginBottom:'-1%'}} onClick={addListaHeros}>ADICIONAR </button>
          <button style={{width:"100%", marginBottom:'-1%'}} onClick={editeListaHeros}>ATUALIZAR</button>
          <button style={{width:"100%", marginBottom:'-1%'}} onClick={deletarHeros}>DELETAR </button>
          <button style={{width:"100%", marginBottom:'-1%'}} onClick={ListaHeros}>LISTAR TODOS HEROIS </button>
          <button style={{width:"100%"}} onClick={filtrarHeroById}>LISTA HEROI POR ID </button>
  
      </div>

      <div style={{display:'flex', alignItems:'center', justifyContent:'center', marginTop:'-20%'}}>
         

      </div>
       
      </div>
     


     <p style={{marginBottom:'5%', }}>LISTA DE HEROS NA API</p>


      {lista == '' ?  <small>Nenhum item cadastrado...</small> :
      <>
        {load ? 'Carregando' : 
        (
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
        )
        
        }
      
      </>
      
      }
      
    </div>
  )
}

export default App;
