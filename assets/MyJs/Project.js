
var host = location.origin

const loader = $('.loader')

$(function() {
    const para = new URLSearchParams(window.location.search)
    var para_projectID = para.get("projectId");
    console.log(para_projectID)
     if(para_projectID == null)
     {
        console.log("bruh")
        $(location).attr('href', host + "/projects.html" );
     }else
      $.ajax({
        url: "http://localhost:8080/API/Project",
        type:"GET",
        headers: {"Authorization":'Bearer ' + jwt, "projectId" : para_projectID},
        contentType:"application/json; charset=utf-8",
        dataType:"json",
        success: function(data,code){
          console.log(code)
          console.log(data)
           if (code == "success"){
            setProjectTitle(data[2])
            SetAssignedList(data[1])
            setTicketList(data[0],data[1])
            loader.hide()
           }
        },
        error: function(data)
        {
          
          if (data.status == 400) {
            $(location).attr('href', host + "/projects.html" );

          }
          
        }
        
        
      })
     
    
  


function setProjectTitle(array){
  var title = $("#page_project")
  var desc = $("#page_project_description")
  title.html(array.Name)
  desc.html(array.Description)
}

function SetAssignedList(array)
{
  if(array.length > 0)
  {
    var assigned_dash_row= $('#assigned_dash_row')

    if(assigned_dash_row.length != 0)
    {

  
    var assigned_dash = $('#assigned_dash')
    var cloned_p_d_r = assigned_dash_row.clone()
    assigned_dash_row.remove();
    var Name = cloned_p_d_r.children("td").children("#dr_Name")
    var Email = cloned_p_d_r.children("td").children("#dr_Email")
    var Role = cloned_p_d_r.children("td").children("#dr_Role")
    var data = cloned_p_d_r.children("#list")

    for(var i =0; i < array.length; i++)
    {
     
      Name.html(array[i].FirstName + " " + array[i].LastName)
      Email.html(array[i].Email)
      Role.html(array[i].Role)
      cloned_p_d_r.clone().appendTo(assigned_dash);
    }
  }
} 
}


function setTicketList(array,array2)
{
  if(array != null)
  {
    var tickets_dash_row= $('#tickets_dash_row')
    
    var ticket_dash = $('#tickets_dash')
    var cloned_t_d_r = tickets_dash_row.clone()
    tickets_dash_row.remove();
    var td = cloned_t_d_r.children("td")
    var title = td.children("#dr_Title")
    var createdBy = td.children("#dr_CreatedBy")
    var status = td.children("#dr_Status")
    var AssignedTo = td.children("#dr_AssignedTo")
    var priority = td.children("#dr_Priority")
    var data = cloned_t_d_r.children("#list")
    var datecreated = td.children("#dr_Created")
    if(tickets_dash_row.length != 0)
    {

  
    for(var i =0; i < array.length; i++)
    {
     
      for(var j=0; j< array2.length; j++)
      {
      
        if(array[i].AssignedTo == array2[j].Id)
        {
      
          AssignedTo.html(array2[j].FirstName + " " + array2[j].LastName)
          break;
        }
      }
      
      for(var j=0; j< array2.length; j++)
      {
      
        if(array[i].CreatedBy == array2[j].Id)
        {
      
          createdBy.html(array2[j].FirstName + " " + array2[j].LastName)
          break;
        }
      }
//var date =  new Date(array[i].dateStart)
    //  let value = new Intl.DateTimeFormat('en-Us', date_options).format(date);
   
      data.children("#ticketId")[0].value = array[i].Id
      
      console.log(data.children("#ticketId")[0].value)
      title.html(array[i].Name)
     //datecreated.html(value)
      switch(array[i].Status){
        case "Open": 
      status.addClass("badge-outline-success")
        break;
        case "In Progress": 
        status.addClass("badge-outline-warning")
        break;
        case "Resolved": 
        status.addClass("badge-outline-primary")
         break;
        case "Closed": 
        status.addClass("badge-outline-danger")
        break;
      }
      
      status.html(array[i].Status)
      priority.html(array[i].Priority)
      cloned_t_d_r.clone().appendTo(ticket_dash);
    }
  }
}
}

})