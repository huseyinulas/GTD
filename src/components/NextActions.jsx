import { useState } from 'react';
import { useGTD } from '../context/GTDContext';
import { format, isAfter, isBefore, parseISO, startOfToday } from 'date-fns';
import { Input } from '../styles/shared';
import {
  PageHeader,
  Title,
  FilterSection,
  ContextFilter,
  ContextButton,
  FilterBar,
  Select,
  TaskList,
  TaskItem,
  TaskDetails,
  TaskTitle,
  Context,
  TaskActions,
  DateInput,
  CompleteButton,
  StatsSection,
  StatCard,
  SearchBar,
  TaskNotes,
  ProjectFilter,
  ProjectTag,
} from '../styles/components/NextActions.styles';

const NextActions = () => {
  const { tasks, updateTask, contexts, hiddenContexts, projects } = useGTD();
  const [selectedContext, setSelectedContext] = useState('');
  const [selectedProject, setSelectedProject] = useState('');
  const [sortBy, setSortBy] = useState('dueDate');
  const [dueDateFilter, setDueDateFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  
  const today = startOfToday();

  const filterByDueDate = (task) => {
    if (!task.dueDate) return dueDateFilter === 'all';
    const dueDate = parseISO(task.dueDate);
    
    switch (dueDateFilter) {
      case 'today':
        return format(dueDate, 'yyyy-MM-dd') === format(today, 'yyyy-MM-dd');
      case 'overdue':
        return isBefore(dueDate, today);
      case 'upcoming':
        return isAfter(dueDate, today);
      default:
        return true;
    }
  };

  const sortTasks = (tasks) => {
    return [...tasks].sort((a, b) => {
      if (sortBy === 'dueDate') {
        if (!a.dueDate) return 1;
        if (!b.dueDate) return -1;
        return parseISO(a.dueDate).getTime() - parseISO(b.dueDate).getTime();
      }
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });
  };

  const filterBySearch = (task) => {
    if (!searchTerm) return true;
    const searchLower = searchTerm.toLowerCase();
    return (
      task.title.toLowerCase().includes(searchLower) ||
      (task.notes && task.notes.toLowerCase().includes(searchLower)) ||
      (task.context && task.context.toLowerCase().includes(searchLower))
    );
  };

  const nextActionTasks = sortTasks(
    tasks.filter(task => 
      task.status === 'next' && 
      (!selectedContext || task.context === selectedContext) &&
      (!selectedProject || task.project === selectedProject) &&
      filterByDueDate(task) &&
      filterBySearch(task)
    )
  );

  const isTaskOverdue = (dueDate) => {
    return dueDate && isBefore(parseISO(dueDate), today);
  };

  const isTaskDueToday = (dueDate) => {
    return dueDate && format(parseISO(dueDate), 'yyyy-MM-dd') === format(today, 'yyyy-MM-dd');
  };

  const handleDueDateChange = (taskId, newDate) => {
    const task = tasks.find(t => t.id === taskId);
    if (task) {
      updateTask({
        ...task,
        dueDate: newDate
      });
    }
  };

  const handleComplete = (task) => {
    updateTask({
      ...task,
      status: 'done',
      completedAt: new Date().toISOString()
    });
  };

  const stats = {
    total: nextActionTasks.length,
    overdue: nextActionTasks.filter(task => isTaskOverdue(task.dueDate)).length,
    dueToday: nextActionTasks.filter(task => isTaskDueToday(task.dueDate)).length,
    withContext: nextActionTasks.filter(task => task.context).length
  };

  const visibleContexts = contexts.filter(context => !hiddenContexts.has(context));

  const activeProjects = projects.filter(p => p.status === 'active');

  return (
    <div>
      <PageHeader>
        <Title>Next Actions</Title>
      </PageHeader>

      <StatsSection>
        <StatCard>
          <h4>Total Tasks</h4>
          <p>{stats.total}</p>
        </StatCard>
        <StatCard>
          <h4>Overdue</h4>
          <p>{stats.overdue}</p>
        </StatCard>
        <StatCard>
          <h4>Due Today</h4>
          <p>{stats.dueToday}</p>
        </StatCard>
        <StatCard>
          <h4>With Context</h4>
          <p>{stats.withContext}</p>
        </StatCard>
      </StatsSection>

      <SearchBar>
        <Input
          type="text"
          placeholder="Search tasks..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </SearchBar>

      <FilterSection>
        <ContextFilter>
          <ContextButton 
            active={!selectedContext} 
            onClick={() => setSelectedContext('')}
          >
            All Contexts
          </ContextButton>
          {visibleContexts.map(context => (
            <ContextButton
              key={context}
              active={context === selectedContext}
              onClick={() => setSelectedContext(context)}
            >
              {context}
            </ContextButton>
          ))}
        </ContextFilter>

        <ProjectFilter>
          <ContextButton 
            active={!selectedProject} 
            onClick={() => setSelectedProject('')}
          >
            All Projects
          </ContextButton>
          {activeProjects.map(project => (
            <ContextButton
              key={project.id}
              active={project.id === selectedProject}
              onClick={() => setSelectedProject(project.id)}
            >
              {project.title}
            </ContextButton>
          ))}
        </ProjectFilter>

        <FilterBar>
          <Select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="dueDate">Sort by Due Date</option>
            <option value="created">Sort by Created Date</option>
          </Select>

          <Select value={dueDateFilter} onChange={(e) => setDueDateFilter(e.target.value)}>
            <option value="all">All Due Dates</option>
            <option value="today">Due Today</option>
            <option value="overdue">Overdue</option>
            <option value="upcoming">Upcoming</option>
          </Select>
        </FilterBar>
      </FilterSection>

      <TaskList>
        {nextActionTasks.map(task => {
          const project = projects.find(p => p.id === task.project);
          
          return (
            <TaskItem
              key={task.id}
              isOverdue={isTaskOverdue(task.dueDate)}
              isDueToday={isTaskDueToday(task.dueDate)}
            >
              <TaskDetails>
                <TaskTitle>{task.title}</TaskTitle>
                <div>
                  {task.context && <Context>{task.context}</Context>}
                  {project && <ProjectTag>{project.title}</ProjectTag>}
                </div>
                {task.notes && <TaskNotes>{task.notes}</TaskNotes>}
              </TaskDetails>
              <TaskActions>
                <DateInput
                  type="date"
                  value={task.dueDate || ''}
                  onChange={(e) => handleDueDateChange(task.id, e.target.value)}
                />
                <CompleteButton onClick={() => handleComplete(task)}>
                  Complete
                </CompleteButton>
              </TaskActions>
            </TaskItem>
          );
        })}
      </TaskList>
    </div>
  );
};

export default NextActions; 