
let todoListContEL = document.getElementById("todoListCont");

let userInEL = document.getElementById("userIn");

let erroMsgEl = document.getElementById("errorMsg");

// let todoList =[

// {
//     title : "HTML",
//     id :1
    
// },
// {
//     title : "CSS",
//     id : 2
   
// },
// {
//     title : "JAVASCRIPT",
//     id : 3
// }
// ]




function onGetParseTodo(){

    let myTodoList = localStorage.getItem("myTodoList");

   if( myTodoList === null ){

     return[];

   } 
   else{

    let parseTodo = JSON.parse( myTodoList );

    return parseTodo;

   }
   

}

let todoList = onGetParseTodo();



// --------------------------------------------------------------------------------------------------------------------


 function onStatusChanged( checkBoxId , titleId , todoId ){
    
    let checkboxEl = document.getElementById( checkBoxId );

    let titleEl = document.getElementById( titleId );

    if( checkboxEl.checked === true ){

        titleEl.classList.add("checked");
    }
    else{

        titleEl.classList.remove("checked");

    }
    let newTodo = todoId.slice(4);

    let index = todoList.findIndex((each)=>each.id == newTodo);


    for(let i=0; i < todoList.length; i++){
        
        
        if(index === i){

            if(todoList[i].isChecked === false){

                todoList[i].isChecked = true;

            }

            else{

                todoList[i].isChecked = false;

            }
        }
    }
    
   
}



function  onDeleteTodo( todoId ){

    let myTodo = document.getElementById( todoId );

    todoListContEL.removeChild( myTodo );

    let newTodo = todoId.slice(4);

    let index = todoList.findIndex((each)=>each.id == newTodo);

    todoList.splice(index,1);
    console.log(todoList);
}



function createAndAppendTodo( todo ){

    let checkBoxId = "myCheckBox" + todo.id;
    let titleId = "myTitle" + todo.id;
    let todoId = "todo" + todo.id;

    let listCont = document.createElement("li");
    listCont.classList.add("list-cont");
    listCont.id = todoId;
    todoListContEL.appendChild(listCont);

    let checkboxEl = document.createElement("input");
    checkboxEl.id = checkBoxId;
    if( todo.isChecked === true){
        checkboxEl.checked = true;
    }
    checkboxEl.type = "checkbox";
    checkboxEl.onclick = function(){
        onStatusChanged( checkBoxId , titleId, todoId );
    }
    listCont.appendChild(checkboxEl);

    let labelEl = document.createElement("label");
    labelEl.htmlFor = checkBoxId;
    labelEl.classList.add("label-card");
    listCont.appendChild(labelEl);

    let titleEl = document.createElement("h4");
    titleEl.textContent = todo.title;
    titleEl.id = titleId;
    if(todo.isChecked === true){
        titleEl.classList.add("checked");
    }
    labelEl.appendChild( titleEl );

    let deleteBtnEl = document.createElement("button");
    deleteBtnEl.classList.add("delete-btn");
    deleteBtnEl.onclick = function(){
        onDeleteTodo( todoId );
    }
    labelEl.appendChild( deleteBtnEl );

    let iconEl = document.createElement("i");
    iconEl.classList.add("fa-solid","fa-trash");
    deleteBtnEl.appendChild(iconEl);

}




for (each of todoList){

    createAndAppendTodo( each );

}


function onAddTodo(){

    let date = new Date();

    let uniqueId = Math.ceil(Math.random()* date.getTime());

    let newTodo ={
        title : userInEL.value,
        id : uniqueId,
        isChecked : false

    }

    if(userInEL.value ===""){

        erroMsgEl.textContent = "Please provide valid input!!!!"

    }
    else{
        
        createAndAppendTodo( newTodo );
        todoList.push( newTodo );
        erroMsgEl.textContent = "";
        userInEL.value = "";
    }
}

function onSaveTodo(){

    let stringyFyTodo = JSON.stringify(todoList);

    localStorage.setItem( "myTodoList", stringyFyTodo );
}