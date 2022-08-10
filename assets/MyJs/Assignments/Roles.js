
var host = location.origin

const loader = $('.loader')

$(function() {
    const para = new URLSearchParams(window.location.search)
    var para_projectID = para.get("projectId");
    console.log(para_projectID)


    var assigned_role_dash = $('#assigned_role_dash')
    var assigned_role_row = $('#assigned_role_dash_row')
    var assigned_name = $('#assigned_name')
    var assigned_email = $('#assigned_email')
    var assigned_role = $('#assigned_role')


   
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
            
            AssignList(data)
            loader.hide()
           }
        },
        error: function(data)
        {
          
          // if (data.status == 400) {
          //   $(location).attr('href', host + "/projects.html" );

          // }
          
        }
        
        
      })
      
      $('#save_assigned_button').on('click', function(){
     
      console.log( assigned_role_dash.length)

      for(var i = 0; i< assigned_role_dash.length; i++) {

      }
      })
     
      function AssignList(array) {
      
        console.log(array)
        var cloned = assigned_role_row.clone()
        assigned_role_row.remove()
       cloned_name = cloned.children('#assigned_name')
       cloned_email = cloned.children('#assigned_email')
       cloned_role = cloned.children('td').children(`select`)

        for (var i =0 ; i < array.length ;i++) {
          cloned_role.attr('id',`assigned_role_${i}`)
          cloned_name.html(array[i].FirstName + " " + array[i].LastName)
          cloned_email.html(array[i].Email)
          
        
          cloned.clone().appendTo(assigned_role_dash)
          $(`#assigned_role_${i} option[value=${array[i].Role}]`).attr("selected","selected")

        }
      
      }



      function RoleOptions(array){

    
        var options_clone = options_assigned.clone();
        options_project.remove();
        for (var i =0 ; i < array.length ;i++) {
          form_project_group
          options_clone.html(array[i].Name)
          options_clone.val(array[i].Id)
          options_clone.clone().appendTo(form_project_group)
          
        }
     
      }

    

})