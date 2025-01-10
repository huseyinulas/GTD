import { useGTD } from '../context/GTDContext';
import styled from '@emotion/styled';

const PageHeader = styled.div`
  margin-bottom: 2rem;
`;

const Title = styled.h2`
  font-size: 1.5rem;
  color: #1a202c;
  margin-bottom: 0.5rem;
`;

const ItemList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const ItemCard = styled.div`
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  }
`;

const ItemHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
`;

const ItemTitle = styled.h3`
  font-size: 1.1rem;
  color: #2d3748;
  margin: 0;
`;

const Button = styled.button`
  padding: 0.5rem 1rem;
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

const EmptyState = styled.div`
  text-align: center;
  padding: 3rem;
  color: #718096;
  background: white;
  border-radius: 12px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
`;

const Someday = () => {
  const { tasks, projects, updateTask, updateProject } = useGTD();
  const somedayTasks = tasks.filter(task => task.status === 'someday');
  const somedayProjects = projects.filter(project => project.status === 'someday');

  const activateTask = (task) => {
    updateTask({
      ...task,
      status: 'next'
    });
  };

  const activateProject = (project) => {
    updateProject({
      ...project,
      status: 'active'
    });
  };

  return (
    <div>
      <PageHeader>
        <Title>Someday/Maybe</Title>
      </PageHeader>

      <ItemList>
        {somedayTasks.map(task => (
          <ItemCard key={task.id}>
            <ItemHeader>
              <ItemTitle>{task.title}</ItemTitle>
              <Button onClick={() => activateTask(task)}>
                Move to Next Actions
              </Button>
            </ItemHeader>
          </ItemCard>
        ))}

        {somedayProjects.map(project => (
          <ItemCard key={project.id}>
            <ItemHeader>
              <ItemTitle>{project.title}</ItemTitle>
              <Button onClick={() => activateProject(project)}>
                Activate Project
              </Button>
            </ItemHeader>
            {project.description && (
              <p style={{ color: '#718096', marginTop: '0.5rem' }}>
                {project.description}
              </p>
            )}
          </ItemCard>
        ))}
      </ItemList>

      {somedayTasks.length === 0 && somedayProjects.length === 0 && (
        <EmptyState>
          <p>No someday/maybe items. Add some ideas! 💭</p>
        </EmptyState>
      )}
    </div>
  );
};

export default Someday; 