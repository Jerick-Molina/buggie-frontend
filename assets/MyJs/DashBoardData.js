$(function() {
    /* ChartJS
     * -------
     * Data and config for chartjs
     */
    'use strict';

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
      SetProjectsList(data[1])
      setTicketPriorty(data[0]);
      setTicketstatus(data[0])
  
      
      loader.hide()
      switch(data.statusCode){

       
      }
  },
  error: function(data)
  {
    console.log(data)
  }
  
})


function setTicketstatus(array)
{
  for(var i = 0; i < array.length; i++)
  { 
    for(var j = 0; j < graph_priority_Priority.length; j++)
    {
      
      if(graphBar[j] == array[i].Status)
      {
       
       
        graphBar_Data[j] += 1;
      
        updateCharts();
        break;
      }
    }   
  }
}
function setTicketPriorty(array) 
{
  for(var i = 0; i < array.length; i++)
  { 
    for(var j = 0; j < graph_priority_Priority.length; j++)
    {
      
      if(graph_priority_Priority[j] == array[i].Priority)
      {
       
       
        graph_priority_Data[j] += 1;
      
        updateCharts();
        break;
      }
    }   
  }
  graph_priority_Data.forEach(addDataResult)
}


function SetProjectsList(array)
{
  if(array.length > 0)
  {
    var project_dash_row= $('#projects_dash_row')
 
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
     
      console.log(array[i].Id)
      data.children("#projectId")[0].value = array[i].Id
      console.log(data.children("#projectId")[0].Value)
      title.html(array[i].Name)
      description.html(array[i].Description)
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
        if(array[i].assignedTo == array3[j].UserId)
        {
         
          AssignedTo.html(array3[j].FirstName + " " + array3[j].LastName)
          break;
        }
      }
      for(var j=0; j< array2.length; j++)
      {
      
        if(array[i].projectId == array2[j].ProjectId)
        {
        
          project.html(array2[j].Name)
          break;
        }
      }
      var date =  new Date(array[i].dateStart)
      let value = new Intl.DateTimeFormat('en-Us', date_options).format(date);
      data.children("#companyId")[0].value = array[i].companyId
      data.children("#projectId")[0].value = array[i].ProjectId
      data.children("#ticketId")[0].value = array[i].TicketId
      
      console.log(data.children("#ticketId")[0].value)
      title.html(array[i].Name)
      datecreated.html(value)
      status.html(array[i].Status)
      priority.html(array[i].Priority)
      cloned_t_d_r.clone().appendTo(ticket_dash);
    }
  }
}


  


$(document).on('click', "#project-action", function (event) {

  var data = event.currentTarget.parentNode.parentNode.parentNode.parentNode.firstElementChild
  
  console.log("yeet")
  
  var host = location.origin
  
  
    $(location).attr('href', host + "/project.html" + `?projectId=${data.children[1].value}`);

})





