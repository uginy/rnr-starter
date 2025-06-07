import * as React from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { ScrollView, View } from 'react-native';
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card';
import { Text } from '~/components/ui/text';

export default function Screen() {
  const { t } = useTranslation();

  return (
    <ScrollView className="flex-1 bg-secondary/30">
      <View className="flex-1 justify-center items-center gap-5 p-6">
        <Card className="w-full max-w-sm p-6 rounded-2xl">
          <CardHeader>
            <CardTitle className="text-center">React Native Starter</CardTitle>
          </CardHeader>
          <CardContent>
            {/* Welcome Section */}
            <View className="mb-4 p-3 bg-muted/50 rounded-lg">
              <Text className="text-sm text-center text-muted-foreground">
                <Trans>navigation.title</Trans>
              </Text>
            </View>
          </CardContent>
        </Card>
      </View>
    </ScrollView>
  );
}
