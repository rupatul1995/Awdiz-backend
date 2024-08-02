const express = require('express');
const app = express();
app.use(express.json());
let users = [
 { id: 1, name: 'John Doe', email: 'john@example.com' },
 { id: 2, name: 'Jane Smith', email: 'jane@example.com' }
];
app.delete('/api/users/:id', (req, res) => {

 const userId = parseInt(req.params.id);
 const user = users.find((user) => user.id === userId);

 if (!user) {
    return res.status(404).json({ message: 'User not found' });
    }
    user.name = req.body.name;
    user.email = req.body.email;
    res.json({ message: 'User updated successfully', user });
   });
   app.listen(8000, () => {
    console.log('Server is running on port 8000');
   });