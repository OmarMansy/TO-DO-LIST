import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleCheck, faPen,faTrashCan } from '@fortawesome/free-solid-svg-icons'

import './App.css'

function App() {
  const [todo, settodo]=useState([]); 
  const [newtask, setnewtask]=useState('');
  const [updatedata, setupdatedata]=useState('');

const addtask =()=>{
  if(newtask){
let num=todo.length+1;
let newentry={"id":num,"title":newtask,"status":false};
settodo([...todo,newentry]);
setnewtask('');
}
}
const deletetask = (id)=>{
let newtasks=todo.filter((task)=>task.id !== id)
settodo(newtasks);
}
const markdone = (id)=>{
let newtask=todo.map(task=>{
  if(task.id===id){
    return({...task,status:!task.status})
  }
  return task;
})
settodo(newtask);
}
const cansleupdate = ()=>{
  setupdatedata('');
}
const changetask = (e)=>{
  let newentry={
    id:updatedata.id ,
    title:e.target.value,
    status:updatedata.status?true:false
  };
  setupdatedata(newentry)
  
}
const updatetask = ()=>{
  let filterrecords=[...todo].filter(task=>task.id!==updatedata.id);
  let updateobject=[...filterrecords,updatedata];
  settodo(updateobject);
  setupdatedata('')
}









  return (
 <div className="container APP">

  <br /><br />
  <h2>To Do List APP (REACT js)</h2>
  <br /><br />
{updatedata?( <>
<div className="row">
    <div className="col">
     <input
     value={updatedata&&updatedata.title}
     onChange={(e)=>changetask(e)}
      class="form-control form-control-lg"/>
    </div>
    <div className="col-auto">
     <button 
     onClick={updatetask}
     class="btn btn-success btn-lg mr-20">update</button> 
     <button
     onClick={cansleupdate}
     class="btn btn-warning btn-lg">cansle</button> 
    </div>
</div>
<br />
</>
):(
  <> 
   <div className="row">

       <div className="col">
        <input
        value={newtask}
        onChange={(e)=>{setnewtask(e.target.value)}}
         class="form-control form-control-lg"/>
       </div>
       <div className="col-auto">
        <button class="btn btn-success btn-lg" onClick={addtask}>Add Task</button> 
       </div>
  </div>
  <br />
  </>
)
}

  {todo && todo.length?'':"NO Tasks...."}


  {todo.sort((a,b)=>a.id>b.id?1:-1)
  .map( (task,index)=>{
  return( < >
      <div className="col taskBg">
          <div className={task.status? 'done' : ''}>
              <span className='tasknumber'> {index + 1} </span>
              <span className='tasktext'> {task.title} </span>
          </div>
          <div className='iconswrap'>
            <span title='completed/not completed'
            onClick={()=>{markdone(task.id)}}
            ><FontAwesomeIcon icon={faCircleCheck}/></span>
            {task.status? null:(
            <span title='edit'
            onClick={()=>setupdatedata({
              id:task.id ,
              title:task.title,
              status:task.status?true:false
            })}
            >
              <FontAwesomeIcon icon={faPen}/></span>)}
            
            <span title='delete'
            onClick={()=>{deletetask(task.id)}}
            ><FontAwesomeIcon icon={faTrashCan}/></span>
          </div>
      </div>
          </>)})}



          




 </div>
  )
}

export default App
