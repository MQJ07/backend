const express = require('express');
const app = express();
const db = require('./database');
const userRoutes = require('./routes/users');
const taskRoutes = require('./routes/tasks');

app.use(express.json());

app.use('/users', userRoutes);
app.use('/tasks', taskRoutes);

db.sync()
.then(() => {
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => { // Corrected
    console.error('Database synchronization error:', error);
  });
