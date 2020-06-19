var param;
var paramValue;
var query;
query=window.location.search.substring(1).split("?");
for(i in query){
  param=query[i].split("=");
  paramValue=parseInt(param[1]);
}
var request;
  var idb=window.indexedDB || window.mozIndexedDB || window.msIndexedDB || window.webkitIndexedDB;
if(!idb in window){
  alert("Browser is not support");
}
var open=idb.open("StoreData",1);
console.log("IndexedDB is created");
open.onupgradeneeded=function(event){
  var request=event.target.result;
  var storeDB=request.createObjectStore("Formdata",{keyPath:"id",autoIncrement:true});
}
open.onerror=function(error){
  console.log("object store is not created",+error);
}
open.onsuccess=function(event){
  request=event.target.result;
  var transaction=request.transaction("Formdata","readwrite");
var storeDB=transaction.objectStore("Formdata");
var info=storeDB.get(paramValue);
info.onsuccess=function(data){
  console.log(data.target.result);
  display(data.target.result);
  education(data.target.result);
  skills(data.target.result);
}
}
var left=document.querySelector(".left");
var right=document.querySelector(".right");
function display(data){
var img=document.createElement("img");
img.src="images/girl.svg";
left.append(img);
var h2=document.createElement("h2");
h2.textContent=data.name;
left.append(h2);
var e=document.createElement("h3");
e.textContent=data.email;
left.append(e);
var de=document.createElement("h3");
de.textContent=data.role;
left.append(de);
var ph=document.createElement("h3");
ph.textContent=data.phone;
left.append(ph);
var i2=document.createElement('h2');
i2.textContent="Education Details";
right.append(i2);
var hr=document.createElement('hr');
right.append(hr);

}
var table=document.createElement("table");
table.border="1";
function education(data){


  let row='';
  row += "<th>"+"college/school"+"</th>"+"<th>"+"Degree"+"</th>"+"<th>"+"Branch"+"</th>"+
  "<th>"+"Marks"+"</th>";
  for (i in data.education){
  row += "<tr>"+
  "<td>"+data.education[i].college +"</td>"+
  "<td>"+data.education[i].degree +"</td>"+
  "<td>"+data.education[i].branch +"</td>"+
  "<td>"+data.education[i].marks +"</td>"+"</tr>";
  }
  table.innerHTML=row;
  right.append(table);

}
function skills(data)
{
  var i3=document.createElement('h2');
  i3.textContent="Technical skills";
  right.append(i3);
  var hr=document.createElement('hr');
  right.append(hr);
  var h2=document.createElement('h2');
  h2.textContent=data.skills;
  right.append(h2);
}
