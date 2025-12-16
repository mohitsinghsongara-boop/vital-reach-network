# Red Drop - Blood Donation Platform

Red Drop is a comprehensive web-based platform designed to connect blood donors, receivers (patients or hospitals), and blood banks through a centralized system. The platform leverages real-time location tracking and smart search algorithms to enable users to quickly find compatible blood donors or nearby blood banks.

## 🎯 Project Overview

Red Drop facilitates efficient matching between blood donors and receivers based on blood type, location, and availability. It prioritizes rapid communication during emergencies, ensuring life-saving responses.

## ✨ Key Features

### Core Features
- **User Authentication**: Secure registration, login, and role-based access (donor, receiver, blood bank, admin)
- **Profile Management**: Users can update personal details, blood type, medical history, and location preferences
- **Search and Matching**: Smart algorithms to filter donors/banks by blood type compatibility, distance, and availability
- **Real-Time Location Tracking**: Integration with geolocation APIs for live mapping of donors and banks
- **Emergency System**: One-click emergency requests that trigger notifications to nearby compatible donors/banks

### Advanced Features
- **Communication Tools**: Chat/messaging system for direct coordination between users
- **Notifications**: Push notifications for matches, requests, and reminders
- **Analytics Dashboard**: For blood banks/admins to view donation trends, inventory levels, and user activity
- **Reporting**: Generate reports on successful matches, response times, and system usage

## 🛠️ Technology Stack

### Frontend
- **Framework**: React.js with TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **State Management**: React Context API
- **Routing**: React Router v6
- **Forms**: React Hook Form with Zod validation
- **HTTP Client**: Fetch API (with service layer)

### Backend (To be implemented)
- **Framework**: Node.js with Express.js
- **Database**: MongoDB or PostgreSQL
- **Authentication**: JWT (JSON Web Tokens)
- **Real-Time**: Socket.io
- **API Integrations**: Twilio (SMS), Firebase (Push Notifications)

## 📁 Project Structure

```
vital-reach-network/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── dashboard/       # Role-specific dashboard components
│   │   ├── layout/         # Layout components
│   │   └── ui/             # shadcn/ui components
│   ├── contexts/           # React contexts (Auth, etc.)
│   ├── pages/              # Page components
│   ├── services/           # API service layer
│   ├── types/              # TypeScript type definitions
│   └── lib/                # Utility functions
├── public/                 # Static assets
└── package.json
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm/yarn/pnpm
- Git

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd vital-reach-network
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Start the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Building for Production

```bash
npm run build
# or
yarn build
# or
pnpm build
```

## 👥 User Roles

### Donor
- Register and manage profile
- Set availability status
- Search for blood requests
- Respond to emergency requests
- View donation history

### Receiver
- Register and manage profile
- Create blood requests
- Create emergency requests
- Search for compatible donors and blood banks
- Communicate with donors/banks

### Blood Bank
- Register and manage profile
- Manage blood inventory
- View and respond to requests
- Generate reports and analytics
- Track distribution

### Admin
- User management and verification
- System analytics and monitoring
- Platform configuration
- Security oversight

## 🔐 Authentication

The application uses JWT-based authentication. Users can:
- Register with role selection (donor, receiver, blood bank)
- Login with email and password
- Access role-specific dashboards
- Protected routes based on authentication status

## 🗺️ Routing

- `/` - Landing page
- `/login` - Login page
- `/register` - Registration page
- `/dashboard` - Role-specific dashboard
- `/profile` - User profile management
- `/search` - Search for donors/banks/receivers
- `/emergency` - Emergency requests
- `/messages` - Messaging system (to be implemented)
- `/analytics` - Analytics dashboard (for admins/blood banks)

## 🩸 Blood Type Compatibility

The platform includes built-in blood type compatibility logic:
- **A+** can receive from: A+, A-, O+, O-
- **A-** can receive from: A-, O-
- **B+** can receive from: B+, B-, O+, O-
- **B-** can receive from: B-, O-
- **AB+** can receive from: All types (universal recipient)
- **AB-** can receive from: A-, B-, AB-, O-
- **O+** can receive from: O+, O-
- **O-** can receive from: O- (universal donor)

## 🔌 API Integration

The application includes a comprehensive API service layer (`src/services/api.ts`) with endpoints for:
- Authentication
- User management
- Search functionality
- Emergency requests
- Inventory management
- Messaging
- Notifications
- Analytics
- Location services

**Note**: Currently using mock data. Connect to actual backend API by setting `VITE_API_BASE_URL` environment variable.

## 🎨 Styling

The application uses Tailwind CSS with custom color scheme optimized for a blood donation platform:
- Primary color: Red/Crimson theme
- Responsive design for mobile and desktop
- Dark mode support (to be fully implemented)

## 📝 Development Status

### ✅ Completed
- Project setup and configuration
- Authentication system with role-based access
- User registration and login
- Dashboard components for all roles
- Profile management
- Search functionality
- Emergency request system
- API service layer structure
- Routing and navigation

### 🚧 In Progress / To Do
- Real-time location tracking with maps integration
- Messaging/chat system
- Analytics dashboard
- Backend API implementation
- Real-time notifications (Socket.io)
- SMS/Email notifications integration
- Testing suite
- Deployment configuration

## 🤝 Contributing

This is a project in development. Contributions are welcome!

## 📄 License

[Specify your license here]

## 👨‍💻 Development Team

- Frontend Developer
- Backend Developer
- Full-Stack Developer
- UI/UX Designer
- QA Tester
- DevOps Engineer

## 📞 Support

For support, please contact [your contact information]

---

**Red Drop** - Connecting lives, one drop at a time. 💉❤️
