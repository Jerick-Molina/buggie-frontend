
var host = location.origin

const loader = $('.loader')

$(function() {
    const para = new URLSearchParams(window.location.search)
    var para_projectID = para.get("projectId");
    console.log(para_projectID)
     
      $.ajax({
        url: "http://localhost:8080/API/Assigned/Roles",
        type:"GET",
        headers: {"Authorization":'Bearer ' + jwt, "projectId" : para_projectID},
        contentType:"application/json; charset=utf-8",
        dataType:"json",
        success: function(data,code){
          console.log(code)
          console.log(data)
           if (code == "success"){
            SetAssignedList(data)
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



})