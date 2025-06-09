import { useQuery, useQueryClient } from '@tanstack/react-query';
import React from 'react';
import { RefreshControl, View } from 'react-native';
import { ScrollView } from 'react-native';
import { Badge } from '~/components/ui/badge';
import { Button } from '~/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card';
import { Skeleton } from '~/components/ui/skeleton';
import { Text } from '~/components/ui/text';
import { dataApi } from '~/lib/api/auth-api';
import type { Post } from '~/lib/api/types';
import { toastService } from '~/lib/toast/toast-service';

export function QueryDemoWidget() {
  const queryClient = useQueryClient();

  // Fetch posts with React Query
  const {
    data: postsResponse,
    isLoading,
    error,
    refetch,
    isFetching,
    isRefetching,
  } = useQuery({
    queryKey: ['posts'],
    queryFn: dataApi.getPosts,
    staleTime: 30 * 1000, // 30 seconds
    gcTime: 5 * 60 * 1000, // 5 minutes
  });

  const posts = postsResponse?.data || [];

  const handleRefresh = () => {
    refetch();
    toastService.info('Refreshing posts...');
  };

  const handleInvalidate = () => {
    queryClient.invalidateQueries({ queryKey: ['posts'] });
    toastService.success('Cache invalidated');
  };

  const handlePrefetch = async () => {
    try {
      await queryClient.prefetchQuery({
        queryKey: ['posts'],
        queryFn: dataApi.getPosts,
        staleTime: 30 * 1000,
      });
      toastService.success('Data prefetched');
    } catch (error) {
      toastService.error('Prefetch failed');
    }
  };

  const renderPost = (post: Post) => (
    <Card key={post.id} className="mb-3">
      <CardHeader className="pb-2">
        <CardTitle className="text-base">{post.title}</CardTitle>
        <Text className="text-xs text-muted-foreground">
          by {post.author} • {new Date(post.createdAt).toLocaleDateString()}
        </Text>
      </CardHeader>
      <CardContent className="pt-0">
        <Text className="text-sm mb-3" numberOfLines={2}>
          {post.content}
        </Text>
        <View className="flex-row items-center justify-between">
          <View className="flex-row flex-wrap gap-1">
            {post.tags.slice(0, 2).map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
            {post.tags.length > 2 && (
              <Badge variant="outline" className="text-xs">
                +{post.tags.length - 2}
              </Badge>
            )}
          </View>
          <Text className="text-xs text-muted-foreground">❤️ {post.likes}</Text>
        </View>
      </CardContent>
    </Card>
  );

  const renderLoadingSkeleton = () => (
    <View className="space-y-3">
      {[1, 2, 3].map((i) => (
        <Card key={i} className="mb-3">
          <CardHeader className="pb-2">
            <Skeleton className="h-4 w-3/4 mb-2" />
            <Skeleton className="h-3 w-1/2" />
          </CardHeader>
          <CardContent className="pt-0">
            <Skeleton className="h-3 w-full mb-1" />
            <Skeleton className="h-3 w-4/5 mb-3" />
            <View className="flex-row justify-between">
              <View className="flex-row gap-1">
                <Skeleton className="h-5 w-12" />
                <Skeleton className="h-5 w-16" />
              </View>
              <Skeleton className="h-3 w-8" />
            </View>
          </CardContent>
        </Card>
      ))}
    </View>
  );

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-lg">React Query Demo</CardTitle>
        <Text className="text-sm text-muted-foreground">
          Demonstrating data fetching, caching, and state management
        </Text>
      </CardHeader>

      <CardContent>
        {/* Control buttons */}
        <View className="flex-row flex-wrap gap-2 mb-4">
          <Button size="sm" variant="outline" onPress={handleRefresh} disabled={isFetching}>
            <Text className="text-xs">{isFetching ? 'Refreshing...' : 'Refresh'}</Text>
          </Button>

          <Button size="sm" variant="outline" onPress={handleInvalidate} disabled={isFetching}>
            <Text className="text-xs">Invalidate Cache</Text>
          </Button>

          <Button size="sm" variant="outline" onPress={handlePrefetch} disabled={isFetching}>
            <Text className="text-xs">Prefetch</Text>
          </Button>
        </View>

        {/* Status indicator */}
        <View className="flex-row items-center gap-2 mb-4">
          <Badge variant={isLoading ? 'default' : isFetching ? 'secondary' : 'outline'}>
            <Text className="text-xs">
              {isLoading ? 'Loading' : isFetching ? 'Fetching' : 'Cached'}
            </Text>
          </Badge>

          {error && (
            <Badge variant="destructive">
              <Text className="text-xs">Error</Text>
            </Badge>
          )}
        </View>

        {/* Content */}
        <ScrollView
          className="max-h-96"
          refreshControl={<RefreshControl refreshing={isRefetching} onRefresh={handleRefresh} />}
        >
          {error ? (
            <Card className="border-destructive">
              <CardContent className="p-4">
                <Text className="text-destructive text-sm text-center">
                  {error instanceof Error ? error.message : 'Something went wrong'}
                </Text>
                <Button
                  size="sm"
                  variant="outline"
                  onPress={() => refetch()}
                  className="mt-2 mx-auto"
                >
                  <Text className="text-xs">Try Again</Text>
                </Button>
              </CardContent>
            </Card>
          ) : isLoading ? (
            renderLoadingSkeleton()
          ) : (
            <View>
              {posts.map(renderPost)}
              {posts.length === 0 && (
                <Text className="text-center text-muted-foreground">No posts available</Text>
              )}
            </View>
          )}
        </ScrollView>
      </CardContent>
    </Card>
  );
}
