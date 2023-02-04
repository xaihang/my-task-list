$(document).ready(onReady);

let taskList = [];
let displayTaskList = [];
let filterTask = 'all';

function onReady() {
  $('#addBtn').on('click', addTask);
  getTaskList();

  $('#all-tab').on('click', (event) => {
    event.preventDefault();
    removeActiveClass();
    $('#all-tab').addClass('active');
    filterTask = 'all';
  });
  $('#active-tab').on('click', (event) => {
    event.preventDefault();
    removeActiveClass();
    $('#active-tab').addClass('active');
    filterTask = 'active';
  });
  $('#complete-tab').on('click', (event) => {
    event.preventDefault();
    removeActiveClass();
    $('#complete-tab').addClass('active');
    filterTask = 'complete';
  });

  $(document).on('click', '.deleteBtn', onDeleteTask);

  getTaskList();
}

function removeActiveClass() {
  $('#task-tabs li a').removeClass('active');
}

function filterTaskList() {
  displayTaskList = [];
  switch (filterTaskList) {
    case 'complete':
      taskList.map((currentTask) => {
        if (currentTask.is_complete === true) {
          displayTaskList.push(currentTask);
        }
      });
      break;

    case 'active':
      taskList.map((currentTask) => {
        if (currentTask.is_complete === false) {
          displayTaskList.push(currentTask);
        }
      });
      break;

    default:
      displayTaskList = taskList;
      break;
  }

  //   console.log('reach ------', displayTaskList);
  render();
}

function addTask(event) {
  event.preventDefault();
  //capture data with newTask
  let newTask = $('#taskInput').val();

  // sending the captured data (newTask) to server
  // packaged in object form
  let payload = { data: newTask };

  $.ajax({
    method: 'POST',
    url: '/task/add-task',
    data: payload,
  })
    .then((result) => {
      console.log('Response from server.', result);
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
  }).then((result) => {
    console.log('GET /task list response', result.data);
    taskList = result.data;
    filterTaskList();

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

function onDeleteTask() {
  console.log('in onDeleteTask', $(this));
  let id = $(this).closest('li').data('id');
  console.log('id is == ', id);

  $.ajax({
    method: 'DELETE',
    url: `/task/${id}`,
  })
    .then(function (response) {
      getTaskList();
    })
    .catch((error) => {
      console.log('DELETE /tasks failed');
    });
}

function render() {
    $('#task-list').empty();

  for (let i = 0; i < displayTaskList.length; i++) {
    let currentTask = displayTaskList[i];
    $('#task-list').append(`
            <li data-id=${currentTask.id}
                class="list-group-item d-flex justify-content-between align-items-center border-start-0 border-top-0 border-end-0 border-bottom rounded-0 mb-2">
                <div class="${
                  currentTask.is_complete ? 'completed' : 'incomplete'
                }" class="d-flex align-items-center">
                    ${currentTask.name}
                </div>
                <i class="deleteBtn fa fa-trash text-danger"></i>
            </li>
          `);
  }


}
