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
        $('#messageContainer').on('click', '.deleteButton', function() {
                console.log('Delete button clicked!');
                var taskId = $(this).parent().data().id;
                console.log('task id is', taskId);
                $.ajax({
                        method: 'DELETE',
                        url: '/tasks/' + taskId,
                        success: function(response) {
                            getTasks();
                        }
                    }) // end ajax Delete
            }) // end delete listener


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
    $('#messageContainer').empty(); // clears div

    for (var i = 0; i < taskArray.length; i++) {
        var taskAdd = taskArray[i];
        var $taskDiv = $('<div></div>');
        $taskDiv.data('id', taskAdd.id);
        $taskDiv.append('<div class="task">TASK: ' + taskAdd.task + ' DUE: ' + taskAdd.due + '</div>');
        $taskDiv.append('<button class="deleteButton">Delete</button>');
        $('#messageContainer').prepend($taskDiv);
        // $('#taskDiv').prepend('<p>TASK: ' + taskAdd.task + ' DUE BY: ' + taskAdd.due + '</p>')

    }
}