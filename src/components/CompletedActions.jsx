import { useState } from 'react';
import { useGTD } from '../context/GTDContext';
import { format } from 'date-fns';
import styled from '@emotion/styled';
import {
  PageHeader,
  Title,
  CompletedList,
  CompletedItem,
  TaskTitle,
  TaskDetails,
  DateText,
  Context,
  SearchInput,
  EmptyState,
  FilterSection,
  Select
} from '../styles/components/CompletedActions.styles';

const TabContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;
`;

const Tab = styled.button`
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 6px;
  background: ${props => props.active ? '#4299e1' : '#e2e8f0'};
  color: ${props => props.active ? 'white' : '#4a5568'};
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: ${props => props.active ? '#3182ce' : '#cbd5e0'};
  }
`;

const ProjectCard = styled.div`
  background: white;
  border-radius: 8px;
  padding: 1rem;
  margin-bottom: 1rem;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
`;

const ProjectTitle = styled.h3`
  margin: 0 0 0.5rem 0;
  color: #2d3748;
`;

const ProjectDescription = styled.p`
  color: #718096;
  margin: 0.5rem 0;
  font-size: 0.9rem;
`;

const CompletionDate = styled.div`
  color: #718096;
  font-size: 0.875rem;
`;

const CompletedActions = () => {
  const { tasks, projects } = useGTD();
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const [activeTab, setActiveTab] = useState('actions'); // 'actions' or 'projects'

  const completedTasks = tasks
    .filter(task => task.status === 'done')
    .filter(task => 
      task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (task.context && task.context.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (task.project && projects.find(p => p.id === task.project)?.title.toLowerCase().includes(searchTerm.toLowerCase()))
    )
    .sort((a, b) => {
      const dateA = new Date(a.completedAt || a.createdAt);
      const dateB = new Date(b.completedAt || b.createdAt);
      return sortBy === 'newest' ? dateB - dateA : dateA - dateB;
    });

  const completedProjects = projects
    .filter(project => project.status === 'done')
    .filter(project =>
      project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (project.description && project.description.toLowerCase().includes(searchTerm.toLowerCase()))
    )
    .sort((a, b) => {
      const dateA = new Date(a.completedAt || a.createdAt);
      const dateB = new Date(b.completedAt || b.createdAt);
      return sortBy === 'newest' ? dateB - dateA : dateA - dateB;
    });

  const getProjectName = (projectId) => {
    return projects.find(p => p.id === projectId)?.title;
  };

  return (
    <div>
      <PageHeader>
        <Title>Completed Items</Title>
      </PageHeader>

      <TabContainer>
        <Tab 
          active={activeTab === 'actions'} 
          onClick={() => setActiveTab('actions')}
        >
          Actions
        </Tab>
        <Tab 
          active={activeTab === 'projects'} 
          onClick={() => setActiveTab('projects')}
        >
          Projects
        </Tab>
      </TabContainer>

      <FilterSection>
        <SearchInput
          type="text"
          placeholder={`Search completed ${activeTab}...`}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="newest">Newest First</option>
          <option value="oldest">Oldest First</option>
        </Select>
      </FilterSection>

      {activeTab === 'actions' ? (
        <>
          <CompletedList>
            {completedTasks.map(task => (
              <CompletedItem key={task.id}>
                <TaskTitle>{task.title}</TaskTitle>
                <TaskDetails>
                  {task.context && <Context>{task.context}</Context>}
                  {task.project && (
                    <Context style={{ backgroundColor: '#e9ecef' }}>
                      {getProjectName(task.project)}
                    </Context>
                  )}
                  <DateText>
                    Completed: {format(new Date(task.completedAt || task.createdAt), 'MMM d, yyyy')}
                  </DateText>
                </TaskDetails>
              </CompletedItem>
            ))}
          </CompletedList>

          {completedTasks.length === 0 && (
            <EmptyState>
              <p>
                {searchTerm 
                  ? 'No completed actions found matching your search.'
                  : 'No completed actions yet. Process some tasks to see them here! ✨'}
              </p>
            </EmptyState>
          )}
        </>
      ) : (
        <>
          <CompletedList>
            {completedProjects.map(project => (
              <ProjectCard key={project.id}>
                <ProjectTitle>{project.title}</ProjectTitle>
                {project.description && (
                  <ProjectDescription>{project.description}</ProjectDescription>
                )}
                <CompletionDate>
                  Completed: {format(new Date(project.completedAt || project.createdAt), 'MMM d, yyyy')}
                </CompletionDate>
              </ProjectCard>
            ))}
          </CompletedList>

          {completedProjects.length === 0 && (
            <EmptyState>
              <p>
                {searchTerm 
                  ? 'No completed projects found matching your search.'
                  : 'No completed projects yet. Complete some projects to see them here! ✨'}
              </p>
            </EmptyState>
          )}
        </>
      )}
    </div>
  );
};

export default CompletedActions; 