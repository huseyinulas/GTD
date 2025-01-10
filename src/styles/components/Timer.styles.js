import styled from '@emotion/styled';

export const TimerContainer = styled.div`
  text-align: center;
  margin: 20px 0;
`;

export const TimerDisplay = styled.div`
  font-size: 2rem;
  font-weight: bold;
  color: ${props => props.isWarning ? '#dc3545' : '#28a745'};
  margin: 10px 0;
`;

export const ProgressBarContainer = styled.div`
  width: 100%;
  height: 10px;
  background-color: #e9ecef;
  border-radius: 5px;
  margin: 10px 0;
  overflow: hidden;
`;

export const ProgressBar = styled.div`
  width: ${props => props.progress}%;
  height: 100%;
  background-color: ${props => props.isWarning ? '#dc3545' : '#28a745'};
  transition: width 1s linear;
`;

export const TimerButton = styled.button`
  padding: 8px 16px;
  background-color: ${props => props.isRunning ? '#dc3545' : '#28a745'};
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin: 0 5px;
  
  &:hover {
    background-color: ${props => props.isRunning ? '#c82333' : '#218838'};
  }
`; 