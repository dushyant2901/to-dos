//selectors
const toDoInput = document.querySelector(".todo-input")
const toDoBtn = document.querySelector(".todo-btn")
const toDoList = document.querySelector(".todo-list")
const filterOption = document.querySelector(".filter-todo")


//Adding Event Listeners
toDoBtn.addEventListener("click",checkInput)//here it was addtodo
toDoList.addEventListener("click",deletecheck)
filterOption.addEventListener("click",filterToDo)
document.addEventListener("DOMContentLoaded",getToDos)


//Functions
function addToDo(event){//removed event param as it was being used to stop predefault and we took care of that in checkinput as it has to be used at the first function we are calling while clicking on  that function
    //Preventing Form From Auto-Submitting
   // event.preventDefault();
   
 //Creating toDoDiv 
 const toDoDiv =document.createElement("div");
 toDoDiv.classList.add("toDo");
 
 //creating li
 const newToDo =document.createElement("li");
 newToDo.classList.add("newToDo");
 newToDo.innerText=toDoInput.value;
 toDoDiv.appendChild(newToDo);

 //Storing user input to Local Storage
 saveToDo(toDoInput.value)


//Creating Check Button
 const checkButton =document.createElement("button");
 checkButton.classList.add("checkButton");
 toDoDiv.appendChild(checkButton);
 checkButton.innerText="hhh"

 //Creating Trash Button
 const trashButton =document.createElement("button") ;
 trashButton.classList.add("trashButton") ;
 toDoDiv.appendChild(trashButton);
 trashButton.innerText="hhh"

 //Appending toDoDiv to toDoList
toDoList.appendChild(toDoDiv);


/*
console.log((toDoInput.value.length))
it is adding even when no input is given to it so to prevent it we will use a if condition and in value it is not showing null/undefined because at the end of click event we are assigning it an empty string so we will use .length property to prevent it .
it didnt work cause 
if(todoinput.value.length!==0){
    whole code till append
}else{
    todolist.innerhtml=`write something`  ---this thing was overwriting already added list as well and was showing zero list .to prevent this we tried to add .innerhtml as blank string to overwrite this one in if condition but it was also not helpfull 
}
*/
//Clearing input after adding
toDoInput.value=""


}


function deletecheck(e){
    console.log(e.target,e.target.classList)
    document.querySelector("#text").style.display="none"
    const item=e.target

   if(item.classList[0]==="trashButton"){
     removeToDo(item.parentElement)
      // item.remove() it will just remove the del button nothing else
      //item.parentElement.remove()
      item.parentElement.classList.add("fall") //but this alone wont work as it is removing the parent element as soon as it is clicked so to prevent it we will use transistionend
      item.parentElement.addEventListener("transitionend",()=>{
        item.parentElement.remove()
      })
    }

    if(item.classList[0]==="checkButton"){
       
       /*toDoDiv.classList.toggle("completed") not working as it dont have access to it inside this function we have given access to iy in previoous one
       const toD = document.querySelector(".toDo")
       toD.classList.toggle("completed")
       this will work*/
 const toDo=item.parentElement
 toDo.classList.toggle("completed")
 //this class wont effect the del button because it is deleting the parent element and this class affects parent element
 

      }

}

function filterToDo(e){
  //document.querySelector("#text").innerHTML=""
  //document.querySelector("#text").style.visibility="hidden"
  document.querySelector("#text").style.display="none"
  //const todos=toDoList.childNodes
  //console.log(todos)
  //console.log(toDoList.children)
  //console.log(todos.classList.value.includes("completed"))
  const tdos=toDoList.children
 const todos=Array.from(tdos)//ye hai mera wala method
  todos.forEach((todo)=>{
console.log(todo.classList)
switch(e.target.value){
case "all":
  todo.style.display="flex";
break
case "completed":
if(todo.classList.contains("completed")){
  todo.style.display="flex";
}else{
  todo.style.display="none"
}
break
case "uncompleted":
  if(!todo.classList.contains("completed")){
    todo.style.display="flex"
  }else{
    todo.style.display="none"
  }

break
}
  })

}


function saveToDo(todo){

  let todos;
  if(localStorage.getItem("todos")===null){
    todos=[];
  }else{
    todos=JSON.parse(localStorage.getItem("todos"));
  }
  todos.push(todo);
  localStorage.setItem("todos",JSON.stringify(todos));
}

function getToDos (todo){
  //document.querySelector("#text").style.visibility="hidden"
  document.querySelector("#text").style.display="none"
  console.log("hi")
  let todos;
  if(localStorage.getItem("todos")===null){
    todos=[];
  }else{
    todos=JSON.parse(localStorage.getItem("todos"));
  }

  todos.forEach(todo=>{

   //Creating toDoDiv 
 const toDoDiv =document.createElement("div");
 toDoDiv.classList.add("toDo");
 
 //creating li
 const newToDo =document.createElement("li");
 newToDo.classList.add("newToDo");
 newToDo.innerText=todo;
 toDoDiv.appendChild(newToDo);

 


//Creating Check Button
 const checkButton =document.createElement("button");
 checkButton.classList.add("checkButton");
 toDoDiv.appendChild(checkButton);
 checkButton.innerText="hhh"

 //Creating Trash Button
 const trashButton =document.createElement("button") ;
 trashButton.classList.add("trashButton") ;
 toDoDiv.appendChild(trashButton);
 trashButton.innerText="hhh"

 //Appending toDoDiv to toDoList
toDoList.appendChild(toDoDiv);


  })

}

function removeToDo(todo){
  let todos;
  if(localStorage.getItem("todos")===null){
    todos=[];
  }else{
    todos=JSON.parse(localStorage.getItem("todos"));
  }
  let todoIndex=todo.children[0].innerText
todos.splice(todos.indexOf(todoIndex),1)
localStorage.setItem("todos",JSON.stringify(todos));
}

//we added it
function checkInput(event){
  event.preventDefault();
 
  if(toDoInput.value===""){ document.querySelector("#text").innerHTML=`Write something to add`;
    document.querySelector("#text").style.display="block"
    //document.querySelector("#text").style.visibility="visible"
  }
 else{//document.querySelector("#text").style.visibility="hidden"
 document.querySelector("#text").style.display="none"
   addToDo(event)
 }
}