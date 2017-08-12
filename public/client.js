console.log('JS sourced');

$(document).ready(function() {
        console.log('JQ sourced');

        $('.createTaskButton').on('click', function() {
                console.log('Create button was clicked!');
                var taskInput = $('.taskInput').val();
                var taskObject = {
                    taskInput: taskInput
                }
                $.ajax({
                        method: 'POST',
                        url: 'server/modules/tasks.js',
                        data: taskObject,
                        success: function(response) {
                            console.log(response)
                        }
                    }) // end ajax POST
            }) // end createTask listener




    }) // end document ready