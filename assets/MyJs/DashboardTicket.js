$(function() {
 
    var host = location.origin

    'use strict';
    const para = new URLSearchParams(window.location.search)
    var para_projectID = para.get("projectId");
    var param_ticketID = para.get("ticketId");




var graph_priority_Priority = ["Low","Moderate","High","Urgent"]
var graph_priority_Data = [0,0,0,0]
var graphBar_Data = [0,0,0,0]
var graphBar =  ["Open", "In Progress", "Resolved", "Closed"];
var graph_priority_Data_Text = 0;

const date_options = {month: 'long', year: 'numeric', day: 'numeric'}
const loader = $('.loader')

$.ajax({
  url: "http://localhost:8080/API/Dashboard",
  type:"GET",
  headers: {"Authorization":'Bearer ' + jwt},
  contentType:"application/json; charset=utf-8",
  dataType:"json",
  success: function(data){

      console.log(data)
      setTicketList(data[0],data[1],data[2])
      loader.hide()
      switch(data.statusCode){

       
      }
  },
  error: function(data)
  {
    console.log(data)
  }
  
})

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

    console.log("gee")
    for(var i =0; i < array.length; i++)
    {
     
      for(var j=0; j< array3.length; j++)
      {
        if(array[i].assignedTo == array3[j].UserId)
        {
         
          AssignedTo.html(array3[j].FirstName + " " + array3[j].LastName)
          break;
        }
      }
      for(var j=0; j< array2.length; j++)
      {
      
        if(array[i].ProjectId == array2[j].Id)
        {
        
          project.html(array2[j].Name)
          data.children("#projectId")[0].value = array2[j].ProjectId

          break;
        }
      }
      var date =  new Date(array[i].dateStart)
     // let value = new Intl.DateTimeFormat('en-Us', date_options).format(date);
      data.children("#companyId")[0].value = array[i].companyId
      data.children("#ticketId")[0].value = array[i].TicketId
      
   //   console.log(data.children("#ticketId")[0].value)
      title.html(array[i].Name)
   //   datecreated.html(value)
      status.html(array[i].Status)
      priority.html(array[i].Priority)
      cloned_t_d_r.clone().appendTo(ticket_dash);
    }
  }
}

//Remind for tmr

// Set up the comment db
// finish the ticket UI and backend
// finish the project ui also.


  });