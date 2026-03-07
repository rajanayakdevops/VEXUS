import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

function TrackProject() {
  const { slug } = useParams();

  const [project, setProject] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5000/api/projects/track/${slug}`)
      .then((res) => res.json())
      .then((data) => setProject(data));
  }, []);

  if (!project) {
    return <p>Loading...</p>;
  }

  return (
    <div style={{ padding: "50px" }}>
      <h1>{project.title}</h1>

      <p>Status: {project.progress}</p>

      <div>
        <h3>Progress</h3>

        <ul>
          <li>Planning</li>
          <li>Design</li>
          <li>Development</li>
          <li>Testing</li>
          <li>Delivered</li>
        </ul>
      </div>
    </div>
  );
}

export default TrackProject;
