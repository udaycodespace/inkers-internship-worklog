import React, { useState } from 'react';
import { 
  useGetTasksQuery, 
  useAddTaskMutation, 
  useDeleteTaskMutation, 
  useUpdateTaskMutation 
} from '../features/tasks/tasksApi';
import { toast } from 'react-toastify';

const Tasks = () => {
  // 1. New State for Editing
  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState('');
  const [taskInput, setTaskInput] = useState('');

  const { data: tasks, isLoading, isError } = useGetTasksQuery();
  const [addTask, { isLoading: isAdding }] = useAddTaskMutation();
  const [deleteTask] = useDeleteTaskMutation();
  const [updateTask] = useUpdateTaskMutation();

  // Add Task
  const handleAdd = async (e) => {
    e.preventDefault();
    if (!taskInput.trim()) return;
    try {
      await addTask({ title: taskInput, completed: false, userId: 1 }).unwrap();
      setTaskInput('');
      toast.success('Task Added Successfully');
    } catch (err) {
      toast.error('Failed to add task');
    }
  };

  // 2. Start Editing Mode
  const startEdit = (task) => {
    setEditingId(task.id);
    setEditTitle(task.title);
  };

  // 3. Cancel Editing
  const cancelEdit = () => {
    setEditingId(null);
    setEditTitle('');
  };

  // 4. Save Edited Task
  const saveEdit = async (task) => {
    if (!editTitle.trim()) return;
    try {
      // KEEP completed status same, update TITLE
      await updateTask({ ...task, title: editTitle }).unwrap();
      setEditingId(null);
      toast.success('Task Updated');
    } catch (err) {
      toast.error('Failed to update task');
    }
  };

  const handleToggle = (task) => {
    updateTask({ ...task, completed: !task.completed });
  };

  const handleDelete = (id) => {
    if(window.confirm('Are you sure?')) {
       deleteTask(id);
    }
  };

  return (
    <div style={{ border: '2px solid black', padding: '30px', boxShadow: '8px 8px 0px #000' }}>
      <h2 style={{ marginTop: 0, textTransform: 'uppercase', letterSpacing: '2px' }}>Task Manager</h2>

      {/* Add Form */}
      <form onSubmit={handleAdd} style={{ display: 'flex', gap: '10px', marginBottom: '30px' }}>
        <input 
          type="text" 
          value={taskInput}
          onChange={(e) => setTaskInput(e.target.value)}
          placeholder="Enter new task..."
          style={{ flexGrow: 1 }}
        />
        <button type="submit" disabled={isAdding}>
          {isAdding ? 'Wait...' : 'Add Task'}
        </button>
      </form>

      {isLoading && <p>Loading...</p>}
      {isError && <p style={{color: 'red'}}>Error connecting to server</p>}

      <ul style={{ listStyle: 'none', padding: 0 }}>
        {tasks?.map((task) => (
          <li key={task.id} style={{ 
            borderBottom: '1px solid #ddd', 
            padding: '15px 0', 
            display: 'flex', 
            alignItems: 'center', 
            gap: '10px' 
          }}>
            
            {/* EDIT MODE Logic */}
            {editingId === task.id ? (
              <>
                <input 
                  type="text" 
                  value={editTitle} 
                  onChange={(e) => setEditTitle(e.target.value)}
                  style={{ flexGrow: 1 }}
                  autoFocus
                />
                <button onClick={() => saveEdit(task)} style={{ background: 'black', color: 'white' }}>Save</button>
                <button onClick={cancelEdit}>Cancel</button>
              </>
            ) : (
              // VIEW MODE Logic
              <>
                <input 
                  type="checkbox" 
                  checked={task.completed} 
                  onChange={() => handleToggle(task)}
                  style={{ width: '20px', height: '20px', cursor: 'pointer' }}
                />
                
                <span style={{ 
                  flexGrow: 1, 
                  textDecoration: task.completed ? 'line-through' : 'none',
                  color: task.completed ? '#888' : 'black',
                  fontWeight: 500
                }}>
                  {task.title}
                </span>

                <button onClick={() => startEdit(task)}>Edit</button>
                
                <button 
                  onClick={() => handleDelete(task.id)}
                  style={{ borderColor: '#ff4444', color: '#ff4444' }}
                  onMouseEnter={(e) => {e.target.style.background = '#ff4444'; e.target.style.color='white'}}
                  onMouseLeave={(e) => {e.target.style.background = 'white'; e.target.style.color='#ff4444'}}
                >
                  Delete
                </button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Tasks;