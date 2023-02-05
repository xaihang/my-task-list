$(document).ready(onReady);

let taskList = [];
let displayTaskList = [];
let filterStatus = 'all';

function onReady() {
  $('#addBtn').on('click', addTask);
  getTaskList();

  $('#all-tab').on('click', (event) => {
    event.preventDefault();
    removeActiveClass();
    $('#all-tab').addClass('active');
    filterStatus = 'all';
    filterTaskList();
  });
  $('#active-tab').on('click', (event) => {
    event.preventDefault();
    removeActiveClass();
    $('#active-tab').addClass('active');
    filterStatus = 'active';
    filterTaskList();
  });
  $('#complete-tab').on('click', (event) => {
    event.preventDefault();
    removeActiveClass();
    $('#complete-tab').addClass('active');
    filterStatus = 'complete';
    filterTaskList();
  });

  $(document).on('click', '.deleteBtn', onDeleteTask);
  $(document).on('click', '.completeBtn', onCompleteTask);

  getTaskList();
}

function removeActiveClass() {
  $('#task-tabs li a').removeClass('active');
}

function filterTaskList() {
  displayTaskList = [];
  switch (filterStatus) {
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

  $('#taskInput').val('');
}

function getTaskList() {
  $.ajax({
    type: 'GET',
    url: '/task/get-task-list',
  }).then((result) => {
    console.log('GET /task list response', result.data);
    taskList = result.data;
    filterTaskList();
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

    swal({
        title: 'Are you sure?',
        text: 'Once deleted, you will NOT be able to recover this task!',
        icon: 'warning',
        buttons: true,
        dangerMode: true,
      }).then((willDelete) => {
        if (willDelete) {
          swal('Poof! Your task is deleted!', {
            icon: 'success',
          });
        } else {
          swal('Your task is safe!');
        }
      });
}

function onCompleteTask() {
  console.log('in isComplete', $(this));

  let id = $(this).closest('li').data('id');
  let is_complete = $(this).data('isComplete');

  $.ajax({
    method: 'PUT',
    url: `/task/${id}`,
    data: {
      data: !is_complete,
    },
  })
    .then(() => {
      getTaskList();
    })
    .catch((err) => {
      console.error('PUT failed', err);
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
                <div>
                    <button data-is-complete=${
                      currentTask.is_complete
                    } type="button" class="completeBtn btn ${
      currentTask.is_complete ? 'btn-success' : 'btn-outline-success'
    } btn-rounded" data-mdb-ripple-color="dark">${
      currentTask.is_complete ? 'complete' : 'incomplete'
    }</button>
                    <button type="button" class="deleteBtn btn btn-outline-danger btn-rounded" data-mdb-ripple-color="dark">Delete</button>
                </div>
                
            </li>
          `);
  }
}
