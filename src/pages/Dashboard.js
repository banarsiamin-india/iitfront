// Dashboard.js
import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';

const Dashboard = () => {
  return (
    <Container fluid className="mt-4">
      <h2 className="mb-4">Admin Dashboard</h2>

      <Row>
        {/* Project Metrics Overview */}
        <Col md={4}>
          <Card className="mb-4">
            <Card.Header>Project Metrics</Card.Header>
            <Card.Body>
              <ul>
                <li>Total Projects: 8</li>
                <li>Completed Projects: 5</li>
                <li>Ongoing Projects: 3</li>
                <li>Overdue Tasks: 2</li>
              </ul>
            </Card.Body>
          </Card>
        </Col>

        {/* Gantt Chart */}
        <Col md={8}>
          <Card className="mb-4">
            <Card.Header>Gantt Chart</Card.Header>
            <Card.Body>
              <p>Visual representation of project timelines and task dependencies.</p>
              <div style={{ height: '200px', backgroundColor: '#f0f0f0' }}>
                {/* Placeholder for Gantt chart visualization */}
                <p className="text-center text-muted">Gantt Chart Visualization</p>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row>
        {/* Kanban Board */}
        <Col md={12}>
          <Card className="mb-4">
            <Card.Header>Kanban Board</Card.Header>
            <Card.Body>
              <p>Drag-and-drop task management for agile methodologies.</p>
              <div style={{ height: '200px', backgroundColor: '#f0f0f0' }}>
                {/* Placeholder for Kanban board */}
                <p className="text-center text-muted">Kanban Board Visualization</p>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row>
        {/* Project Dashboard */}
        <Col md={12}>
          <Card className="mb-4">
            <Card.Header>Overall Project Status</Card.Header>
            <Card.Body>
              <p>Overview of project statuses, team performance, and key metrics.</p>
              <div style={{ height: '200px', backgroundColor: '#f0f0f0' }}>
                {/* Placeholder for overall project status dashboard */}
                <p className="text-center text-muted">Project Status Visualization</p>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;
