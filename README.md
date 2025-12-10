# Tuition Management System - Client

<h2>Project Description</h2>
<p>
This is the client-side application of the Tuition Management System. It provides
a responsive interface for Students, Teachers, and Admins to manage courses,
batches, attendance, and payments.
</p>

<h2>Technology Stack</h2>
<ul>
  <li>Frontend: React.js</li>
  <li>Styling: Tailwind CSS</li>
  <li>Routing: React Router</li>
  <li>State Management: React Query / Context API</li>
  <li>Authentication: Firebase Google login + Backend JWT verification</li>
</ul>

<h2>Authentication</h2>
<ul>
  <li>Users can log in/register using Google Firebase.</li>
  <li>Firebase returns an <strong>idToken</strong>.</li>
  <li>The frontend sends idToken to backend for verification.</li>
  <li>Backend validates the token using Firebase Admin SDK.</li>
  <li>After verification, backend issues <strong>Access Token</strong> and <strong>Refresh Token</strong>.</li>
</ul>

<h2>Features</h2>
<ul>
  <li>Responsive dashboards for Admin, Teacher, and Student</li>
  <li>Course and batch management</li>
  <li>Student registration and profile management</li>
  <li>Online fee payment</li>
  <li>Notifications and alerts</li>
</ul>



<h2>Profile Page Inplementation done </h2>
<ul>
  <li> Admin, Teacher, and Student all user seee their own profile</li>
  <li>upldate profile</li>
  <li>Upload Avatar image to cloudanary</li>
</ul>
