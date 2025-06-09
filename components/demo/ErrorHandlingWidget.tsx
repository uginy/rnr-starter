import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import React, { useState } from 'react';
import { View } from 'react-native';
import { Alert, AlertDescription } from '~/components/ui/alert';
import { Badge } from '~/components/ui/badge';
import { Button } from '~/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card';
import { Text } from '~/components/ui/text';
import { Check } from '~/lib/icons/Check';
import { Info } from '~/lib/icons/Info';
import { X } from '~/lib/icons/X';
import { useStore } from '~/lib/store';
import { toastService } from '~/lib/toast/toast-service';

// Mock error scenarios
const errorScenarios = {
  network: () => Promise.reject(new Error('Network connection failed')),
  server: () => Promise.reject(new Error('Internal server error (500)')),
  validation: () => Promise.reject(new Error('Validation failed: Invalid data provided')),
  timeout: () =>
    new Promise((_, reject) => setTimeout(() => reject(new Error('Request timeout')), 3000)),
  success: () => Promise.resolve({ data: 'Operation completed successfully', success: true }),
};

type ErrorType = keyof typeof errorScenarios;

export function ErrorHandlingWidget() {
  const queryClient = useQueryClient();
  const { error: globalError, setError } = useStore();
  const [selectedError, setSelectedError] = useState<ErrorType>('network');

  // Query with error boundary
  const {
    data,
    error: queryError,
    isLoading,
    isError,
    refetch,
    failureCount,
    failureReason,
  } = useQuery({
    queryKey: ['errorDemo', selectedError],
    queryFn: () => errorScenarios[selectedError](),
    retry: (failureCount, error) => {
      // Custom retry logic
      if (failureCount < 2) {
        toastService.info(`Retrying... (${failureCount + 1}/3)`);
        return true;
      }
      return false;
    },
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
    enabled: false, // Manual trigger only
  });

  // Mutation with error handling
  const errorMutation = useMutation({
    mutationFn: (errorType: ErrorType) => errorScenarios[errorType](),
    onSuccess: (data) => {
      toastService.success('Operation completed successfully!');
      setError(null);
    },
    onError: (error) => {
      const message = error instanceof Error ? error.message : 'Unknown error occurred';
      toastService.error(`Mutation failed: ${message}`);
      setError(message);
    },
    retry: 1,
  });

  const handleTriggerError = () => {
    refetch();
  };

  const handleMutationError = () => {
    errorMutation.mutate(selectedError);
  };

  const handleClearErrors = () => {
    setError(null);
    queryClient.removeQueries({ queryKey: ['errorDemo'] });
    toastService.success('Errors cleared');
  };

  const handleGlobalError = () => {
    // Simulate global error
    setError('This is a global application error stored in Zustand');
    toastService.error('Global error set');
  };

  const getErrorTypeDescription = (type: ErrorType) => {
    const descriptions = {
      network: 'Simulates network connectivity issues',
      server: 'Simulates internal server errors (5xx)',
      validation: 'Simulates data validation failures',
      timeout: 'Simulates request timeout scenarios',
      success: 'Successful operation for comparison',
    };
    return descriptions[type];
  };

  const renderErrorScenarios = () => (
    <View className="space-y-3">
      <Text className="font-medium text-sm">Select Error Scenario:</Text>
      <View className="flex-row flex-wrap gap-2">
        {Object.keys(errorScenarios).map((type) => (
          <Button
            key={type}
            size="sm"
            variant={selectedError === type ? 'default' : 'outline'}
            onPress={() => setSelectedError(type as ErrorType)}
            disabled={isLoading || errorMutation.isPending}
          >
            <Text className="text-xs capitalize">{type}</Text>
          </Button>
        ))}
      </View>
      <Text className="text-xs text-muted-foreground">
        {getErrorTypeDescription(selectedError)}
      </Text>
    </View>
  );

  const renderErrorInfo = () => {
    if (!isError && !globalError && !errorMutation.error) return null;

    return (
      <View className="space-y-3">
        {queryError && (
          <Alert variant="destructive" icon={X}>
            <AlertDescription>
              <Text className="font-medium">Query Error:</Text>
              <Text className="text-sm mt-1">
                {queryError instanceof Error ? queryError.message : 'Unknown query error'}
              </Text>
              {failureCount > 0 && (
                <Text className="text-xs mt-1 opacity-80">Failed {failureCount} time(s)</Text>
              )}
            </AlertDescription>
          </Alert>
        )}

        {errorMutation.error && (
          <Alert variant="destructive" icon={X}>
            <AlertDescription>
              <Text className="font-medium">Mutation Error:</Text>
              <Text className="text-sm mt-1">
                {errorMutation.error instanceof Error
                  ? errorMutation.error.message
                  : 'Unknown mutation error'}
              </Text>
            </AlertDescription>
          </Alert>
        )}

        {globalError && (
          <Alert variant="destructive" icon={X}>
            <AlertDescription>
              <Text className="font-medium">Global Error:</Text>
              <Text className="text-sm mt-1">{globalError}</Text>
            </AlertDescription>
          </Alert>
        )}
      </View>
    );
  };

  const renderSuccessInfo = () => {
    if (!data || isError) return null;

    return (
      <Alert icon={Check}>
        <AlertDescription>
          <Text className="font-medium text-green-600">Success:</Text>
          <Text className="text-sm mt-1">
            {typeof data === 'object' && data !== null
              ? JSON.stringify(data, null, 2)
              : String(data)}
          </Text>
        </AlertDescription>
      </Alert>
    );
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-lg">Error Handling Demo</CardTitle>
        <Text className="text-sm text-muted-foreground">
          Comprehensive error handling with React Query, global state, and toast notifications
        </Text>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Status indicators */}
        <View className="flex-row flex-wrap items-center gap-2">
          <Badge variant={isLoading ? 'default' : 'outline'}>
            <Text className="text-xs">{isLoading ? 'Loading...' : 'Query Idle'}</Text>
          </Badge>

          <Badge variant={errorMutation.isPending ? 'default' : 'outline'}>
            <Text className="text-xs">
              {errorMutation.isPending ? 'Mutating...' : 'Mutation Idle'}
            </Text>
          </Badge>

          {isError && (
            <Badge variant="destructive">
              <Text className="text-xs">Query Error</Text>
            </Badge>
          )}

          {errorMutation.error && (
            <Badge variant="destructive">
              <Text className="text-xs">Mutation Error</Text>
            </Badge>
          )}

          {globalError && (
            <Badge variant="destructive">
              <Text className="text-xs">Global Error</Text>
            </Badge>
          )}

          {failureCount > 0 && (
            <Badge variant="secondary">
              <Text className="text-xs">Retries: {failureCount}</Text>
            </Badge>
          )}
        </View>

        {/* Error scenario selector */}
        {renderErrorScenarios()}

        {/* Action buttons */}
        <View className="flex-row flex-wrap gap-2">
          <Button
            size="sm"
            onPress={handleTriggerError}
            disabled={isLoading || errorMutation.isPending}
          >
            <Text className="text-xs">Trigger Query</Text>
          </Button>

          <Button
            size="sm"
            variant="outline"
            onPress={handleMutationError}
            disabled={isLoading || errorMutation.isPending}
          >
            <Text className="text-xs">Trigger Mutation</Text>
          </Button>

          <Button
            size="sm"
            variant="outline"
            onPress={handleGlobalError}
            disabled={isLoading || errorMutation.isPending}
          >
            <Text className="text-xs">Set Global Error</Text>
          </Button>

          <Button size="sm" variant="secondary" onPress={handleClearErrors}>
            <Text className="text-xs">Clear All Errors</Text>
          </Button>
        </View>

        {/* Error display */}
        {renderErrorInfo()}

        {/* Success display */}
        {renderSuccessInfo()}

        {/* Error handling features info */}
        <View className="bg-muted/50 p-3 rounded-lg">
          <Text className="font-medium text-sm mb-2">Error Handling Features:</Text>
          <View className="space-y-1">
            <Text className="text-xs">• Automatic retry with exponential backoff</Text>
            <Text className="text-xs">• Toast notifications for user feedback</Text>
            <Text className="text-xs">• Global error state management with Zustand</Text>
            <Text className="text-xs">• Query-specific error boundaries</Text>
            <Text className="text-xs">• Mutation error handling</Text>
            <Text className="text-xs">• Custom retry logic and failure counting</Text>
          </View>
        </View>

        {/* Debug info */}
        {(isError || errorMutation.error || globalError) && (
          <View className="bg-muted/30 p-3 rounded-lg">
            <Text className="font-medium text-xs mb-2">Debug Information:</Text>
            <View className="space-y-1">
              <Text className="text-xs">Query Error: {isError ? 'Yes' : 'No'}</Text>
              <Text className="text-xs">Mutation Error: {errorMutation.error ? 'Yes' : 'No'}</Text>
              <Text className="text-xs">Global Error: {globalError ? 'Yes' : 'No'}</Text>
              <Text className="text-xs">Failure Count: {failureCount}</Text>
              <Text className="text-xs">Selected Scenario: {selectedError}</Text>
            </View>
          </View>
        )}
      </CardContent>
    </Card>
  );
}
