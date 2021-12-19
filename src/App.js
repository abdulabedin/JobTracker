import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Footer from "./components/Footer";
import Page1 from "./containers/Page1";
import Page2 from "./containers/Page2";
import Page3 from "./containers/Page3";
import Page4 from "./containers/Page4";
import Page5 from "./containers/Page5";
import Page6 from "./containers/Page6";
import { Navbar, Container, Nav } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <Router>
      <div
        className="App"
        style={{ minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "space-between" }}
      >
        <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
          <Container>
            <Navbar.Brand>CPS530</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link href="/page1">Frameworks</Nav.Link>
                <Nav.Link href="/page2">Installation</Nav.Link>
                <Nav.Link href="/page3">Tutorial</Nav.Link>
                <Nav.Link href="/page4">Demo</Nav.Link>
                <Nav.Link href="/page5">Conclusion</Nav.Link>
                <Nav.Link href="/page6">Credits</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
        <Routes>
          <Route path="/page1" element={<Page1 />} />
          <Route path="/page2" element={<Page2 />} />
          <Route path="/page3" element={<Page3 />} />
          <Route path="/page4" element={<Page4 />} />
          <Route path="/page5" element={<Page5 />} />
          <Route path="/page6" element={<Page6 />} />
          <Route path="/" element={<Page1 />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
