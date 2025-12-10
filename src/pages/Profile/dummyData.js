export  const dummyUsers = {
    student: {
      _id: 'student123',
      uid: 'STU2024001',
      name: 'Rohan Sharma',
      email: 'rohan.sharma@student.com',
      phone: '+919876543210',
      avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Rohan',
      role: 'student',
      studentProfile: {
        grade: '12th Grade',
        school: 'Delhi Public School',
        subjectsInterested: ['Mathematics', 'Physics', 'Chemistry', 'Computer Science'],
        learningGoals: [
          'Score 95% in board exams',
          'Clear IIT JEE entrance',
          'Improve problem-solving skills',
          'Master calculus concepts'
        ],
        guardianContact: 'parents@email.com'
      },
      guardians: [
        {
          guardianId: 'guardian1',
          relation: 'Father',
          canViewProgress: true,
          addedAt: '2024-01-15T10:30:00Z'
        },
        {
          guardianId: 'guardian2',
          relation: 'Mother',
          canViewProgress: true,
          addedAt: '2024-01-15T10:30:00Z'
        }
      ],
      status: 'active',
      statusHistory: [
        { status: 'pending', reason: 'New registration', changedAt: '2024-01-10T09:15:30Z' },
        { status: 'active', reason: 'Profile completed', changedAt: '2024-01-11T14:20:45Z' }
      ],
      dateOfBirth: '2006-05-15T00:00:00Z',
      address: {
        street: '45, Sector 14',
        city: 'Noida',
        state: 'Uttar Pradesh',
        country: 'India',
        zipCode: '201301'
      },
      createdAt: '2024-01-10T09:15:30Z',
      updatedAt: '2024-01-20T16:45:22Z'
    },
    tutor: {
      _id: 'tutor456',
      uid: 'TUT2024001',
      name: 'Dr. Priya Patel',
      email: 'priya.patel@tutor.com',
      phone: '+919012345678',
      avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Priya',
      role: 'tutor',
      tutorProfile: {
        subjects: ['Mathematics', 'Physics', 'Advanced Calculus'],
        hourlyRate: 1200,
        experienceYears: 8,
        bio: 'PhD in Mathematics with 8 years of teaching experience. Specialized in JEE and NEET preparation.',
        qualifications: ['PhD Mathematics', 'M.Sc Physics', 'B.Ed'],
        rating: 4.8,
        totalReviews: 156,
        availability: [
          { day: 1, from: '09:00', to: '17:00' }, // Monday
          { day: 2, from: '09:00', to: '17:00' }, // Tuesday
          { day: 3, from: '14:00', to: '20:00' }, // Wednesday
          { day: 5, from: '10:00', to: '18:00' }, // Friday
          { day: 6, from: '09:00', to: '15:00' }  // Saturday
        ]
      },
      status: 'active',
      statusHistory: [
        { status: 'pending', reason: 'Application submitted', changedAt: '2023-12-01T10:00:00Z' },
        { status: 'active', reason: 'Verified and approved', changedAt: '2023-12-05T14:30:00Z' }
      ],
      dateOfBirth: '1988-08-20T00:00:00Z',
      address: {
        street: 'B-12, South Extension',
        city: 'New Delhi',
        state: 'Delhi',
        country: 'India',
        zipCode: '110049'
      },
      createdAt: '2023-12-01T10:00:00Z',
      updatedAt: '2024-01-20T14:30:00Z'
    },
    guardian: {
      _id: 'guardian789',
      uid: 'GUA2024001',
      name: 'Mr. Amit Verma',
      email: 'amit.verma@email.com',
      phone: '+919988776655',
      avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Amit',
      role: 'guardian',
      guardianProfile: {
        occupation: 'Software Engineer',
        emergencyContact: '+919900112233',
        studentsUnderCare: ['student123', 'student456']
      },
      guardianOf: ['student123'],
      status: 'active',
      statusHistory: [
        { status: 'pending', reason: 'Registration', changedAt: '2024-01-05T11:20:00Z' },
        { status: 'active', reason: 'Email verified', changedAt: '2024-01-05T12:00:00Z' }
      ],
      dateOfBirth: '1980-03-10T00:00:00Z',
      address: {
        street: 'H-45, GK Enclave',
        city: 'New Delhi',
        state: 'Delhi',
        country: 'India',
        zipCode: '110048'
      },
      createdAt: '2024-01-05T11:20:00Z',
      updatedAt: '2024-01-20T10:15:00Z'
    },
    admin: {
      _id: 'admin101',
      uid: 'ADM2024001',
      name: 'Mrs. Anjali Kapoor',
      email: 'admin@etution.com',
      phone: '+919001122334',
      avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Anjali',
      role: 'admin',
      adminProfile: {
        department: 'Administration',
        lastLogin: '2024-01-20T09:30:00Z'
      },
      status: 'active',
      statusHistory: [
        { status: 'active', reason: 'System admin', changedAt: '2023-11-01T09:00:00Z' }
      ],
      dateOfBirth: '1985-12-25T00:00:00Z',
      address: {
        street: 'Corporate Office, Sector 62',
        city: 'Noida',
        state: 'Uttar Pradesh',
        country: 'India',
        zipCode: '201309'
      },
      createdAt: '2023-11-01T09:00:00Z',
      updatedAt: '2024-01-20T09:30:00Z'
    }
  };
