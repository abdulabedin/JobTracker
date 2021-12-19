import React, { useState, useEffect } from "react";
import { Col, Row, Image, Modal, Button, ButtonToolbar } from "react-bootstrap";
import AuthForm from "../components/AuthForm";
import JobForm from "../components/JobForm";
import JobList from "../components/JobList";
import headerImage from "../images/jobsearch.jpg";
import { setTokenHeader, api } from "../services/api";
import jwtDecode from "jwt-decode";

const defaultJobs = [
  {
    _id: 1,
    title: "Sample Job Title",
    company: "Company",
    site: "Job Site",
    salary: "25k",
    location: "Location",
    link: "",
    resume: "",
    coverLetter: "",
    status: "Applied",
  },
];

const Page4 = () => {
  const [signedIn, setSignedIn] = useState(false);
  const [showJobModal, setShowJobModal] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState("Sign Up");
  const [listType, setListType] = useState(null);
  const [currentJob, setCurrentJob] = useState({});
  const [jobs, setJobs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState("");
  const [user, setUser] = useState({});

  useEffect(() => {
    let isActive = true;
    const fetchJobs = async () => {
      if (isActive) {
        if (!signedIn) {
          if (localStorage.jwtToken) {
            setTokenHeader(localStorage.jwtToken);
            const data = jwtDecode(localStorage.jwtToken);
            console.log(data);
            setUser(data);
            setSignedIn(true);
          } else if (jobs.length === 0) {
            setJobs(defaultJobs);
          }
        } else {
          try {
            const response = await api.get("/jobs");
            console.log("JOBS", response.data);
            setJobs(response.data);
          } catch (err) {
            console.log("Error", err.response.data);
            setError(err.response.data.error);
          }
        }
      }
    };
    fetchJobs();
    return () => {
      isActive = false;
    };
  }, [signedIn]);

  const filter = (status, jobs) => {
    return jobs.filter((j) => j.status == status);
  };
  const createJob = async (data) => {
    console.log("CREATE ", data);
    if (!signedIn) {
      const newJobData = {
        _id: Date.now().toString(),
        ...data,
      };
      setJobs([...jobs, newJobData]);
    } else {
      try {
        const response = await api.post("/jobs", data);
        setJobs(response.data);
      } catch (err) {
        console.log("Error", err.response.data);
        setError(err.response.data.error);
      }
    }
    setShowJobModal(false);
    return;
  };
  const updateJob = async (id, data) => {
    console.log("UPDATE ", id, data);
    if (!signedIn) {
      const newJobs = jobs.map((j) => {
        if (j._id === id) {
          return data;
        }
        return j;
      });

      setJobs([...newJobs]);
    } else {
      try {
        const response = await api.put(`/jobs/${id}`, data);
        setJobs(response.data);
      } catch (err) {
        console.log("Error", err);
        setError(err.response.data.error);
      }
    }
    setShowJobModal(false);
    return;
  };
  const deleteJob = async (id) => {
    console.log(id);
    if (!signedIn) {
      const newJobs = jobs.filter((j) => {
        if (j._id === id) return false;
        return true;
      });
      setJobs([...newJobs]);
    } else {
      try {
        const response = await api.delete(`/jobs/${id}`);
        setJobs(response.data);
      } catch (err) {
        console.log("Error", err.response.data);
        setError(err.response.data.error);
      }
    }
    return;
  };
  const search = () => {
    if (searchTerm.length > 0) {
      console.log("SEARCH");
      const newJobs = jobs.filter((j) => {
        for (const [key, value] of Object.entries(j)) {
          if (typeof value === "string" && value.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1) {
            return true;
          }
        }
        return false;
      });

      return newJobs;
    }
    return jobs;
  };
  const signUp = async (values) => {
    try {
      console.log("Sign Up");
      const response = await api.post("/signup", values);

      console.log("RESPONSE", response.data);

      const { token, firstName, userId } = response.data;
      localStorage.setItem("jwtToken", token);
      setUser({ firstName, userId });
      setTokenHeader(token);
      setSignedIn(true);
      setShowAuthModal(false);
    } catch (err) {
      console.log("Error", err.response.data);
      setError(err.response.data.error);
    }
  };

  const login = async (values) => {
    try {
      console.log("LOGIN");
      const response = await api.post("/login", values);
      console.log("Response ", response.data);

      const { token, firstName, userId } = response.data;
      localStorage.setItem("jwtToken", token);
      setUser({ firstName, userId });
      setTokenHeader(token);
      setSignedIn(true);
      setShowAuthModal(false);
    } catch (err) {
      console.log("ERROR: ", err.response.data);
      setError(err.response.data.error);
    }
  };

  const logout = () => {
    localStorage.clear();
    setTokenHeader(false);
    setUser({});
    setSignedIn(false);
    setJobs(defaultJobs);
  };

  return (
    <div>
      <Row className="py-2 d-flex flex-row justify-content-center" style={{ width: "100%" }}>
        <Col xs={12} md={6} className="d-flex justify-content-center align-items-center px-5">
          <div>
            {signedIn && Object.keys(user).length > 0 ? (
              <h1>Welcome {user.firstName} !</h1>
            ) : (
              <h1>Simplify your job search</h1>
            )}

            <p>Keep track of all of your jobs during the each stage of the hiring process</p>
            {signedIn ? (
              <Button
                variant="success"
                className="rounded-pill mr-5"
                onClick={() => {
                  logout();
                }}
              >
                Sign Out
              </Button>
            ) : (
              <ButtonToolbar>
                <Button
                  variant="success"
                  className="rounded-pill me-2"
                  onClick={() => {
                    setShowAuthModal(true);
                    setAuthMode("Sign Up");
                  }}
                >
                  Sign Up
                </Button>
                <Button
                  variant="outline-success"
                  className="rounded-pill outline ml-5"
                  onClick={() => {
                    setShowAuthModal(true);
                    setAuthMode("Log In");
                  }}
                >
                  Log In
                </Button>
              </ButtonToolbar>
            )}
          </div>
        </Col>
        <Col xs={12} md={6}>
          <img src={headerImage} style={{ width: "100%" }}></img>
        </Col>
        <input
          style={{ position: "relative", zIndex: 5, width: "70%", top: 50, borderColor: "#6c757d" }}
          type="text"
          name="search"
          className="form-control mb-4 rounded-pill"
          aria-label="searchBar"
          placeholder="Filter"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </Row>
      <Row className="m-0" style={{ backgroundColor: "#fbfbfd", width: "100%" }}>
        <Col
          className="p-3"
          xs={12}
          md={4}
          style={{ borderRight: "1px solid #ece9f2", borderTop: "1px solid #ece9f2", height: "100%" }}
        >
          <JobList
            title="Applied"
            data={filter("Applied", search(jobs))}
            setShowModal={setShowJobModal}
            setCurrentJob={setCurrentJob}
            deleteJob={deleteJob}
            setListType={setListType}
          />
        </Col>
        <Col
          className="p-3"
          xs={12}
          md={4}
          style={{ borderRight: "1px solid #ece9f2", borderTop: "1px solid #ece9f2", height: "100%" }}
        >
          <JobList
            title="Wishlist"
            data={filter("Wishlist", search(jobs))}
            setShowModal={setShowJobModal}
            setCurrentJob={setCurrentJob}
            deleteJob={deleteJob}
            setListType={setListType}
          />
        </Col>
        <Col
          className="p-3"
          xs={12}
          md={4}
          style={{ borderRight: "1px solid #ece9f2", borderTop: "1px solid #ece9f2", height: "100%" }}
        >
          <JobList
            title="Interview"
            data={filter("Interview", search(jobs))}
            setShowModal={setShowJobModal}
            setCurrentJob={setCurrentJob}
            deleteJob={deleteJob}
            setListType={setListType}
          />
        </Col>
        <Col
          className="p-3"
          xs={12}
          md={4}
          style={{ borderRight: "1px solid #ece9f2", borderTop: "1px solid #ece9f2", height: "100%" }}
        >
          <JobList
            title="Offer"
            data={filter("Offer", search(jobs))}
            setShowModal={setShowJobModal}
            setCurrentJob={setCurrentJob}
            deleteJob={deleteJob}
            setListType={setListType}
          />
        </Col>
        <Col
          className="p-3"
          xs={12}
          md={4}
          style={{ borderRight: "1px solid #ece9f2", borderTop: "1px solid #ece9f2", height: "100%" }}
        >
          <JobList
            title="Rejected"
            data={filter("Rejected", search(jobs))}
            setShowModal={setShowJobModal}
            setCurrentJob={setCurrentJob}
            deleteJob={deleteJob}
            setListType={setListType}
          />
        </Col>
        <Col
          className="p-3"
          xs={12}
          md={4}
          style={{ borderRight: "1px solid #ece9f2", borderTop: "1px solid #ece9f2", height: "100%" }}
        >
          <JobList
            title="Accepted"
            data={filter("Accepted", search(jobs))}
            setShowModal={setShowJobModal}
            setCurrentJob={setCurrentJob}
            deleteJob={deleteJob}
            setListType={setListType}
          />
        </Col>
      </Row>
      <Modal
        size="md"
        show={showJobModal}
        onHide={() => {
          setShowJobModal(false);
          setError("");
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-lg">Add Job</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <JobForm
            currentJob={currentJob}
            updateJob={updateJob}
            createJob={createJob}
            listType={listType}
            error={error}
          />
        </Modal.Body>
      </Modal>
      <Modal
        size="md"
        show={showAuthModal}
        onHide={() => {
          setShowAuthModal(false);
          setError("");
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-lg">{authMode}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AuthForm signUp={signUp} login={login} authMode={authMode} error={error} />
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Page4;
