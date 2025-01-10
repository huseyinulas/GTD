import { useState } from 'react';
import { useGTD } from '../context/GTDContext';
import TaskList from './TaskList';
import AddActionModal from './AddActionModal';
import {
  PageHeader,
  Title,
  AddProjectForm,
  Input,
  TextArea,
  Button,
  ProjectCard,
  ProjectHeader,
  ProjectTitle,
  ProjectDescription,
  ActionButtons,
  DeleteButton,
  AddActionButton,
  EmptyState
} from '../styles/components/Projects.styles';

const Projects = () => {
  const { projects, tasks, addProject, updateProject, deleteProject } = useGTD();
  const [showAddForm, setShowAddForm] = useState(false);
  const [newProject, setNewProject] = useState({
    title: '',
    description: ''
  });
  const [selectedProjectId, setSelectedProjectId] = useState(null);

  const activeProjects = projects.filter(p => p.status === 'active');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newProject.title.trim()) {
      addProject({
        id: Date.now().toString(),
        title: newProject.title,
        description: newProject.description,
        status: 'active',
        createdAt: new Date()
      });
      setNewProject({ title: '', description: '' });
      setShowAddForm(false);
    }
  };

  const moveToSomeday = (projectId) => {
    const project = projects.find(p => p.id === projectId);
    if (project) {
      updateProject({
        ...project,
        status: 'someday'
      });
    }
  };

  const handleAddAction = (projectId) => {
    setSelectedProjectId(projectId);
  };

  const handleCompleteProject = (projectId) => {
    if (window.confirm('Are you sure you want to complete this project?')) {
      updateProject({
        ...projects.find(p => p.id === projectId),
        status: 'done',
        completedAt: new Date().toISOString()
      });
    }
  };

  return (
    <div>
      <PageHeader>
        <Title>Projects</Title>
        <Button onClick={() => setShowAddForm(!showAddForm)}>
          {showAddForm ? 'Cancel' : 'Add Project'}
        </Button>
      </PageHeader>

      {showAddForm && (
        <AddProjectForm onSubmit={handleSubmit}>
          <Input
            type="text"
            placeholder="Project Title"
            value={newProject.title}
            onChange={(e) => setNewProject(prev => ({ ...prev, title: e.target.value }))}
            autoFocus
          />
          <TextArea
            placeholder="Project Description (optional)"
            value={newProject.description}
            onChange={(e) => setNewProject(prev => ({ ...prev, description: e.target.value }))}
          />
          <Button type="submit">Create Project</Button>
        </AddProjectForm>
      )}

      {activeProjects.map(project => {
        const projectTasks = tasks.filter(task => 
          task.project === project.id && task.status === 'next'
        );
        
        return (
          <ProjectCard key={project.id}>
            <ProjectHeader>
              <ProjectTitle>{project.title}</ProjectTitle>
              <ActionButtons>
                <AddActionButton onClick={() => handleAddAction(project.id)}>
                  Add Action
                </AddActionButton>
                {projectTasks.length === 0 ? (
                  <Button 
                    onClick={() => handleCompleteProject(project.id)}
                    style={{ backgroundColor: '#10b981' }}
                  >
                    Complete Project
                  </Button>
                ) : (
                  <DeleteButton onClick={() => moveToSomeday(project.id)}>
                    Move to Someday
                  </DeleteButton>
                )}
              </ActionButtons>
            </ProjectHeader>
            {project.description && (
              <ProjectDescription>{project.description}</ProjectDescription>
            )}
            <h4>Next Actions</h4>
            <TaskList tasks={projectTasks} />
          </ProjectCard>
        );
      })}

      {activeProjects.length === 0 && (
        <EmptyState>
          <p>No active projects. Click "Add Project" to create one.</p>
        </EmptyState>
      )}

      {selectedProjectId && (
        <AddActionModal 
          projectId={selectedProjectId}
          onClose={() => setSelectedProjectId(null)}
        />
      )}
    </div>
  );
};

export default Projects; 