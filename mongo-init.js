db = db.getSiblingDB('admin')

try {
  db.createUser({
    user: 'admin',
    pwd: 'password123',
    roles: [
      {
        role: 'userAdminAnyDatabase',
        db: 'admin'
      },
      {
        role: 'readWriteAnyDatabase',
        db: 'admin'
      },
      {
        role: 'dbAdminAnyDatabase',
        db: 'admin'
      }
    ]
  })
} catch (error) {
  print('Admin user already exists')
}

db.auth('admin', 'password123')

db = db.getSiblingDB('todos')

// Create indexes for better performance
db.todos.createIndex({ createdAt: 1 })
db.todos.createIndex({ category: 1 })
db.todos.createIndex({ priority: 1 })
db.todos.createIndex({ completed: 1 }) 