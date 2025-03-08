const express = require("express");
const { db } = require("./firebase");

const router = express.Router();

// Create Task
router.post("/tasks", async (req, res) => {
    try {
        const { email, title, description, dueDate, priority, status } = req.body;
        const taskRef = db.collection("Tasks").doc();
        await taskRef.set({ id: taskRef.id, email, title, description, dueDate, priority, status });

        res.status(201).json({ message: "Task created" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Fetch Tasks
router.get("/tasks/:email", async (req, res) => {
    try {
        const { email } = req.params;
        const snapshot = await db.collection("Tasks").where("email", "==", email).get();

        const tasks = snapshot.docs.map(doc => doc.data());
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
