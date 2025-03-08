# Docker Task Manager

A modern, responsive web application for managing Docker-related tasks with a beautiful Material-UI interface. Built with React.js and Node.js, this application helps you organize and track your Docker operations efficiently.

![Docker Task Manager](https://img.shields.io/badge/Docker-Task%20Manager-blue)
![React](https://img.shields.io/badge/React-18.2.0-61DAFB)
![Node.js](https://img.shields.io/badge/Node.js-18.x-339933)
![Material-UI](https://img.shields.io/badge/Material--UI-5.x-007FFF)

## 🌟 Features

- **Modern UI/UX**: Clean and intuitive interface built with Material-UI
- **Responsive Design**: Works seamlessly across all devices
- **Task Management**:
  - Add, update, and delete Docker tasks
  - Categorize tasks (Containers, Images, Networks, Volumes)
  - Set priority levels (High, Medium, Low)
  - Mark tasks as complete/incomplete
- **Real-time Updates**: Instant feedback for all actions
- **Error Handling**: Comprehensive error management and user notifications
- **Security Features**:
  - Rate limiting
  - CORS protection
  - Security headers with Helmet
  - Input validation

## 🚀 Tech Stack

### Frontend
- React.js
- Material-UI
- Axios for API calls
- Custom theme with gradient effects

### Backend
- Node.js
- Express.js
- In-memory storage (can be extended to use a database)
- Security middleware (Helmet, CORS, Rate Limiting)

## 🛠️ Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/docker-task-manager.git
   cd docker-task-manager
   ```

2. Start the application using Docker Compose:
   ```bash
   docker-compose up -d
   ```

3. Access the application (after deploying in your docker):
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000

## 📁 Project Structure

```
docker-task-manager/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── TodoCard/
│   │   │   ├── TodoForm/
│   │   │   └── Footer/
│   │   ├── services/
│   │   ├── utils/
│   │   └── styles/
│   └── Dockerfile
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── routes/
│   │   ├── middleware/
│   │   └── server.js
│   └── Dockerfile
└── docker-compose.yml
```

## 🔧 API Endpoints

- `GET /api/todos` - Get all todos
- `POST /api/todos` - Create a new todo
- `PUT /api/todos/:id` - Update a todo
- `DELETE /api/todos/:id` - Delete a todo

## 🎨 UI Components

- **TodoCard**: Displays individual todo items with priority indicators
- **TodoForm**: Form for adding new todos with category and priority selection
- **Footer**: Project information and social links

## 🔒 Security

- Rate limiting to prevent abuse
- CORS enabled for secure cross-origin requests
- Helmet.js for security headers
- Input validation and sanitization

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License.

## 👤 Author

**Ark Barua**
- GitHub: [@Pro5765](https://github.com/Pro5765)
- LinkedIn: [Ark Barua](https://www.linkedin.com/in/arkbarua)
- Email: arb2442004@sicsr.ac.in

## 🙏 Acknowledgments

- Material-UI for the beautiful components
- Docker team for the amazing containerization platform
- All contributors who help improve this project

---

Made with ❤️ by Ark Barua
