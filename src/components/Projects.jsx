import { useState } from 'react';
import { useGTD } from '../context/GTDContext';
import TaskList from './TaskList';
import styled from '@emotion/styled';
import AddActionModal from './AddActionModal';

const PageHeader = styled.div`
  margin-bottom: 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled.h2`
  font-size: 1.5rem;
  color: #1a202c;
  margin: 0;
`;

const AddProjectForm = styled.form`
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  margin-bottom: 2rem;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  margin-bottom: 1rem;
  font-size: 1rem;
  color: #2d3748;

  &:focus {
    outline: none;
    border-color: #007bff;
    box-shadow: 0 0 0 3px rgba(0,123,255,0.1);
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  margin-bottom: 1rem;
  font-size: 1rem;
  color: #2d3748;
  min-height: 100px;
  resize: vertical;

  &:focus {
    outline: none;
    border-color: #007bff;
    box-shadow: 0 0 0 3px rgba(0,123,255,0.1);
  }
`;

const Button = styled.button`
  padding: 0.75rem 1.5rem;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.2s;
  
  &:hover {
    background-color: #0056b3;
    transform: translateY(-1px);
  }
`;

const ProjectCard = styled.div`
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  }
`;

const ProjectHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1rem;
`;

const ProjectTitle = styled.h3`
  font-size: 1.25rem;
  color: #2d3748;
  margin: 0;
`;

const ProjectDescription = styled.p`
  color: #718096;
  margin: 1rem 0;
  line-height: 1.5;
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const DeleteButton = styled(Button)`
  background-color: #dc3545;
  
  &:hover {
    background-color: #c82333;
  }
`;

const AddActionButton = styled(Button)`
  background-color: #10b981;
  
  &:hover {
    background-color: #059669;
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 3rem;
  color: #718096;
  background: white;
  border-radius: 12px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
`;

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