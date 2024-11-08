// Dashboard.js
import React from 'react';
import { Form, Button, Card, Container, Row, Col, InputGroup } from 'react-bootstrap';

const Settings = () => {
  return (
    <Container className="mt-4">
      <h2 className="mb-4">Settings</h2>
      
      {/* Site Settings */}
      <Card className="mb-4">
        <Card.Header>Site Settings</Card.Header>
        <Card.Body>
          <Form>
            <Row>
              <Col md={6}>
                <Form.Group controlId="siteLogo" className="mb-3">
                  <Form.Label>Site Logo</Form.Label>
                  <Form.Control type="file" />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="siteFavicon" className="mb-3">
                  <Form.Label>Site Favicon</Form.Label>
                  <Form.Control type="file" />
                </Form.Group>
              </Col>
            </Row>
            
            <Form.Group controlId="siteTitle" className="mb-3">
              <Form.Label>Site Title</Form.Label>
              <Form.Control type="text" placeholder="Enter site title" />
            </Form.Group>

            <Form.Group controlId="siteDescription" className="mb-3">
              <Form.Label>Site Description</Form.Label>
              <Form.Control as="textarea" rows={3} placeholder="Enter site description" />
            </Form.Group>

            <Button variant="primary" type="submit">
              Save Site Settings
            </Button>
          </Form>
        </Card.Body>
      </Card>

      {/* SMTP Settings */}
      <Card className="mb-4">
        <Card.Header>SMTP Settings</Card.Header>
        <Card.Body>
          <Form>
            <Form.Group controlId="smtpHost" className="mb-3">
              <Form.Label>SMTP Host</Form.Label>
              <Form.Control type="text" placeholder="Enter SMTP host" />
            </Form.Group>

            <Form.Group controlId="smtpPort" className="mb-3">
              <Form.Label>SMTP Port</Form.Label>
              <Form.Control type="number" placeholder="Enter SMTP port" />
            </Form.Group>

            <Form.Group controlId="smtpUser" className="mb-3">
              <Form.Label>SMTP Username</Form.Label>
              <Form.Control type="text" placeholder="Enter SMTP username" />
            </Form.Group>

            <Form.Group controlId="smtpPassword" className="mb-3">
              <Form.Label>SMTP Password</Form.Label>
              <Form.Control type="password" placeholder="Enter SMTP password" />
            </Form.Group>

            <Form.Group controlId="smtpEncryption" className="mb-3">
              <Form.Label>SMTP Encryption</Form.Label>
              <Form.Select aria-label="SMTP encryption">
                <option value="none">None</option>
                <option value="ssl">SSL</option>
                <option value="tls">TLS</option>
              </Form.Select>
            </Form.Group>

            <Button variant="primary" type="submit">
              Save SMTP Settings
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Settings;

