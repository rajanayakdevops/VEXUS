import { useEffect, useState } from "react";

function AdminDashboard() {
  const [tab, setTab] = useState("inquiries");

  const [inquiries, setInquiries] = useState([]);
  const [activeProjects, setActiveProjects] = useState([]);
  const [completedProjects, setCompletedProjects] = useState([]);
  const [portfolioProjects, setPortfolioProjects] = useState([]);

  const token = localStorage.getItem("adminToken");

  useEffect(() => {
    fetchInquiries();
    fetchActiveProjects();
    fetchCompletedProjects();
    fetchPortfolioProjects();
  }, []);

  const fetchInquiries = async () => {
    const res = await fetch("http://localhost:5000/api/inquiries");
    const data = await res.json();

    setInquiries(data.filter((i) => i.status === "pending"));
  };

  const fetchActiveProjects = async () => {
    const res = await fetch("http://localhost:5000/api/projects/active", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();
    setActiveProjects(data);
  };

  const fetchCompletedProjects = async () => {
    const res = await fetch("http://localhost:5000/api/projects/completed", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();

    setCompletedProjects(data);
  };

  const fetchPortfolioProjects = async () => {
    const res = await fetch("http://localhost:5000/api/projects");
    const data = await res.json();

    setPortfolioProjects(data.filter((p) => p.status === "portfolio"));
  };

  const approveInquiry = async (id) => {
    await fetch(`http://localhost:5000/api/inquiries/approve/${id}`, {
      method: "POST",
    });

    fetchInquiries();
    fetchActiveProjects();
  };

  const completeProject = async (id) => {
    // console.log("Completing project:", id);
    await fetch(`http://localhost:5000/api/projects/complete/${id}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    fetchActiveProjects();
    fetchCompletedProjects();
  };

  const publishProject = async (id) => {
    await fetch(`http://localhost:5000/api/projects/publish/${id}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    fetchCompletedProjects();
    fetchPortfolioProjects();
  };

  const updateProgress = async (id, progress) => {
    await fetch(`http://localhost:5000/api/projects/progress/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ progress }),
    });

    fetchActiveProjects();
  };

  return (
    <div style={{ padding: "40px" }}>
      <h1>Admin Dashboard</h1>

      {/* Tabs */}
      <div style={{ marginBottom: "30px" }}>
        <button onClick={() => setTab("inquiries")}>Inquiries</button>
        <button onClick={() => setTab("active")}>Active</button>
        <button onClick={() => setTab("completed")}>Completed</button>
        <button onClick={() => setTab("portfolio")}>Portfolio</button>
      </div>

      {/* Inquiries */}
      {tab === "inquiries" &&
        inquiries.map((inq) => (
          <div key={inq._id} style={{ marginBottom: "20px" }}>
            <h4>{inq.name}</h4>

            <p>{inq.description}</p>

            {inq.attachment && (
              <img src={inq.attachment} style={{ width: "200px" }} />
            )}

            <br />

            <button onClick={() => approveInquiry(inq._id)}>Approve</button>
          </div>
        ))}

      {/* Active Projects */}
      {tab === "active" &&
        activeProjects.map((p) => (
          <div key={p._id} style={{ marginBottom: "20px" }}>
            <h4>
              {p.title}

              <span
                style={{
                  background: "#eee",
                  padding: "4px 8px",
                  borderRadius: "6px",
                  marginLeft: "10px",
                  fontSize: "12px",
                }}
              >
                {p.status}
              </span>
            </h4>

            <p>{p.description}</p>

            <p>
              <strong>Progress:</strong> {p.progress}
            </p>

            <div style={{ marginBottom: "10px" }}>
              <button onClick={() => updateProgress(p._id, "planning")}>
                Planning
              </button>

              <button onClick={() => updateProgress(p._id, "design")}>
                Design
              </button>

              <button onClick={() => updateProgress(p._id, "development")}>
                Development
              </button>

              <button onClick={() => updateProgress(p._id, "testing")}>
                Testing
              </button>

              <button onClick={() => updateProgress(p._id, "delivered")}>
                Delivered
              </button>
            </div>

            <button onClick={() => completeProject(p._id)}>
              Mark Completed
            </button>
          </div>
        ))}

      {/* Completed Projects */}
      {tab === "completed" &&
        completedProjects.map((p) => (
          <div key={p._id} style={{ marginBottom: "20px" }}>
            <h4>{p.title}</h4>

            <p>{p.description}</p>

            <button onClick={() => publishProject(p._id)}>
              Publish to Portfolio
            </button>
          </div>
        ))}

      {/* Portfolio */}
      {tab === "portfolio" &&
        portfolioProjects.map((p) => (
          <div key={p._id} style={{ marginBottom: "20px" }}>
            <h4>{p.title}</h4>

            <p>{p.description}</p>

            {p.image && <img src={p.image} style={{ width: "200px" }} />}
          </div>
        ))}
    </div>
  );
}

export default AdminDashboard;
