console.log('JS sourced');

$(document).ready(function() {
    console.log('JQ sourced');

    $('.createTaskButton').on('click', function() {
        console.log('Create button was clicked!');
    })




})