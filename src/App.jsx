import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import styled from '@emotion/styled';
import { GTDProvider } from './context/GTDContext';
import Inbox from './components/Inbox';
import ProcessTask from './components/ProcessTask';
import NextActions from './components/NextActions';
import WaitingFor from './components/WaitingFor';
import Someday from './components/Someday';
import Projects from './components/Projects';
import Reference from './components/Reference';
import WeeklyReview from './components/WeeklyReview';
import CompletedActions from './components/CompletedActions';
import ContextManager from './components/ContextManager';

const AppContainer = styled.div`
  min-height: 100vh;
  background-color: #f8f9fa;
  display: flex;
  flex-direction: column;
`;

const Header = styled.header`
  background-color: white;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  padding: 1rem 2rem;
  position: sticky;
  top: 0;
  z-index: 100;
`;

const HeaderContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled.h1`
  margin: 0;
  color: #2c3e50;
  font-size: 1.5rem;
  font-weight: 600;
`;

const Navigation = styled.nav`
  background-color: white;
  padding: 1rem 2rem;
  border-bottom: 1px solid #eee;
`;

const NavContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  gap: 1rem;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  
  &::-webkit-scrollbar {
    display: none;
  }
`;

const NavLink = styled(Link)`
  color: #2c3e50;
  text-decoration: none;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  font-weight: 500;
  transition: all 0.2s;
  white-space: nowrap;

  &:hover {
    background-color: #f8f9fa;
  }

  &.active {
    background-color: #e9ecef;
    color: #007bff;
  }
`;

const MainContent = styled.main`
  max-width: 1200px;
  margin: 2rem auto;
  padding: 0 2rem;
  width: 100%;
  box-sizing: border-box;
`;

function App() {
  return (
    <GTDProvider>
      <Router>
        <AppContainer>
          <Header>
            <HeaderContent>
              <Logo>GTD Flow</Logo>
            </HeaderContent>
          </Header>
          <Navigation>
            <NavContent>
              <NavLink to="/">Inbox</NavLink>
              <NavLink to="/next-actions">Next Actions</NavLink>
              <NavLink to="/projects">Projects</NavLink>
              <NavLink to="/waiting">Waiting For</NavLink>
              <NavLink to="/someday">Someday/Maybe</NavLink>
              <NavLink to="/reference">Reference</NavLink>
              <NavLink to="/weekly-review">Weekly Review</NavLink>
              <NavLink to="/completed">Completed</NavLink>
              <NavLink to="/contexts">Contexts</NavLink>
            </NavContent>
          </Navigation>
          <MainContent>
            <Routes>
              <Route path="/" element={<Inbox />} />
              <Route path="/process/:taskId" element={<ProcessTask />} />
              <Route path="/next-actions" element={<NextActions />} />
              <Route path="/waiting" element={<WaitingFor />} />
              <Route path="/someday" element={<Someday />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/reference" element={<Reference />} />
              <Route path="/weekly-review" element={<WeeklyReview />} />
              <Route path="/completed" element={<CompletedActions />} />
              <Route path="/contexts" element={<ContextManager />} />
            </Routes>
          </MainContent>
        </AppContainer>
      </Router>
    </GTDProvider>
  );
}

export default App; 