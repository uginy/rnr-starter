import * as ImagePicker from 'expo-image-picker';
import React, { useState } from 'react';
import { ActivityIndicator, Alert, Platform, Pressable, View } from 'react-native';
import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/avatar';
import { Button } from '~/components/ui/button';
import { Text } from '~/components/ui/text';
import { cn } from '~/lib/utils';

interface AvatarUploaderProps {
  value?: string | null;
  onChange?: (uri: string | null) => void;
  placeholder?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  disabled?: boolean;
}

const sizeClasses = {
  sm: 'h-12 w-12',
  md: 'h-16 w-16',
  lg: 'h-24 w-24',
};

export function AvatarUploader({
  value,
  onChange,
  placeholder = 'Upload image',
  size = 'md',
  className,
  disabled = false,
}: AvatarUploaderProps) {
  const [isLoading, setIsLoading] = useState(false);

  const requestPermissions = async () => {
    if (Platform.OS !== 'web') {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert(
          'Permission required',
          'Please grant camera roll permissions to upload images.'
        );
        return false;
      }
    }
    return true;
  };

  const pickImage = async () => {
    if (disabled || isLoading) return;

    const hasPermission = await requestPermissions();
    if (!hasPermission) return;

    setIsLoading(true);

    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });

      if (!result.canceled && result.assets[0]) {
        onChange?.(result.assets[0].uri);
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to pick image');
    } finally {
      setIsLoading(false);
    }
  };

  const takePhoto = async () => {
    if (disabled || isLoading) return;

    const hasPermission = await requestPermissions();
    if (!hasPermission) return;

    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission required', 'Please grant camera permissions to take photos.');
      return;
    }

    setIsLoading(true);

    try {
      const result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });

      if (!result.canceled && result.assets[0]) {
        onChange?.(result.assets[0].uri);
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to take photo');
    } finally {
      setIsLoading(false);
    }
  };

  const showOptions = () => {
    if (Platform.OS === 'web') {
      pickImage();
      return;
    }

    Alert.alert('Select Image', 'Choose how you want to select an image', [
      { text: 'Camera', onPress: takePhoto },
      { text: 'Gallery', onPress: pickImage },
      { text: 'Cancel', style: 'cancel' },
    ]);
  };

  const removeImage = () => {
    onChange?.(null);
  };

  return (
    <View className={cn('items-center space-y-4', className)}>
      <Pressable onPress={showOptions} disabled={disabled || isLoading}>
        <Avatar
          alt="Avatar uploader"
          className={cn(sizeClasses[size], 'border-2 border-dashed border-muted-foreground')}
        >
          {value ? (
            <AvatarImage source={{ uri: value }} />
          ) : (
            <AvatarFallback>
              {isLoading ? (
                <ActivityIndicator size="small" />
              ) : (
                <Text className="text-xs text-muted-foreground">+</Text>
              )}
            </AvatarFallback>
          )}
        </Avatar>
      </Pressable>

      <View className="flex-row space-x-2">
        <Button variant="outline" size="sm" onPress={showOptions} disabled={disabled || isLoading}>
          <Text>{value ? 'Change' : placeholder}</Text>
        </Button>

        {value && (
          <Button variant="ghost" size="sm" onPress={removeImage} disabled={disabled || isLoading}>
            <Text>Remove</Text>
          </Button>
        )}
      </View>
    </View>
  );
}
