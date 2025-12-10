import React, { useState } from "react";
import { Nav, NavDropdown, ListGroup, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import {
  FaBars,
  FaHome,
  FaListAlt,
  FaUsers,
  FaTrophy,
  FaPlusSquare,
  FaAngleDown,
  FaAngleRight,
  FaFutbol,
} from "react-icons/fa";
import "./Sidebar.css";

const Sidebar = () => {
  // State to manage sidebar visibility/collapse on desktop
  const [isOpen, setIsOpen] = useState(true);
  // State to manage the open/close of the 'Leagues' dropdown
  const [isLeaguesOpen, setIsLeaguesOpen] = useState(false);

  const toggleSidebar = () => setIsOpen(!isOpen);
  const toggleLeagues = () => setIsLeaguesOpen(!isLeaguesOpen);

  // Array of major leagues for easy mapping
  const majorLeagues = [
    { name: "Premier League", path: "/tips/league/epl", icon: "🏴󠁧󠁢󠁥󠁮󠁧󠁿" },
    { name: "La Liga", path: "/tips/league/laliga", icon: "🇪🇸" },
    { name: "Serie A", path: "/tips/league/seriea", icon: "🇮🇹" },
    { name: "Bundesliga", path: "/tips/league/bundesliga", icon: "🇩🇪" },
    { name: "Ligue 1", path: "/tips/league/ligue1", icon: "🇫🇷" },
  ];

  return (
    <div className={`sidebar-wrapper ${isOpen ? "open" : "closed"}`}>
      <Button
        variant="outline-secondary"
        className="toggle-button"
        onClick={toggleSidebar}
      >
        <FaBars />
      </Button>

      <Nav className="flex-column p-3">
        {/* 1. Primary Navigation Links */}
        <Nav.Link as={Link} to="/" className="sidebar-item">
          <FaHome className="me-2" />
          {isOpen && "Feed"}
        </Nav.Link>

        <Nav.Link as={Link} to="/all-tips" className="sidebar-item">
          <FaListAlt className="me-2" />
          {isOpen && "All Tips"}
        </Nav.Link>

        {/* 2. Leagues Dropdown/Section */}
        <div className="sidebar-dropdown-header" onClick={toggleLeagues}>
          <FaFutbol className="me-2" />
          {isOpen && "Leagues"}
          {isOpen &&
            (isLeaguesOpen ? (
              <FaAngleDown className="float-end" />
            ) : (
              <FaAngleRight className="float-end" />
            ))}
        </div>

        {/* Sub-menu for Leagues */}
        {isOpen && isLeaguesOpen && (
          <ListGroup variant="flush" className="leagues-list">
            {majorLeagues.map((league) => (
              <ListGroup.Item
                key={league.path}
                as={Link}
                to={league.path}
                className="sidebar-sub-item"
              >
                {league.icon} {league.name}
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}

        {/* 3. Secondary Navigation Links */}
        <Nav.Link as={Link} to="/tipsters" className="sidebar-item mt-3">
          <FaUsers className="me-2" />
          {isOpen && "Tipsters"}
        </Nav.Link>

        <Nav.Link as={Link} to="/ranking" className="sidebar-item">
          <FaTrophy className="me-2" />
          {isOpen && "Ranking"}
        </Nav.Link>

        {/* 4. CTA Button (For Logged In Users) */}
        <Button
          as={Link}
          to="/add-tip"
          variant="success"
          className={`mt-4 ${isOpen ? "" : "d-block mx-auto"}`}
          size={isOpen ? "md" : "sm"}
        >
          <FaPlusSquare className="me-2" />
          {isOpen ? "Publish New Pick" : ""}
        </Button>
      </Nav>
    </div>
  );
};

export default Sidebar;
