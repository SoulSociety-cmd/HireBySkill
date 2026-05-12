# 🧩 SkillTest Platform

**SkillTest Platform** là một nền tảng kết nối doanh nghiệp với sinh viên và các ứng viên mới ra trường thông qua các bài kiểm tra kỹ năng thực tế (code challenge + MCQ). Dự án có hệ thống auto-grading thông minh và dashboard cho cả sinh viên và doanh nghiệp.

---
🔗 Live Demo: https://skilltest-platform.onrender.com/  

## 🚀 Features

### **Frontend**

* React 18 + Vite + TailwindCSS
* 5 Pages chính:

  1. **Auth Page**: Đăng nhập/Đăng ký (Google OAuth)
  2. **Dashboard**: Danh sách bài test + Thống kê
  3. **Test Page**: Code editor + Timer + MCQ
  4. **Profile**: Lịch sử test, Skill badges
  5. **Company Dashboard**: Tạo test + Xem ứng viên
* Components reusable: `TestCard`, `SkillBadge`, `ProgressBar`, `CodeEditor`
* State management: Zustand
* Responsive design & Dark/Light theme
* Realtime timer & submission status

### **Backend**

* Node.js + Express + MongoDB
* REST API hoàn chỉnh (15+ endpoints)

  * `/auth` → register, login, Google OAuth
  * `/tests` → list, create, get, submit
  * `/submissions` → list my submissions, get by id
  * `/matches` → view company matches, invite candidates
  * `/profile` → get/update user profile
* Features:

  * JWT authentication
  * Rate limiting
  * File upload cho code/screenshots
  * Socket.io cho real-time grading
  * MongoDB index tối ưu

### **Test Engine & AI Grader**

* Code Challenge Runner (Node.js sandbox)
* MCQ auto-grade
* AI code review (GPT-4 prompt)
* Grading rubric:

  * Functionality: 50%
  * Code Quality: 20%
  * Efficiency: 20%
  * Best Practices: 10%
* Docker container cho sandbox

### **Deployment**

* Docker + docker-compose:

  * Frontend: 3000
  * Backend: 5000
  * MongoDB + Redis
* Nginx reverse proxy
* CI/CD deploy-ready (Railway/Vercel)

---

## 📂 Project Structure

```
skilltest-platform/
├─ backend/
│  ├─ models/
│  │  ├─ User.js
│  │  ├─ Test.js
│  │  ├─ Submission.js
│  │  └─ Match.js
│  ├─ routes/
│  │  ├─ auth.js
│  │  ├─ tests.js
│  │  ├─ submissions.js
│  │  ├─ matches.js
│  │  └─ profile.js
│  ├─ middleware/
│  │  ├─ auth.js
│  │  └─ rateLimit.js
│  ├─ server.js
│  └─ package.json
├─ frontend/
│  ├─ src/
│  │  ├─ pages/
│  │  ├─ components/
│  │  ├─ store/
│  │  ├─ App.jsx
│  │  └─ main.jsx
│  ├─ tailwind.config.js
│  └─ vite.config.js
├─ docker-compose.yml
├─ Dockerfile
├─ nginx.conf
└─ .env
```

---

## ⚡ Quick Start

### **1. Clone repository**

```bash
git clone https://github.com/<your-username>/skilltest-platform.git
cd skilltest-platform
```

### **2. Backend setup**

```bash
cd backend
npm install
cp .env.example .env   # Điền config MongoDB, JWT, Google OAuth
npm run dev
```

### **3. Frontend setup**

```bash
cd ../frontend
npm install
npm run dev
```

* Truy cập: [http://localhost:3000](http://localhost:3000)

### **4. Docker deployment**

```bash
docker-compose up --build
```

---

## 🧪 Test Sample

* Tạo user student/tester
* Tạo test demo (JS Calculator)
* Submit code → Xem auto grading & AI feedback
* Dashboard hiển thị kết quả realtime

---

## 🤖 AI Code Review

* GPT-4 prompt tự động đánh giá code submission
* Rubric JSON:

```json
{
  "overallScore": 8.5,
  "breakdown": {
    "functionality": 9,
    "structure": 8,
    "errorHandling": 8,
    "performance": 7,
    "bestPractices": 9
  },
  "strengths": ["Modular code", "Good readability"],
  "improvements": ["Optimize loops", "Better error handling"],
  "juniorReady": true
}
```

---

## 📌 Tech Stack

* **Frontend:** React 18, Vite, TailwindCSS, Zustand, React Router, Monaco Editor
* **Backend:** Node.js, Express, MongoDB, Mongoose, Socket.io, JWT
* **DevOps:** Docker, Nginx, Redis, Railway/Vercel
* **AI:** OpenAI GPT-4 grading & code review

---

## 💡 Contribution

1. Fork repository
2. Create branch: `feature/xyz`
3. Commit & push
4. Open Pull Request

---

## 📝 License

MIT License © 2026 Tuan Khang

---


