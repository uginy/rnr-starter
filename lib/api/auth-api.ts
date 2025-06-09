import type { ApiResponse, AuthCredentials, AuthResponse, Post, User, UserProfile } from './types';

// Mock delay for realistic API simulation
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// Mock user data
const mockUser: User = {
  id: '1',
  email: 'demo@example.com',
  name: 'Demo User',
  avatar: 'https://via.placeholder.com/150/4f46e5/ffffff?text=DU',
  role: 'user',
  createdAt: '2024-01-01T00:00:00Z',
  lastLoginAt: new Date().toISOString(),
};

// Mock posts data
const mockPosts: Post[] = [
  {
    id: '1',
    title: 'Getting Started with React Query',
    content: 'React Query is a powerful data-fetching library...',
    author: 'John Doe',
    createdAt: '2024-12-01T10:00:00Z',
    likes: 42,
    tags: ['react', 'javascript', 'tutorial'],
  },
  {
    id: '2',
    title: 'Building Mobile Apps with React Native',
    content: 'React Native allows you to build native mobile apps...',
    author: 'Jane Smith',
    createdAt: '2024-12-02T14:30:00Z',
    likes: 28,
    tags: ['react-native', 'mobile', 'development'],
  },
  {
    id: '3',
    title: 'State Management Best Practices',
    content: 'Managing state in modern applications...',
    author: 'Bob Johnson',
    createdAt: '2024-12-03T09:15:00Z',
    likes: 35,
    tags: ['state-management', 'zustand', 'react'],
  },
];

// Mock user profiles
const mockProfiles: UserProfile[] = [
  {
    id: '1',
    name: 'Demo User',
    email: 'demo@example.com',
    bio: 'Full-stack developer passionate about React and React Native',
    avatar: 'https://via.placeholder.com/150/4f46e5/ffffff?text=DU',
    location: 'San Francisco, CA',
    website: 'https://example.com',
    joinedAt: '2024-01-01T00:00:00Z',
  },
  {
    id: '2',
    name: 'John Doe',
    email: 'john@example.com',
    bio: 'React enthusiast and tech blogger',
    avatar: 'https://via.placeholder.com/150/059669/ffffff?text=JD',
    location: 'New York, NY',
    joinedAt: '2024-02-15T00:00:00Z',
  },
];

// Authentication API
export const authApi = {
  // Mock login
  async login(credentials: AuthCredentials): Promise<ApiResponse<AuthResponse>> {
    await delay(1500); // Simulate network delay

    // Simulate login validation
    if (credentials.email === 'error@example.com') {
      throw new Error('Invalid credentials. Please try again.');
    }

    if (credentials.email === 'slow@example.com') {
      await delay(3000); // Extra slow response
    }

    return {
      success: true,
      message: 'Login successful',
      data: {
        user: mockUser,
        token: 'mock-jwt-token',
        refreshToken: 'mock-refresh-token',
        expiresIn: 3600,
      },
    };
  },

  // Mock logout
  async logout(): Promise<ApiResponse<null>> {
    await delay(500);
    return {
      success: true,
      message: 'Logout successful',
      data: null,
    };
  },

  // Mock current user
  async getCurrentUser(): Promise<ApiResponse<User>> {
    await delay(800);
    return {
      success: true,
      message: 'User data retrieved',
      data: mockUser,
    };
  },
};

// Data API for demo widgets
export const dataApi = {
  // Mock posts fetching
  async getPosts(): Promise<ApiResponse<Post[]>> {
    await delay(1200);

    // Simulate occasional errors
    if (Math.random() < 0.1) {
      throw new Error('Failed to fetch posts. Please try again.');
    }

    return {
      success: true,
      message: 'Posts retrieved successfully',
      data: mockPosts,
    };
  },

  // Mock single post
  async getPost(id: string): Promise<ApiResponse<Post>> {
    await delay(800);

    const post = mockPosts.find((p) => p.id === id);
    if (!post) {
      throw new Error(`Post with id ${id} not found`);
    }

    return {
      success: true,
      message: 'Post retrieved successfully',
      data: post,
    };
  },

  // Mock user profiles
  async getUserProfiles(): Promise<ApiResponse<UserProfile[]>> {
    await delay(1000);

    return {
      success: true,
      message: 'User profiles retrieved successfully',
      data: mockProfiles,
    };
  },

  // Mock creating a post
  async createPost(postData: Omit<Post, 'id' | 'createdAt' | 'likes'>): Promise<ApiResponse<Post>> {
    await delay(1500);

    const newPost: Post = {
      ...postData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      likes: 0,
    };

    return {
      success: true,
      message: 'Post created successfully',
      data: newPost,
    };
  },
};
