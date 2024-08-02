const express = require('express');
const app = express();
let users = [
 { id: 1, name: 'John Doe', email: 'john@example.com' },
 { id: 2, name: 'Jane Smith', email: 'jane@example.com' }
];
app.delete('/api/users/:id', (req, res) => {
 const userId = parseInt(req.params.id);
 const userIndex = users.findIndex((user) => user.id === userId);
 if (userIndex === -1) {
 return res.status(404).json({ message: 'User not found' });
 }
 users.splice(userIndex, 1);
 res.json({ message: 'User deleted successfully' });
});
app.listen(8000, () => {
 console.log('Server is running on port 8000');
});