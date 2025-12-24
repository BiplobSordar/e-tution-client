<div style="font-family: Arial, sans-serif; line-height: 1.6; max-width: 1100px; margin: auto;">

<h1 style="text-align:center; color:#2563eb;">🎓 eTuitionBd – Tuition Management System (Client)</h1>

<p style="text-align:center; font-size:16px; color:#374151;">
A modern, full-featured tuition management platform that connects <b>Students</b>, <b>Tutors</b>, and <b>Admins</b> with transparent workflows, secure payments, and role-based dashboards.
</p>

<hr/>

<h2 style="color:#1f2937;"> Project Purpose</h2>
<ul>
  <li>Solve real-world problems of finding verified tutors and authentic tuition posts</li>
  <li>Reduce friction between students and tutors using automated workflows</li>
  <li>Enable structured communication, digital tuition tracking, and payments</li>
  <li>Provide admins full control over users, tuitions, and financial monitoring</li>
</ul>

<hr/>

<h2 style="color:#1f2937;">Live Website</h2>
<p>
🔗 <b>Client Live URL:</b> <span style="color:#6b7280;"><a href='https://e-tution-client.vercel.app/'>E-Tution<a/></span>
</p>

<hr/>

<h2 style="color:#1f2937;"> Technology Stack (Client)</h2>

<table style="width:100%; border-collapse: collapse;">
  <tr style="background:#f3f4f6;">
    <th style="padding:10px; border:1px solid #e5e7eb;">Category</th>
    <th style="padding:10px; border:1px solid #e5e7eb;">Technologies</th>
  </tr>
  <tr>
    <td style="padding:10px; border:1px solid #e5e7eb;">Framework</td>
    <td style="padding:10px; border:1px solid #e5e7eb;">React 19, Vite</td>
  </tr>
  <tr>
    <td style="padding:10px; border:1px solid #e5e7eb;">State Management</td>
    <td style="padding:10px; border:1px solid #e5e7eb;">Redux Toolkit, React Query</td>
  </tr>
  <tr>
    <td style="padding:10px; border:1px solid #e5e7eb;">Styling</td>
    <td style="padding:10px; border:1px solid #e5e7eb;">Tailwind CSS v4, DaisyUI</td>
  </tr>
  <tr>
    <td style="padding:10px; border:1px solid #e5e7eb;">Auth</td>
    <td style="padding:10px; border:1px solid #e5e7eb;">Firebase Authentication, JWT</td>
  </tr>
  <tr>
    <td style="padding:10px; border:1px solid #e5e7eb;">UI & Animation</td>
    <td style="padding:10px; border:1px solid #e5e7eb;">Framer Motion, Swiper</td>
  </tr>
  <tr>
    <td style="padding:10px; border:1px solid #e5e7eb;">Charts</td>
    <td style="padding:10px; border:1px solid #e5e7eb;">Recharts</td>
  </tr>
</table>

<hr/>

<h2 style="color:#1f2937;"> Core Features</h2>

<h3> Authentication & Authorization</h3>
<ul>
  <li>Email & Password login</li>
  <li>Google Social Login (default role: Student)</li>
  <li>Firebase Authentication</li>
  <li>JWT token with role & expiration verification</li>
  <li>Role-based protected routes</li>
</ul>

<h3> Public Pages</h3>
<ul>
  <li>Home (Hero, Latest Tuitions, Latest Tutors, Animations)</li>
  <li>Tuition Listing (Search, Filter, Sort, Pagination)</li>
  <li>Tuition Details</li>
  <li>Tutor Listing & Profile</li>
  <li>About, Contact</li>
  <li>404 Error Page</li>
</ul>

<h3> Student Dashboard</h3>
<ul>
  <li>Create, Update, Delete tuition posts</li>
  <li>View applied tutors</li>
  <li>Approve / Reject tutor applications</li>
  <li>Stripe payment required to approve tutor</li>
  <li>Payment history</li>
  <li>Profile update</li>
</ul>

<h3> Tutor Dashboard</h3>
<ul>
  <li>Apply to tuition posts</li>
  <li>Track application status</li>
  <li>View approved ongoing tuitions</li>
  <li>Revenue & earnings history</li>
</ul>

<h3> Admin Dashboard</h3>
<ul>
  <li>User management (CRUD, role change)</li>
  <li>Tuition approval / rejection</li>
  <li>Platform earnings & transaction analytics</li>
  <li>Charts & financial reports</li>
</ul>

<hr/>

<h2 style="color:#1f2937;"> Advanced Features (Challenge)</h2>
<ul>
  <li>Search tuitions by subject & location</li>
  <li>Advanced filtering (class, subject, location)</li>
  <li>Sorting by budget & date</li>
  <li>Pagination on tuition listing</li>
  <li>JWT role & token expiration verification</li>
</ul>

<hr/>

<h2 style="color:#1f2937;"> NPM Packages Used</h2>

<pre style="background:#0f172a; color:#e5e7eb; padding:15px; border-radius:8px;">
@reduxjs/toolkit
@tanstack/react-query
axios
firebase
react-router-dom
react-hook-form
@hookform/resolvers
zod
tailwindcss
framer-motion
recharts
swiper
react-hot-toast
react-icons
lucide-react
date-fns
cloudinary
</pre>

<hr/>

<h2 style="color:#1f2937;">⚙️ Environment Variables</h2>

<p>Create a <code>.env</code> file in the root of the client project:</p>

```env
VITE_FIREBASE_API_KEY=your_api_key_here
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain_here
VITE_FIREBASE_PROJECT_ID=your_project_id_here
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket_here
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id_here
VITE_FIREBASE_APP_ID=your_app_id_here
VITE_API_BASE_URL=your_backend_url
 

```

```
# Clone the repository
git clone https://github.com/BiplobSordar/e-tution-client.git
```
```

# Navigate to project directory
cd e-tution-client
```
```

# Install dependencies
npm install
```

```
# Run development server
npm run dev
```

