var serverURL="http://restclass.azurewebsites.net/API2/Todos";
var todos =[];

function addToDo(){
    console.log("Adding a new task") ;
//get the value from input
var text=$("#txt-task").val();
var todo={
    text:text,
    user:"Nora",
    state: 0 //new
};

if(text!=""){
    console.log(text); 
    $("#txt-task").val(""); //clear the input
    //display
    displayToDo(todo);
}else{
    alert("You Have to enter task");
    }
//set the focus to the input
$("#txt-task").focus(); 
//send the object to the backend

$.ajax({
url:serverURL,
type:"POST",
contentType:"application/json",
data: JSON.stringify(todo),
success: function (res) {
    console.log(res);
},
error:function(error){
    console.error("error saving", error);
}
});

}

function displayToDo(todo){

    if(todo.state==0){
    //create the list item templete
    var li=`<li id="${todo.id}"> ${todo.text} <button onclick=markDone(${todo.id})> Done </button> </li>`;
   //display the li under the ul
   $("#pending-list").append(li);
    }
    else{
    var li2=`<li> ${todo.text}</li>`;
    $('#doneTodos').append(li2);
    }
}

function markDone(id){
    console.log("Item Done",id);
    $('#'+id).remove();

    //find on the todos array the one with the id=id
    for(var i=0; i<todos.length;i++){
            if(todos[i].id==id){
                todos[i].state=1;
                displayToDo(todos[i]);
            }
    }
}

function loadData(){
//load data 
//display todos

$.ajax({
    url: serverURL,
    type: "GET",
    success: function(res){
        console.log ("server responded");

        for(let i=0; i < res.length; i++){
            if (res[i].user=="Nora") {
            console.log("This item is mine");
            todos.push(res[i]);
            displayToDo(res[i]);
        }
    }
},
error: function (error){
    console.error("Error getting data", error);
}
});
}
function init(){
    console.log("Init the to do app");
    //sensing the user actions/events
    //document.getElementById("btn-add");
    $("#btn-add").click(addToDo);

    $("#txt-task").keypress(function(e){
        console.log(e.key);
        if(e.key==="Enter"){
            console.log("Add a new task");
            addToDo();
        }
    });

    loadData();
}
    
//when the browser finishes rendering html, excute init
window.onload=init;