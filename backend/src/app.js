import express from "express"
import projectRoutes from "./routes/project.routes.js"

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use("/api/projects", projectRoutes)

export default app