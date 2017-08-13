console.log('JS sourced');

$(document).ready(function() {
        console.log('JQ sourced');
        getTasks();
        $('.createTaskButton').on('click', function() {
                console.log('Create button was clicked!');
                var taskInput = $('.taskInput').val();
                var taskDue = $('.taskDue').val();
                var taskComplete = function completed() {
                    if ($('.completedButton').hasClass('notComplete')) {
                        taskComplete = false;
                    } else {
                        taskComplete = true;
                    }

                }
                var taskObject = {
                    task: taskInput,
                    due: taskDue,
                    completed: taskComplete
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
        $('#messageContainer').on('click', '.completedButton', function() {
                console.log('Completed button clicked!');
                //$('.task').toggleClass('notComplete');
                var taskId = $(this).parent().data().id;
                $.ajax({
                        method: 'PUT',
                        url: '/tasks/' + taskId,
                        success: function(response) {
                            getTasks();
                        }
                    }) // end ajax PUT
            }) // end complete listener

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
        var $taskDiv = $('<table></table>');
        $taskDiv.data('id', taskAdd.id);
        var completeButton = ('<button class="completedButton">Completed</button>');
        $taskDiv.append('<td class = "task">' + taskAdd.task + '</td><td>' + taskAdd.due + "<td></td><td>" + completeButton + '</td>');
        $taskDiv.append('<button class="deleteButton">Delete</button>');
        $('#messageContainer').prepend($taskDiv);


    } // end forLoop
} // end addTask function

// function complete() {
//     if (taskAdd == "completed") {
//         var completeButton = ('<button class="completedButton">Completed</button>');
//     } else {
//         completeButton = ('<button class ')
//     }
// } // not working