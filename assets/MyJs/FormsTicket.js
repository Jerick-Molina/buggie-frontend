
var host = location.origin

const loader = $('.loader')

$(function() {
    const para = new URLSearchParams(window.location.search)
    var para_projectID = para.get("projectId");
    var form_project_group = $('#project-groupings')
    var form_assigned_group = $('#assigned-groupings')

    var options_project = form_project_group.children("option")
    var options_assigned = form_assigned_group.children("option")
    var result_data 
    var array
    console.log(para_projectID)
  
      $.ajax({
        url: "http://localhost:8080/API/Tickets/Create",
        type:"GET",
        headers: {"Authorization":'Bearer ' + jwt, "projectId" : para_projectID},
        contentType:"application/json; charset=utf-8",
        dataType:"json",
        success: function(data,code){
          console.log(code)
         
       
           if (code == "success"){
            console.log(data[0])
            result_data = [...data[1]]
             ProjectOptions(data[0])
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
     
      form_project_group.on('change',function (value) { 
       removeOptions()
        
      AssignedOptions(value.currentTarget.selectedIndex)
      })
 
    
     
      function ProjectOptions(array){

      
       
      
        var options_clone = options_assigned.clone();
        options_project.remove();
        for (var i =0 ; i < array.length ;i++) {
          form_project_group
          options_clone.html(array[i].Name)
          options_clone.val(array[i].Id)
          options_clone.clone().appendTo(form_project_group)
          
        }
        AssignedOptions(0)
      }

      function removeOptions(){
    
     
       for (var i = 0; i < form_assigned_group.children.length; i++ ) {
          form_assigned_group.children(i).remove()
       }
      }
      function AssignedOptions(val) {
      
        
        console.log(val)
        var cloned = options_assigned.clone()
        options_assigned.remove()
        cloned.clone().appendTo(form_assigned_group)
       
        for (var i =0 ; i < result_data[val].length ;i++) {
         
          cloned.html(result_data[val][i].FirstName + " " + result_data[val][i].LastName)
          cloned.val(result_data[val][i].Id)
          cloned.clone().appendTo(form_assigned_group)
          
        }
      }
      
      //Buttons 
      $('#ticket_submit').on('click',function (param) { 
        
        
        var projectName = $('#input_ticket_create_name')
        var projectDesc = $('#input_ticket_create_desc')
        var ticketPrioirty = $('#priority-groupings')
        

        if (projectName.val < 5){
          console.log("yeet")
          return
        }
        if (projectDesc.val() <10){
          console.log("yeet")
          return
        }
       
        var tkt = {
          "Name" : projectName.val().toString(),
          "Description" : projectDesc.val().toString(),
          "AssignedTo" : parseInt(form_assigned_group.val()),
          "ProjectId": parseInt(form_project_group.val()),
          "Priority" : ticketPrioirty.val().toString()
        }
        console.log(JSON.stringify(tkt) )
        $.ajax({
          url: "http://localhost:8080/API/Tickets/Create",
          type:"POST",
          data: JSON.stringify(tkt) ,
          headers: {"Authorization":'Bearer ' + jwt, "projectId" : para_projectID},
          contentType:"application/json; charset=utf-8",
          dataType:"json",
        
          success: function(data,code){
            console.log(code)
            console.log(code)
         
             if (code == "success"){
              var ints = parseInt(form_project_group.val())
              console.log(ints)
             $(location).attr('href', host + "/Project.html?projectId=" + ints);
  
             }
          },
          error: function(data)
          {
            console.log(data)
            if (data.status == 400) {
             // $(location).attr('href', host + "/projects.html" );
  
            }
            
          }
          
          
        })
       
     
      })


      $('#ticket_cancel').on('click',function (param) { console.log("heelo") })
})