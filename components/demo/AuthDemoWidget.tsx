import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import React, { useState } from 'react';
import { View } from 'react-native';
import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/avatar';
import { Badge } from '~/components/ui/badge';
import { Button } from '~/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card';
import { Input } from '~/components/ui/input';
import { Label } from '~/components/ui/label';
import { Text } from '~/components/ui/text';
import { authApi } from '~/lib/api/auth-api';
import type { AuthCredentials, User } from '~/lib/api/types';
import { toastService } from '~/lib/toast/toast-service';

export function AuthDemoWidget() {
  const queryClient = useQueryClient();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [credentials, setCredentials] = useState<AuthCredentials>({
    email: '',
    password: '',
  });

  // Query for current user (only when logged in)
  const { data: userResponse, isLoading: isLoadingUser } = useQuery({
    queryKey: ['currentUser'],
    queryFn: authApi.getCurrentUser,
    enabled: isLoggedIn,
    staleTime: 5 * 60 * 1000,
  });

  const user = userResponse?.data;

  // Login mutation
  const loginMutation = useMutation({
    mutationFn: authApi.login,
    onSuccess: (response) => {
      setIsLoggedIn(true);
      queryClient.setQueryData(['currentUser'], response);
      toastService.success(`Welcome back, ${response.data.user.name}!`);
      // Clear form
      setCredentials({ email: '', password: '' });
    },
    onError: (error) => {
      toastService.error(error instanceof Error ? error.message : 'Login failed');
    },
  });

  // Logout mutation
  const logoutMutation = useMutation({
    mutationFn: authApi.logout,
    onSuccess: () => {
      setIsLoggedIn(false);
      queryClient.removeQueries({ queryKey: ['currentUser'] });
      queryClient.invalidateQueries(); // Clear all cache
      toastService.info('Logged out successfully');
    },
    onError: (error) => {
      toastService.error(error instanceof Error ? error.message : 'Logout failed');
    },
  });

  const handleLogin = () => {
    if (!credentials.email || !credentials.password) {
      toastService.warning('Please fill in all fields');
      return;
    }
    loginMutation.mutate(credentials);
  };

  const handleLogout = () => {
    logoutMutation.mutate();
  };

  const handleDemoLogin = (type: 'normal' | 'error' | 'slow') => {
    const demoCredentials = {
      normal: { email: 'demo@example.com', password: 'demo123' },
      error: { email: 'error@example.com', password: 'demo123' },
      slow: { email: 'slow@example.com', password: 'demo123' },
    };

    setCredentials(demoCredentials[type]);
    loginMutation.mutate(demoCredentials[type]);
  };

  const renderLoginForm = () => (
    <View className="space-y-4">
      <View>
        <Label nativeID="email">Email</Label>
        <Input
          placeholder="Enter your email"
          value={credentials.email}
          onChangeText={(email) => setCredentials((prev) => ({ ...prev, email }))}
          keyboardType="email-address"
          autoCapitalize="none"
          editable={!loginMutation.isPending}
        />
      </View>

      <View>
        <Label nativeID="password">Password</Label>
        <Input
          placeholder="Enter your password"
          value={credentials.password}
          onChangeText={(password) => setCredentials((prev) => ({ ...prev, password }))}
          secureTextEntry
          editable={!loginMutation.isPending}
        />
      </View>

      <Button onPress={handleLogin} disabled={loginMutation.isPending} className="w-full">
        <Text>{loginMutation.isPending ? 'Signing in...' : 'Sign In'}</Text>
      </Button>

      <View className="border-t pt-4">
        <Text className="text-xs text-muted-foreground text-center mb-3">Quick Demo Options:</Text>
        <View className="flex-row gap-2 justify-center flex-wrap">
          <Button
            size="sm"
            variant="outline"
            onPress={() => handleDemoLogin('normal')}
            disabled={loginMutation.isPending}
          >
            <Text className="text-xs">Normal Login</Text>
          </Button>
          <Button
            size="sm"
            variant="outline"
            onPress={() => handleDemoLogin('error')}
            disabled={loginMutation.isPending}
          >
            <Text className="text-xs">Error Demo</Text>
          </Button>
          <Button
            size="sm"
            variant="outline"
            onPress={() => handleDemoLogin('slow')}
            disabled={loginMutation.isPending}
          >
            <Text className="text-xs">Slow Demo</Text>
          </Button>
        </View>
      </View>
    </View>
  );

  const renderUserProfile = (user: User) => {
    // Generate user initials safely
    const getUserInitials = (name: string | undefined) => {
      if (!name?.trim()) return 'DU'; // Default User
      return name
        .split(' ')
        .filter((n) => n.length > 0)
        .slice(0, 2) // Take first 2 words only
        .map((n) => n[0].toUpperCase())
        .join('');
    };

    // Format date safely
    const formatDate = (dateString: string | undefined) => {
      if (!dateString) return 'N/A';
      try {
        return new Date(dateString).toLocaleDateString();
      } catch {
        return 'N/A';
      }
    };

    const formatDateTime = (dateString: string | undefined) => {
      if (!dateString) return null;
      try {
        return new Date(dateString).toLocaleString();
      } catch {
        return null;
      }
    };

    return (
      <View className="space-y-4">
        <View className="flex-row items-center gap-3">
          <Avatar alt={user.name || 'Demo User'} className="w-16 h-16">
            <AvatarImage source={{ uri: user.avatar }} />
            <AvatarFallback>
              <Text className="text-lg font-semibold">{getUserInitials(user.name)}</Text>
            </AvatarFallback>
          </Avatar>

          <View className="flex-1">
            <Text className="font-semibold text-lg">{user.name || 'Demo User'}</Text>
            <Text className="text-sm text-muted-foreground">
              {user.email || 'demo@example.com'}
            </Text>
            <Badge variant="outline" className="mt-1 self-start">
              <Text className="text-xs capitalize">{user.role || 'user'}</Text>
            </Badge>
          </View>
        </View>

        <View className="bg-muted/50 p-3 rounded-lg">
          <Text className="text-xs text-muted-foreground">Account Info:</Text>
          <Text className="text-xs mt-1">Joined: {formatDate(user.createdAt)}</Text>
          {user.lastLoginAt && formatDateTime(user.lastLoginAt) && (
            <Text className="text-xs">Last login: {formatDateTime(user.lastLoginAt)}</Text>
          )}
        </View>

        <Button
          variant="outline"
          onPress={handleLogout}
          disabled={logoutMutation.isPending}
          className="w-full"
        >
          <Text>{logoutMutation.isPending ? 'Signing out...' : 'Sign Out'}</Text>
        </Button>
      </View>
    );
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-lg">Authentication Demo</CardTitle>
        <Text className="text-sm text-muted-foreground">
          Mock login/logout with React Query state management
        </Text>
      </CardHeader>

      <CardContent>
        {/* Status indicator */}
        <View className="flex-row items-center gap-2 mb-4">
          <Badge variant={isLoggedIn ? 'default' : 'secondary'}>
            <Text className="text-xs">{isLoggedIn ? 'Authenticated' : 'Not Authenticated'}</Text>
          </Badge>

          {loginMutation.isPending && (
            <Badge variant="outline">
              <Text className="text-xs">Logging in...</Text>
            </Badge>
          )}

          {logoutMutation.isPending && (
            <Badge variant="outline">
              <Text className="text-xs">Logging out...</Text>
            </Badge>
          )}

          {isLoadingUser && (
            <Badge variant="outline">
              <Text className="text-xs">Loading user...</Text>
            </Badge>
          )}
        </View>

        {/* Main content */}
        {!isLoggedIn ? (
          renderLoginForm()
        ) : isLoadingUser ? (
          <View className="py-8">
            <Text className="text-center text-muted-foreground">Loading user data...</Text>
          </View>
        ) : user ? (
          renderUserProfile(user)
        ) : (
          <View className="py-4">
            <Text className="text-center text-muted-foreground">Failed to load user data</Text>
            <Button
              size="sm"
              variant="outline"
              onPress={() => queryClient.invalidateQueries({ queryKey: ['currentUser'] })}
              className="mt-2 mx-auto"
            >
              <Text className="text-xs">Retry</Text>
            </Button>
          </View>
        )}
      </CardContent>
    </Card>
  );
}
