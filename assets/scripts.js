timeElemList=document.getElementsByTagName("time");for(var i=0;i<timeElemList.length;i++)timeElemList[i].textContent=new Date(timeElemList[i].getAttribute("timestamp")).toLocaleDateString("fa-IR",{year:"numeric",month:"2-digit",day:"2-digit"});