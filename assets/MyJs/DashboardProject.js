
var host = location.origin


$(function() {
    const para = new URLSearchParams(window.location.search)
    var para_projectID = para.get("projectId");
     if(para_projectID == null)
     {
        console.log("bruh")
        $(location).attr('href', host + "/projects.html" );
     }
    
    $.ajax({
        url: "https://localhost:8080/API/Projects",
        type:"GET",
        headers: {"Authorization":'Bearer ' + jwt, "projectId" : para_projectID},
        contentType:"application/json; charset=utf-8",
        dataType:"json",
        success: function(data){
            console.log(data)
          
          //  setTicketList(data[0],data[1],data[2])
            switch(data.statusCode){
      
             
            }
        },
        error: function(data)
        {
          console.log(data)
        }
        
      })




function SetProjectsList(array)
{
  if(array.length > 0)
  {
    var project_dash_row= $('#projects_dash_row')
    console.log(project_dash_row)
    if(project_dash_row.length != 0)
    {

  
    var projects_dash = $('#projects_dash')
    var cloned_p_d_r = project_dash_row.clone()
    project_dash_row.remove();
    var title = cloned_p_d_r.children("td").children("#dr_Title")
    var description = cloned_p_d_r.children("td").children("#dr_Description")
    var data = cloned_p_d_r.children("#list")

    for(var i =0; i < array.length; i++)
    {
     

      data.children("#companyId")[0].value = array[i].companyId
      data.children("#projectId")[0].value = array[i].projectId
      console.log(data.children("#projectId")[0].value)
      title.html(array[i].name)
      description.html(array[i].description)
      cloned_p_d_r.clone().appendTo(projects_dash);
    }
  }
} 
}


function setTicketList(array,array2,array3)
{
    var tickets_dash_row= $('#tickets_dash_row')
    
    var ticket_dash = $('#tickets_dash')
    var cloned_t_d_r = tickets_dash_row.clone()
    tickets_dash_row.remove();
    var td = cloned_t_d_r.children("td")
    var title = td.children("#dr_Title")
    var project = td.children("#dr_Project")
    var status = td.children("#dr_Status")
    var AssignedTo = td.children("#dr_Assigned")
    var priority = td.children("#dr_Priority")
    var data = cloned_t_d_r.children("#list")
    var datecreated = td.children("#dr_Created")
    if(tickets_dash_row.length != 0)
    {

  
    for(var i =0; i < array.length; i++)
    {
     
      for(var j=0; j< array3.length; j++)
      {
        if(array[i].assignedTo == array3[j].userId)
        {
         
          AssignedTo.html(array3[j].firstName + " " + array3[j].lastName)
          break;
        }
      }
      for(var j=0; j< array2.length; j++)
      {
      
        if(array[i].projectId == array2[j].projectId)
        {
        
          project.html(array2[j].name)
          break;
        }
      }
      var date =  new Date(array[i].dateStart)
      let value = new Intl.DateTimeFormat('en-Us', date_options).format(date);
      data.children("#companyId")[0].value = array[i].companyId
      data.children("#projectId")[0].value = array[i].projectId
      data.children("#ticketId")[0].value = array[i].ticketId
      
      console.log(data.children("#ticketId")[0].value)
      title.html(array[i].name)
      datecreated.html(value)
      status.html(array[i].status)
      priority.html(array[i].priority)
      cloned_t_d_r.clone().appendTo(ticket_dash);
    }
  }
}

})