import React from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import "./Home.css";

const Home = () => {
  return (
    <div className="home-page">
      {/* Hero Section / Banner */}
      <section className="hero-section">
        <Container className="hero-inner text-center">
          <h1 className="hero-title">Tipster Hub — Outsmart the Odds</h1>
          <p className="hero-sub lead">
            Follow proven tipsters, track performance, and make smarter bets
            with community insight.
          </p>

          <div className="hero-ctas">
            <Button variant="primary" size="lg">
              Find a Tip
            </Button>
            <Button variant="outline-light" size="lg">
              Become a Tipster
            </Button>
          </div>

          <Row className="hero-stats mt-4 justify-content-center">
            <Col xs={8} sm={6} md={4} lg={3} className="p-2">
              <div className="stat-box text-center">
                <div className="stat-number">+240u</div>
                <div className="stat-label">Top Profit (30d)</div>
              </div>
            </Col>
            <Col xs={8} sm={6} md={4} lg={3} className="p-2">
              <div className="stat-box text-center">
                <div className="stat-number">1.8k</div>
                <div className="stat-label">Active Followers</div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Main Feed */}
      <Container className="mt-4">
        <Row>
          {/* Left Column: The Feed */}
          <Col md={8}>
            <h4 className="mb-4">Today's Top Tips</h4>

            {/* Hardcoded Mock Card for visual testing */}
            <Card className="mb-4 shadow-sm tip-card">
              <Card.Body>
                <div className="d-flex justify-content-between align-items-start">
                  <div>
                    <h5>Real Madrid vs Barcelona</h5>
                    <span className="badge bg-success me-2">Win</span>
                    <small className="text-muted">La Liga</small>
                  </div>
                  <div className="text-end">
                    <h4 className="text-green">@ 2.10</h4>
                    <small className="text-muted">Stake: 5u</small>
                  </div>
                </div>
                <hr className="border-secondary" />
                <p>
                  Real Madrid have been in great form lately and look likely to
                  control possession; betting lean towards a home win.
                </p>
                <Button variant="outline-light" size="sm">
                  Read Analysis
                </Button>
              </Card.Body>
            </Card>

            <Card className="mb-4 shadow-sm tip-card">
              <Card.Body>
                <h5>Man City vs Arsenal</h5>
                <p>Expecting a high scoring game here.</p>
              </Card.Body>
            </Card>
          </Col>

          {/* Right Column: Sidebar (Top Tipsters) */}
          <Col md={4}>
            <Card className="sidebar-card">
              <Card.Header>Top Tipsters</Card.Header>
              <Card.Body>
                <ul className="list-unstyled">
                  <li className="mb-2">🏆 JohnDoe (+240u)</li>
                  <li className="mb-2">🥈 BetKing (+110u)</li>
                  <li className="mb-2">🥉 GoalHunter (+85u)</li>
                </ul>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Home;
