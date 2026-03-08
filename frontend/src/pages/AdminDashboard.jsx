import { useEffect, useState } from "react";
import styles from "./AdminDashboard.module.css";

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
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Admin Dashboard</h1>
      </div>

      <div className={styles.tabs}>
        <button
          onClick={() => setTab("inquiries")}
          className={`${styles.tab} ${tab === "inquiries" ? styles.tabActive : ""}`}
        >
          Inquiries ({inquiries.length})
        </button>
        <button
          onClick={() => setTab("active")}
          className={`${styles.tab} ${tab === "active" ? styles.tabActive : ""}`}
        >
          Active Projects ({activeProjects.length})
        </button>
        <button
          onClick={() => setTab("completed")}
          className={`${styles.tab} ${tab === "completed" ? styles.tabActive : ""}`}
        >
          Completed ({completedProjects.length})
        </button>
        <button
          onClick={() => setTab("portfolio")}
          className={`${styles.tab} ${tab === "portfolio" ? styles.tabActive : ""}`}
        >
          Portfolio ({portfolioProjects.length})
        </button>
      </div>

      <div className={styles.content}>

        {tab === "inquiries" && (
          <div className={styles.grid}>
            {inquiries.length === 0 ? (
              <div className={styles.empty}>No pending inquiries</div>
            ) : (
              inquiries.map((inq) => (
                <div key={inq._id} className={styles.card}>
                  <div className={styles.cardHeader}>
                    <h4 className={styles.cardTitle}>{inq.name}</h4>
                    <span className={`${styles.badge} ${styles.badgePending}`}>
                      Pending
                    </span>
                  </div>

                  <p className={styles.cardDescription}>{inq.description}</p>

                  <div className={styles.cardInfo}>
                    <div className={styles.infoRow}>
                      <span className={styles.infoLabel}>Email:</span>
                      <span className={styles.infoValue}>{inq.email}</span>
                    </div>
                    <div className={styles.infoRow}>
                      <span className={styles.infoLabel}>Budget:</span>
                      <span className={styles.infoValue}>{inq.budget}</span>
                    </div>
                    <div className={styles.infoRow}>
                      <span className={styles.infoLabel}>Timeline:</span>
                      <span className={styles.infoValue}>{inq.timeline}</span>
                    </div>
                  </div>

                  {inq.attachment && (
                    <img
                      src={inq.attachment}
                      alt="Attachment"
                      className={styles.image}
                    />
                  )}

                  <button
                    onClick={() => approveInquiry(inq._id)}
                    className={`${styles.button} ${styles.buttonSuccess}`}
                  >
                    Approve & Create Project
                  </button>
                </div>
              ))
            )}
          </div>
        )}

        {tab === "active" && (
          <div className={styles.grid}>
            {activeProjects.length === 0 ? (
              <div className={styles.empty}>No active projects</div>
            ) : (
              activeProjects.map((p) => (
                <div key={p._id} className={styles.card}>
                  <div className={styles.cardHeader}>
                    <h4 className={styles.cardTitle}>{p.title}</h4>
                    <span className={`${styles.badge} ${styles.badgeActive}`}>
                      {p.status}
                    </span>
                  </div>

                  <p className={styles.cardDescription}>{p.description}</p>

                  <div className={styles.cardInfo}>
                    <div className={styles.infoRow}>
                      <span className={styles.infoLabel}>Progress:</span>
                      <span className={styles.infoValue}>{p.progress}</span>
                    </div>
                  </div>

                  <div className={styles.progressButtons}>
                    <button
                      onClick={() => updateProgress(p._id, "planning")}
                      className={styles.progressBtn}
                    >
                      Planning
                    </button>
                    <button
                      onClick={() => updateProgress(p._id, "design")}
                      className={styles.progressBtn}
                    >
                      Design
                    </button>
                    <button
                      onClick={() => updateProgress(p._id, "development")}
                      className={styles.progressBtn}
                    >
                      Development
                    </button>
                    <button
                      onClick={() => updateProgress(p._id, "testing")}
                      className={styles.progressBtn}
                    >
                      Testing
                    </button>
                    <button
                      onClick={() => updateProgress(p._id, "delivered")}
                      className={styles.progressBtn}
                    >
                      Delivered
                    </button>
                  </div>

                  <button
                    onClick={() => completeProject(p._id)}
                    className={styles.button}
                  >
                    Mark as Completed
                  </button>
                </div>
              ))
            )}
          </div>
        )}

        {tab === "completed" && (
          <div className={styles.grid}>
            {completedProjects.length === 0 ? (
              <div className={styles.empty}>No completed projects</div>
            ) : (
              completedProjects.map((p) => (
                <div key={p._id} className={styles.card}>
                  <div className={styles.cardHeader}>
                    <h4 className={styles.cardTitle}>{p.title}</h4>
                    <span className={`${styles.badge} ${styles.badgeCompleted}`}>
                      Completed
                    </span>
                  </div>

                  <p className={styles.cardDescription}>{p.description}</p>

                  <button
                    onClick={() => publishProject(p._id)}
                    className={`${styles.button} ${styles.buttonPrimary}`}
                  >
                    Publish to Portfolio
                  </button>
                </div>
              ))
            )}
          </div>
        )}

        {tab === "portfolio" && (
          <div className={styles.grid}>
            {portfolioProjects.length === 0 ? (
              <div className={styles.empty}>No portfolio projects</div>
            ) : (
              portfolioProjects.map((p) => (
                <div key={p._id} className={styles.card}>
                  <div className={styles.cardHeader}>
                    <h4 className={styles.cardTitle}>{p.title}</h4>
                    <span className={`${styles.badge} ${styles.badgePortfolio}`}>
                      Portfolio
                    </span>
                  </div>

                  {p.image && (
                    <img
                      src={p.image}
                      alt={p.title}
                      className={styles.image}
                    />
                  )}

                  <p className={styles.cardDescription}>{p.description}</p>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminDashboard;
