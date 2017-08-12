console.log('JS sourced');

$(document).ready(function() {
        console.log('JQ sourced');
        getTasks();
        $('.createTaskButton').on('click', function() {
                console.log('Create button was clicked!');
                var taskInput = $('.taskInput').val();
                var taskDue = $('.taskDue').val();
                var taskObject = {
                    task: taskInput,
                    due: taskDue
                }
                $.ajax({
                        method: 'POST',
                        url: '/tasks',
                        data: taskObject,
                        success: function(response) {
                            console.log(response)
                            getTasks();
                        }
                    }) // end ajax POST
            }) // end createTask listener




    }) // end document ready

function getTasks() {
    $.ajax({
        method: 'GET',
        url: '/tasks',
        success: function(response) {
            console.log(response);
            addTask(response);
        }
    })
}

function addTask(taskArray) {
    $('#taskDiv').empty(); // clears div

    for (var i = 0; i < taskArray.length; i++) {
        var taskAdd = taskArray[i];
        $('#taskDiv').prepend('<p>TASK: ' + taskAdd.task + ' DUE BY: ' + taskAdd.due + '</p>')
    }
}