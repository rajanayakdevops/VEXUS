import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";

function PortfolioDetail() {
  const { slug } = useParams();

  const [project, setProject] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5000/api/projects/${slug}`)
      .then((res) => res.json())
      .then((data) => setProject(data))
      .catch((err) => console.log(err));
  }, [slug]);

  if (!project) {
    return <p style={{ padding: "5rem" }}>Loading...</p>;
  }

  return (
    <>
      <Navbar />

      <main
        style={{
          minHeight: "100vh",
          paddingTop: "6rem",
          paddingBottom: "4rem",
        }}
      >
        <div style={{ maxWidth: "900px", margin: "0 auto", padding: "1rem" }}>
          <h1>{project.title}</h1>

          <img
            src={project.image}
            alt={project.title}
            style={{ width: "100%", marginTop: "2rem", borderRadius: "12px" }}
          />

          <p style={{ marginTop: "2rem", fontSize: "18px" }}>
            {project.summary}
          </p>

          <div style={{ marginTop: "2rem" }}>
            {project.tags?.map((tag) => (
              <span
                key={tag}
                style={{
                  marginRight: "10px",
                  background: "#eee",
                  padding: "6px 10px",
                  borderRadius: "8px",
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}

export default PortfolioDetail;
