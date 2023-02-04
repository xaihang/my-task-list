$(document).ready(onReady);

function onReady() {
  $('#addBtn').on('click', addTask);

}

function addTask(event) {
    event.preventDefault();
  //capture data with newTask
  let newTask = $('#taskInput').val();

  // sending the captured data (newTask) to server
  // packaged in object form
  let payload = {data: newTask};


  $.ajax({
    method: 'POST',
    url: '/task/add-task',
    data: payload,
  })
    .then(function (response) {
      console.log('Response from server.', response);
    })
    .catch(function (error) {
      console.log('Error in POST', error);
    });
}
