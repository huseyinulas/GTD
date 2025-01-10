import { createContext, useContext, useState, useEffect } from 'react';

const GTDContext = createContext();

// Constants for localStorage keys
const STORAGE_KEYS = {
  TASKS: 'gtd_tasks',
  PROJECTS: 'gtd_projects',
  CONTEXTS: 'gtd_contexts',
  HIDDEN_CONTEXTS: 'gtd_hidden_contexts',
};

// Helper functions for localStorage
const getStoredData = (key, defaultValue) => {
  try {
    const storedData = localStorage.getItem(key);
    return storedData ? JSON.parse(storedData) : defaultValue;
  } catch (error) {
    console.error(`Error reading from localStorage: ${error}`);
    return defaultValue;
  }
};

const storeData = (key, data) => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error(`Error writing to localStorage: ${error}`);
  }
};

export const GTDProvider = ({ children }) => {
  // Initialize state from localStorage
  const [tasks, setTasks] = useState(() => 
    getStoredData(STORAGE_KEYS.TASKS, [])
  );
  
  const [projects, setProjects] = useState(() => 
    getStoredData(STORAGE_KEYS.PROJECTS, [])
  );

  const [contexts, setContexts] = useState(() => getStoredData(STORAGE_KEYS.CONTEXTS, [
    '@home',
    '@work',
    '@computer',
    '@phone',
    '@everywhere'
  ]));

  const [hiddenContexts, setHiddenContexts] = useState(() => {
    const stored = getStoredData(STORAGE_KEYS.HIDDEN_CONTEXTS, []);
    return new Set(stored);
  });

  // Update localStorage when data changes
  useEffect(() => {
    storeData(STORAGE_KEYS.TASKS, tasks);
  }, [tasks]);

  useEffect(() => {
    storeData(STORAGE_KEYS.PROJECTS, projects);
  }, [projects]);

  useEffect(() => {
    storeData(STORAGE_KEYS.CONTEXTS, contexts);
  }, [contexts]);

  useEffect(() => {
    storeData(STORAGE_KEYS.HIDDEN_CONTEXTS, Array.from(hiddenContexts));
  }, [hiddenContexts]);

  const updateContexts = (newContexts) => {
    setContexts(newContexts);
  };

  const addTask = (task) => {
    setTasks(prev => {
      const newTask = {
        ...task,
        id: `task-${Date.now()}`,
        createdAt: new Date().toISOString()
      };
      const newTasks = [...prev, newTask];
      return newTasks;
    });
  };

  const updateTask = (updatedTask) => {
    const finalTask = {
      ...updatedTask,
      completedAt: updatedTask.status === 'done' ? new Date().toISOString() : updatedTask.completedAt
    };
    setTasks(tasks.map(task => 
      task.id === updatedTask.id ? finalTask : task
    ));
  };

  const deleteTask = (taskId) => {
    setTasks(prev => {
      const newTasks = prev.filter(task => task.id !== taskId);
      return newTasks;
    });
  };

  const addProject = (project) => {
    setProjects(prev => {
      const newProjects = [...prev, project];
      return newProjects;
    });
  };

  const updateProject = (updatedProject) => {
    setProjects(prev => {
      const newProjects = prev.map(project => 
        project.id === updatedProject.id ? updatedProject : project
      );
      return newProjects;
    });
  };

  const deleteProject = (projectId) => {
    setProjects(prev => {
      const newProjects = prev.filter(project => project.id !== projectId);
      // Also delete or update tasks associated with this project
      setTasks(prevTasks => 
        prevTasks.map(task => 
          task.project === projectId 
            ? { ...task, project: null } 
            : task
        )
      );
      return newProjects;
    });
  };

  // Clear all data (useful for testing or reset functionality)
  const clearAllData = () => {
    setTasks([]);
    setProjects([]);
    localStorage.removeItem(STORAGE_KEYS.TASKS);
    localStorage.removeItem(STORAGE_KEYS.PROJECTS);
  };

  const importData = (data) => {
    try {
      if (data.tasks) {
        setTasks(data.tasks);
        storeData(STORAGE_KEYS.TASKS, data.tasks);
      }
      if (data.projects) {
        setProjects(data.projects);
        storeData(STORAGE_KEYS.PROJECTS, data.projects);
      }
      if (data.contexts) {
        setContexts(data.contexts);
        storeData(STORAGE_KEYS.CONTEXTS, data.contexts);
      }
      return true;
    } catch (error) {
      console.error('Error importing data:', error);
      return false;
    }
  };

  useEffect(() => {
    setTasks(prevTasks => 
      prevTasks.map(task => ({
        ...task,
        id: typeof task.id === 'number' ? `task-${task.id}` : task.id
      }))
    );
  }, []); // Run once on mount

  return (
    <GTDContext.Provider value={{ 
      tasks, 
      addTask, 
      updateTask,
      deleteTask,
      projects,
      addProject,
      updateProject,
      deleteProject,
      contexts,
      updateContexts,
      clearAllData,
      importData,
      hiddenContexts,
      setHiddenContexts,
    }}>
      {children}
    </GTDContext.Provider>
  );
};

export const useGTD = () => {
  const context = useContext(GTDContext);
  if (!context) {
    throw new Error('useGTD must be used within a GTDProvider');
  }
  return context;
}; 