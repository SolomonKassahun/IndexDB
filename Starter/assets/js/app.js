// Define UI Variables 
const taskInput = document.querySelector('#task'); //the task input text field
const form = document.querySelector('#task-form'); //The form at the top
const filter = document.querySelector('#filter'); //the task filter text field
const taskList = document.querySelector('.collection'); //The UL
const clearBtn = document.querySelector('.clear-tasks'); //the all task clear button

const reloadIcon = document.querySelector('.fa'); //the reload button at the top navigation 

//DB variable 
let DB;

// Add Event Listener [on Load]
document.addEventListener('DOMContentLoaded', () => {  
    
      //all code will reside here 
      // create the database
    let TasksDB = indexedDB.open('tasks', 1);

    // if there's an error
    TasksDB.onerror = function() {
            console.log('There was an error');
        }
        // if everything is fine, assign the result to the instance
        TasksDB.onsuccess = function() {
      
         console.log('Database Ready');

        // save the result
        DB = TasksDB.result;

        // display the Task List 
        displayTaskList();
    }
      // This method runs once (great for creating the schema)
      TasksDB.onupgradeneeded = function(e) {
        // the event will be the database
        let db = e.target.result;

        // create an object store, 
        // keypath is going to be the Indexes
        let objectStore = db.createObjectStore('tasks', { keyPath: 'id', autoIncrement: true });

        // createindex: 1) field name 2) keypath 3) options
        objectStore.createIndex('taskname', 'taskname', { unique: false });

        console.log('Database ready and fields created!');
    }
    function addNewTask(e) {
        …...
      // create a new object with the form info
      let newTask = {
          taskname: taskInput.value
      }
      // Insert the object into the database 
      let transaction = DB.transaction(['tasks'], 'readwrite');
      let objectStore = transaction.objectStore('tasks');

      let request = objectStore.add(newTask);
      // on success
      request.onsuccess = () => {
          form.reset();
      }
      transaction.oncomplete = () => {
          console.log('New Task added');
          displayTaskList();
      }
      transaction.onerror = () => { console.log('There was an error, try again!'); }
  }



});
