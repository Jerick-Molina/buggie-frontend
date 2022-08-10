

var host = location.origin


var create_project = $('#create_new_project').on('click',
function () { 

    $(location).attr('href', host + "/Project/Create.html" );

 })

 var create_ticket = $('#create_new_ticket').on('click',
function () { 

    $(location).attr('href', host + "/Ticket/Create.html" );

 })