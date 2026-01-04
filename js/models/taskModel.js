import * as model from './model.js';
import * as help from '../helpers.js';
console.log('Task Module');

///////////////////////////////////////////////////////////////////
// Add tasks
export function addNewTask(newTask) {
  const selectedArray = model.state.tasks.filter(
    item => item.space === model.state.selectedSpace
  );
  const exists = selectedArray.some(
    task => task.name === help.capitalizeTask(newTask)
  );
  if (exists) return false;

  model.state.tasks.unshift({
    // ID : ### Fix me later ###
    id: Date.now(),
    name: help.capitalizeTask(newTask),
    time: Date.now(),
    archived: false,
    completed: false,
    space: model.state.selectedSpace,
    edited: false,
  });

  model.state.selectedTab = 'all';

  model.setLocalStorage();
  return model.state.tasks;
}

///////////////////////////////////////////////////////////////////
// Get Selected Tasks
export function getSelectedTasks() {
  return model.state.tasks.filter(
    item => item.space === model.state.selectedSpace
  );
}

///////////////////////////////////////////////////////////////////
// Edit Space Name
export function editSpaceName(oldSpaceName, newSpaceName) {
  console.log(oldSpaceName, newSpaceName);

  if (newSpaceName.length > 25 || newSpaceName.length === 0) {
    alert(`${newSpaceName} is not a valid space name`);
    return;
  }

  const alreadyExists = model.state.spaces.some(
    space => space.name === newSpaceName
  );
  if (alreadyExists) {
    alert(`${newSpaceName} already exists in spaces`);
    return;
  }

  const selSpace = model.state.spaces.find(
    space => space.name === oldSpaceName
  );

  const spaceTasks = model.state.tasks.filter(
    task => task.space === oldSpaceName
  );

  selSpace.name = newSpaceName;
  spaceTasks.forEach(task => (task.space = newSpaceName));
  model.state.selectedSpace = newSpaceName;

  model.setLocalStorage();
}

///////////////////////////////////////////////////////////////////
// Select task tab
export function activeTab(selecedTab) {
  model.state.selectedTab = selecedTab;
  model.setLocalStorage();
}

///////////////////////////////////////////////////////////////////
// Get selected Item = 'all' default
export function getAllTasks() {
  const selectedArray = getSelectedTasks();
  const allList = selectedArray.filter(
    item => !item.completed && !item.archived
  );
  return allList;
}

// Get pending task
export function getPendingTasks() {
  const selectedArray = getSelectedTasks();
  const pendingList = selectedArray.filter(item => !item.completed);
  return pendingList;
}

// Get completed Task
export function getCompletedTasks() {
  const selectedArray = getSelectedTasks();
  const completedList = selectedArray.filter(item => item.completed);
  return completedList;
}

// Get Archived Task
export function getArchivedTasks() {
  const selectedArray = getSelectedTasks();
  const archivedList = selectedArray.filter(
    item => !item.completed && item.archived
  );
  return archivedList;
}

///////////////////////////////////////////////////////////////////
// Task Actions
export function activateTaskProperty(taskName, property) {
  const activeTask = model.state.tasks.find(
    item => item.name === taskName && item.space === model.state.selectedSpace
  );

  if (activeTask) activeTask[property] = !activeTask[property];
  model.setLocalStorage();
  return activeTask[property];
}

///////////////////////////////////////////////////////////////////
// Delete Task logic
export function deleteTask(taskName) {
  const feedback = confirm(`You are deleting "${taskName}" task!`);

  if (!feedback) return;
  const activeTask = model.state.tasks.findIndex(
    item => item.name === taskName && item.space === model.state.selectedSpace
  );

  model.state.tasks.splice(activeTask, 1);
  model.setLocalStorage();
  return activeTask;
}

///////////////////////////////////////////////////////////////////
// Edit Task Logic
export function editTaskName(oldTaskName, newTaskName) {
  const trimmed = help.capitalizeTask(newTaskName.trim());

  if (trimmed.length > 250 || trimmed.length === 0) {
    alert(`"${trimmed}" is an invalid task name!`);
    return;
  }

  const spaceTasks = model.state.tasks.filter(
    item => item.space === model.state.selectedSpace
  );

  if (spaceTasks.some(task => task.name === newTaskName))
    return alert('task already exits');

  const oldTask = spaceTasks.find(item => item.name === oldTaskName);

  oldTask.name = newTaskName;
  oldTask.edited = true;
  model.setLocalStorage();
}
