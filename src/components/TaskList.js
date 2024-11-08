// src/components/TaskList.js
// import React, { useEffect, useState, useContext } from 'react';
// import { AuthContext } from '../context/AuthContext';
// import { getTasks, deleteTask } from '../api/taskApi'; // Adjust based on your API setup
// import TaskForm from './TaskForm';

const TaskList = () => {
  // const { user, user_permissions } = useContext(AuthContext);
  // const [tasks, setTasks] = useState([]);
  // const [currentTask, setCurrentTask] = useState(null);
  // const [showModal, setShowModal] = useState(false);

  // const hasPermission = (module, action) => {
  //   return user_permissions?.[module]?.includes(action);
  // };

  // useEffect(() => {
  //   if (user && user.token) {
  //     const fetchTasks = async () => {
  //       try {
  //         const data = await getTasks(user.token);
  //         setTasks(data);
  //       } catch (error) {
  //         console.error('Error fetching tasks:', error);
  //       }
  //     };
  //     fetchTasks();
  //   }
  // }, [user]);

  // const handleDelete = async (id) => {
  //   if (user && user.token && hasPermission('task', 'delete')) {
  //     if (window.confirm('Are you sure you want to delete this task?')) {
  //       try {
  //         await deleteTask(id, user.token);
  //         setTasks(tasks.filter((task) => task._id !== id));
  //       } catch (error) {
  //         console.error('Error deleting task:', error);
  //         alert('Error deleting task');
  //       }
  //     }
  //   }
  // };

  // const handleSaveTask = (savedTask) => {
  //   if (currentTask) {
  //     setTasks(tasks.map((task) => (task._id === savedTask._id ? savedTask : task)));
  //   } else {
  //     setTasks([...tasks, savedTask]);
  //   }
  //   setShowModal(false);
  // };

  // const openAddModal = () => {
  //   if (hasPermission('task', 'add')) {
  //     setCurrentTask(null);
  //     setShowModal(true);
  //   } else {
  //     alert('Permission denied');
  //   }
  // };

  // const openEditModal = (task) => {
  //   if (hasPermission('task', 'edit')) {
  //     setCurrentTask(task);
  //     setShowModal(true);
  //   } else {
  //     alert('Permission denied');
  //   }
  // };

  // if (!user || !user.token) {
  //   return <p>Please log in to view your tasks.</p>;
  // }

  // return (
  //   <div>
  //     <h2>Tasks</h2>
  //     {hasPermission('task', 'add') && (
  //       <button className="btn btn-primary mb-3" onClick={openAddModal}>
  //         Add Task
  //       </button>
  //     )}
  //     <table className="table table-striped table-hover mt-3">
  //       <thead className="table-dark">
  //         <tr>
  //           <th>Title</th>
  //           <th>Description</th>
  //           <th>Status</th>
  //           <th>Priority</th>
  //           <th>Actions</th>
  //         </tr>
  //       </thead>
  //       <tbody>
  //         {tasks.map((task) => (
  //           <tr key={task._id}>
  //             <td>{task.title}</td>
  //             <td>{task.description}</td>
  //             <td>{task.status}</td>
  //             <td>{task.priority}</td>
  //             <td>
  //               {hasPermission('task', 'edit') && (
  //                 <button onClick={() => openEditModal(task)} className="btn btn-secondary btn-sm me-2">
  //                   Edit
  //                 </button>
  //               )}
  //               {hasPermission('task', 'delete') && (
  //                 <button onClick={() => handleDelete(task._id)} className="btn btn-danger btn-sm">
  //                   Delete
  //                 </button>
  //               )}
  //             </td>
  //           </tr>
  //         ))}
  //       </tbody>
  //     </table>

  //     {showModal && (
  //       <div className="modal show d-block" tabIndex="-1" style={{ background: '#000000a6' }}>
  //         <div className="modal-dialog">
  //           <div className="modal-content">
  //             <div className="modal-header">
  //               <h5 className="modal-title">{currentTask ? 'Edit Task' : 'Add Task'}</h5>
  //               <button
  //                 type="button"
  //                 className="btn-close"
  //                 onClick={() => setShowModal(false)}
  //               ></button>
  //             </div>
  //             <div className="modal-body">
  //               <TaskForm
  //                 task={currentTask}
  //                 onSave={handleSaveTask}
  //                 onClose={() => setShowModal(false)}
  //               />
  //             </div>
  //           </div>
  //         </div>
  //       </div>
  //     )}
  //   </div>
  // );
};

export default TaskList;
