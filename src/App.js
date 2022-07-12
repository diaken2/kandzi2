import logo from './logo.svg';
import './App.css';
import axios from 'axios'
import photo from "./dsd.png"
import {useState,useCallback, useEffect} from 'react'

 function App() {
  const [kandjiData,setKandjidata]=useState([])
  const [img, setImg]=useState()
  const [formForSend,setFormforSend]=useState({
    kandzi:'',
    read:'',
    translate:''

  })
 
  useEffect(()=>{axios.post("/api/temme").then(res=>{
    setKandjidata(res.data)
    console.log(res.data)
    
  })})
  
 
 
 
  let sendData=useCallback(async() => {
    
   try{
    const data=new FormData()
    data.append("kandzi", formForSend.kandzi)
    data.append("read", formForSend.read)
    data.append("translate", formForSend.translate)
    data.append("avatar", img)
    
    await axios.post('/api/create',data,{
      headers:{
        'content-type': 'multipart/form-data'
      }
    })
  .then(res=>console.log(res.data));

//   const data2=new FormData()
  
//   data2.append("avatar", img)
  
//   await axios.post('/api/create2',data2,{
//     headers:{
//       'content-type': 'multipart/form-data'
//     }
//   })
// .then(res=>console.log('Файл', res.data));
    
    
   }catch(e){console.log(e)}
    
  });
 
  function Block({kandzi,read,translate,image}){
    return <div id='mainblock'>
      
    <div id="block">
      <div>
      <div id="blockkandzi">{kandzi}</div>
        
      </div>
      <div id="blockreadandtranslate">
        <div id="blockread">{read}</div>
        <div id="blocktranslate">{translate}</div>
        </div>
        
    </div>
    <div id="blockphoto"><img width="330px" style={{
      border:"2px solid black"
    }} height="auto" src={image}/></div><br />
    </div>
  }
  return (
    <div className="App">
      <form action="/api/create" id='formkandzi'>
        <div id="kandzitext">
        <strong>Кандзи</strong>
        </div>
        <div id="kandziinput">
      <input id='kandzi' type="text" onChange={(e)=>{setFormforSend(prev=>({
        ...prev,
        kandzi:e.target.value
      }))}} name="kandzi" />
      </div>
      <div id="kandzitext">
        <strong>Чтение</strong>
        </div>
        <div id="readinput">
      <input id='read' type="text" name="read" onChange={(e)=>{setFormforSend(prev=>({
        ...prev,
        read:e.target.value
      }))}}/>
      </div>
      <div id="kandzitext">
        <strong>Перевод</strong>
        </div>
        <div id="translateinput">
      <input id='translate' type="text" name="translate"  onChange={(e)=>{setFormforSend(prev=>({
        ...prev,
      translate:e.target.value
      }))}} />
      </div>
      

      </form>
      
      <div id="contkandzibutton">
      
      <button id="buttonkandzi" onClick={sendData}><strong></strong>Добавить</button>
     
      </div>
      <div id="contadd">
      <input class="add" type="file" onChange={e=>setImg(e.target.files[0])}/>
      </div><br />
      
      {
        kandjiData.map((e)=>{
return <Block image={e.photo.path} kandzi={e.kandziword.kandzi} read={e.kandziword.read} translate={e.kandziword.translate} />
        }).reverse()
      }
      
      
    </div>
    
  );
}

export default App;
