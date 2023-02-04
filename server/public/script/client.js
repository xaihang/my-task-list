$(document).ready(onReady);

let taskList = [];

function onReady() {
  $('#addBtn').on('click', addTask);
  getTaskList();

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
    .then((result) =>  {
      console.log('Response from server.', response);
      getTaskList();
    })
    .catch((error) => {
      console.log('Error in POST', error);
    });
}

function getTaskList() {

  $.ajax({
    type: 'GET',
    url: '/task/get-task-list',
  }).then((result) =>  {

    console.log('GET /task list response', result.data);
    taskList = result.data;
    // append data to the DOM
    // for (let i = 0; i < taskList.length; i++) {
    //   $('.card-box').append(`
    //             <tr data-id=${taskList[i].id}>
    //                 <td>${taskList[i].name}</td>
    //                 <td>${taskList[i].track}</td>
    //                 <td>
    //                     ${response[i].rank}
    //                     <button class="upvotebtn">🔼</button>
    //                     <button class="downvotebtn">🔽</button>
    //                 </td>
    //                 <td>${response[i].published}</td>
    //                 <td>
    //                     <button class="deleteSongBtn">delete</button>
    //                 </td>
    //             </tr>
    //         `);
    // }
  });
}

function render() {

}