var request;
  var idb=window.indexedDB || window.mozIndexedDB || window.msIndexedDB || window.webkitIndexedDB;
if(!idb in window){
  alert("Browser is not support");
}
var open=idb.open("StoreData",1);
console.log("IndexedDB is created");
open.onupgradeneeded=function(event){
  var request=event.target.result;
  request.createObjectStore("Formdata",{keyPath:"id",autoIncrement:true});
}
open.onerror=function(error){
  console.log("object store is not created",+error);
}
open.onsuccess=function(event){
  request=event.target.result;
  var transaction=request.transaction("Formdata","readwrite");
var storeDB=transaction.objectStore("Formdata");
var finalData=storeDB.getAll();
finalData.onsuccess=function(event){
console.log(event.target.result);
display(event.target.result);
}
}
function display(data)
{
  var p=document.querySelector(".p");
  for(var i=0;i<data.length; i++){
    var c=document.createElement("div");
    c.classList.add("c");
  var image=document.createElement("img");
  image.src="images/girl.svg";
  image.alt=data[i].name;
  var name=document.createElement("h2");
  name.textContent=data[i].name;
  var role=document.createElement("h2");
  role.textContent=data[i].role;

  var link=document.createElement("a");
  link.href="resume.html?id="+data[i].id;
  link.textContent="View Profile";
  c.append(image);
  c.append(name);
  c.append(role);
  c.append(link);
  p.append(c);
}
}
