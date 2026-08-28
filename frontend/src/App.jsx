import { useEffect, useState } from "react";

function App() {
  const [habitName, setHabitName] = useState("");
  const [habits, setHabits] = useState([]);

  const fetchHabits = async () => {
    const response = await fetch(
      "http://localhost:5000/habits"
    );

    const data = await response.json();

    setHabits(data);
  }

  const createHabit = async () => {
    await fetch("http://localhost:5000/habits", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: habitName
      })
    });

    setHabitName("");

    fetchHabits();
  }

  const completeHabit = async (id) => {
    await fetch(
      `http://localhost:5000/habits/${id}/complete`,
      {
        method: "POST",
      }
    );
    
    fetchHabits();
  };


  useEffect(() => {
    fetchHabits();
  }, []);

  const totalXp = habits.reduce(
      (sum, habit) => sum + habit.xp,
      0
  );

  return (
    <div>
      <h1>Habit Island</h1>
      
      <input 
        type="text" 
        value={habitName} 
        onChange={(e) => 
          setHabitName(e.target.value)
        }
      />

      <button onClick={createHabit}>
        Create Habit
      </button>

      <h2>Total XP: {totalXp}</h2>

      {habits.map((habit) => (
        <div key={habit.id}>
          <h3>{habit.name}</h3>
          <p>Streak: {habit.streak}</p>
          <p>XP: {habit.xp}</p>

          <button onClick={() => completeHabit(habit.id)}>
            Complete
          </button>
        </div>
      ))}
    </div>
  );
}

export default App;