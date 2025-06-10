import { QueryClientProvider } from '@tanstack/react-query';
import { AlertTriangle, Database, FileText, Shield } from 'lucide-react-native';
import * as React from 'react';
import { Trans } from 'react-i18next';
import { ScrollView, View } from 'react-native';
import { AuthDemoWidget } from '~/components/demo/AuthDemoWidget';
import { ErrorHandlingWidget } from '~/components/demo/ErrorHandlingWidget';
import { FormDemoWidget } from '~/components/demo/FormDemoWidget';
import { QueryDemoWidget } from '~/components/demo/QueryDemoWidget';
import { Badge } from '~/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '~/components/ui/tabs';
import { Text } from '~/components/ui/text';
import { queryClient } from '~/lib/api/query-client';
import { iconWithClassName } from '~/lib/icons/iconWithClassName';

// Apply NativeWind styling to lucide icons
iconWithClassName(Database);
iconWithClassName(Shield);
iconWithClassName(FileText);
iconWithClassName(AlertTriangle);

export default function Screen() {
  const [activeTab, setActiveTab] = React.useState('query');

  return (
    <QueryClientProvider client={queryClient}>
      <ScrollView className="flex-1 bg-secondary/30">
        <View className="flex-1 p-4 gap-6">
          {/* Header */}
          <Card className="w-full">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-bold text-center">React Native Starter</CardTitle>
              <Text className="text-center text-muted-foreground">
                <Trans>navigation.title</Trans>
              </Text>
            </CardHeader>
            <CardContent>
              <View className="flex-row flex-wrap gap-2 justify-center">
                <Badge variant="secondary">
                  <Text className="text-xs">React Query</Text>
                </Badge>
                <Badge variant="secondary">
                  <Text className="text-xs">Zod Validation</Text>
                </Badge>
                <Badge variant="secondary">
                  <Text className="text-xs">Zustand</Text>
                </Badge>
                <Badge variant="secondary">
                  <Text className="text-xs">TypeScript</Text>
                </Badge>
                <Badge variant="secondary">
                  <Text className="text-xs">NativeWind</Text>
                </Badge>
                <Badge variant="secondary">
                  <Text className="text-xs">Expo Router</Text>
                </Badge>
              </View>

              <View className="mt-4 p-3 bg-muted/50 rounded-lg">
                <Text className="text-sm text-center text-muted-foreground">
                  Comprehensive demo showcasing key functionality and best practices
                </Text>
              </View>
            </CardContent>
          </Card>

          {/* Demo Widgets in Tabs */}
          <Card className="w-full">
            <CardContent className="p-0">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <View className="p-4 pb-0">
                  <TabsList className="w-full">
                    <TabsTrigger value="query" className="flex-1 flex-row gap-2">
                      <Database size={16} />
                      <Text>Query</Text>
                    </TabsTrigger>
                    <TabsTrigger value="auth" className="flex-1 flex-row gap-2">
                      <Shield size={16} />
                      <Text>Auth</Text>
                    </TabsTrigger>
                    <TabsTrigger value="forms" className="flex-1 flex-row gap-2">
                      <FileText size={16} />
                      <Text>Forms</Text>
                    </TabsTrigger>
                    <TabsTrigger value="errors" className="flex-1 flex-row gap-2">
                      <AlertTriangle size={16} />
                      <Text>Errors</Text>
                    </TabsTrigger>
                  </TabsList>
                </View>

                <TabsContent value="query" className="p-4">
                  <QueryDemoWidget />
                </TabsContent>

                <TabsContent value="auth" className="p-4">
                  <AuthDemoWidget />
                </TabsContent>

                <TabsContent value="forms" className="p-4">
                  <FormDemoWidget />
                </TabsContent>

                <TabsContent value="errors" className="p-4">
                  <ErrorHandlingWidget />
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          {/* Footer */}
          <Card className="w-full mt-4">
            <CardContent className="p-4">
              <View className="space-y-3">
                <Text className="font-medium text-center">Architecture Highlights</Text>

                <View className="grid grid-cols-2 gap-3">
                  <View className="bg-muted/30 p-3 rounded-lg">
                    <Text className="font-medium text-sm mb-1">🔄 State Management</Text>
                    <Text className="text-xs text-muted-foreground">
                      Zustand for global state, React Query for server state
                    </Text>
                  </View>

                  <View className="bg-muted/30 p-3 rounded-lg">
                    <Text className="font-medium text-sm mb-1">✅ Type Safety</Text>
                    <Text className="text-xs text-muted-foreground">
                      Full TypeScript coverage with strict validation
                    </Text>
                  </View>

                  <View className="bg-muted/30 p-3 rounded-lg">
                    <Text className="font-medium text-sm mb-1">🎨 UI Components</Text>
                    <Text className="text-xs text-muted-foreground">
                      50+ production-ready components with Tailwind CSS
                    </Text>
                  </View>

                  <View className="bg-muted/30 p-3 rounded-lg">
                    <Text className="font-medium text-sm mb-1">🌍 Internationalization</Text>
                    <Text className="text-xs text-muted-foreground">
                      Multi-language support with react-i18next
                    </Text>
                  </View>
                </View>

                <View className="border-t pt-3">
                  <Text className="text-xs text-center text-muted-foreground">
                    Production-ready boilerplate with modern React Native architecture
                  </Text>
                </View>
              </View>
            </CardContent>
          </Card>
        </View>
      </ScrollView>
    </QueryClientProvider>
  );
}