$(document).on('click', "#ticket-action", function (event) {

  var data = event.currentTarget.parentNode.parentNode.parentNode.parentNode.firstElementChild
  
  localStorage.setItem("ticketId",data.children[0].value)
 
  localStorage.setItem("projectId",data.children[2].value)
 
  var host = location.origin
  
  
    $(location).attr('href', host + "/ticket.html" + `?projectId=${data.children[2].value}&ticketId=${data.children[0].value}`);

  
})













    var areaData = {
      labels: ["jan", "feb", "mar", "apr", "may","jun","jul","aug","sep","oct"
        ,"nov","dec"],
      datasets: [{
        label: '# of tickets',
        data: [0],
        
        backgroundColor: [
          'rgba(54, 162, 235, 0.)',
        ],
        borderColor: [ 
          'rgba(54, 162, 235, 1)',
        ],
        borderWidth: 1,
        fill: 1, // 3: no fill
      }]
    };
  
    var areaOptions = {
      plugins: {
        filler: {
          propagate: true
        }
      },
      scales: {
        yAxes: [{
          gridLines: {
            color: "rgba(204, 204, 204,0.1)"
          }
        }],
        xAxes: [{
          gridLines: {
            color: "rgba(204, 204, 204,0.1)"
          }
        }]
      }
    }
 
    var data = {
      labels: graphBar,
      datasets: [{
        label: '# of Votes',
        data: graphBar_Data,
        backgroundColor: [
          'rgba(255, 99, 132, 0.8)',
          'rgba(54, 162, 235, 0.8)',
          'rgba(255, 206, 86, 0.8)',
          'rgba(75, 192, 192, 0.8)',
          'rgba(153, 102, 255, 0.8)',
          'rgba(255, 159, 64, 0.8)'
        ],
        borderColor: [
          'rgba(255,99,132,1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)'
        ],
        borderWidth: 1,
        fill: false
      }]
    };
    
    var options = {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          },
          gridLines: {
            color: "rgba(204, 204, 204,0.1)"
          }
        }],
        xAxes: [{
          gridLines: {
            color: "rgba(204, 204, 204,0.1)"
          }
        }]
      },
      legend: {
        display: false
      },
      elements: {
        point: {
          radius: 0
        }
      }
    };
  
    function updateCharts()
    {
  //Area Chart
  if ($("#areaChart").length) {
    var areaChartCanvas = $("#areaChart").get(0).getContext("2d");
    var areaChart = new Chart(areaChartCanvas, {
      type: 'line',
      data: areaData,
      options: areaOptions
    });
  
  }
  //Area Chart
  if ($("#barChart").length) {
    var barChartCanvas = $("#barChart").get(0).getContext("2d");
    // This will get the first returned node in the jQuery collection.
    var barChart = new Chart(barChartCanvas, {
      type: 'bar',
      data: data,
      options: options
    });
  }
  
  if ($("#transaction-history").length) {
    var areaData = {
      labels: graph_priority_Priority,
      datasets: [{
          data: graph_priority_Data,
          backgroundColor: [
            "#1C7831","#E0D83C","#B56133","#B5352D"
          ]
        }
      ]
    };
    var areaOptions = {
      responsive: true,
      maintainAspectRatio: true,
      segmentShowStroke: false,
      cutoutPercentage: 70,
      elements: {
        arc: {
            borderWidth: 0
        }
      },      
      legend: {
        display: false
      },
      tooltips: {
        enabled: true
      }
    }
    var transactionhistoryChartPlugins = {
      beforeDraw: function(chart) {
        var width = chart.chart.width,
            height = chart.chart.height,
            ctx = chart.chart.ctx;
    
        ctx.restore();
        var fontSize = 1;
        ctx.font = fontSize + "rem sans-serif";
        ctx.textAlign = 'left';
        ctx.textBaseline = "middle";
        ctx.fillStyle = "#ffffff";
    
        var text = graph_priority_Data_Text, 
            textX = Math.round((width - ctx.measureText(text).width) / 2),
            textY = height / 2.4;
    
        ctx.fillText(text, textX, textY);

        ctx.restore();
        var fontSize = 0.75;
        ctx.font = fontSize + "rem sans-serif";
        ctx.textAlign = 'left';
        ctx.textBaseline = "middle";
        ctx.fillStyle = "#6c7293";

        var texts = "Tickets", 
            textsX = Math.round((width - ctx.measureText(text).width) / 2.15),
            textsY = height / 1.7;
    
        ctx.fillText(texts, textsX, textsY);
        ctx.save();
      }
    }
    var transactionhistoryChartCanvas = $("#transaction-history").get(0).getContext("2d");
    var transactionhistoryChart = new Chart(transactionhistoryChartCanvas, {
      type: 'doughnut',
      data: areaData,
      options: areaOptions,
      plugins: transactionhistoryChartPlugins
    });
  }
    }
 

   
    function addDataResult(value)
    {
    graph_priority_Data_Text = graph_priority_Data_Text + value;
    }


  });