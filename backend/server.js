const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.json({
        message: "Habit Island API Running"
    });
});

app.listen(5000, () => {
    console.log("Server running on port 5000");
});

let habits = [];

app.get("/habits", (req, res) => {
    res.json(habits);
});

app.post("/habits", (req, res) => {
    const habit = {
        id: Date.now(),
        name: req.body.name,
        streak: 0,
        xp: 0
    };

    habits.push(habit);

    res.json(habit);
})