import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { View } from 'react-native';
import { Badge } from '~/components/ui/badge';
import { Button } from '~/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card';
import { Input } from '~/components/ui/input';
import { Label } from '~/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '~/components/ui/select';
import { Switch } from '~/components/ui/switch';
import { Text } from '~/components/ui/text';
import { Textarea } from '~/components/ui/textarea';
import { dataApi } from '~/lib/api/auth-api';
import { toastService } from '~/lib/toast/toast-service';
import {
  type ContactFormData,
  type PostFormData,
  contactSchema,
  postSchema,
} from '~/lib/validation/demo-schemas';

type FormType = 'contact' | 'post';

export function FormDemoWidget() {
  const [activeForm, setActiveForm] = useState<FormType>('contact');

  // Contact form
  const contactForm = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: '',
      email: '',
      subject: '',
      message: '',
      priority: 'medium',
      newsletter: false,
    },
    mode: 'onChange',
  });

  // Post form
  const postForm = useForm<PostFormData>({
    resolver: zodResolver(postSchema),
    defaultValues: {
      title: '',
      content: '',
      author: '',
      tags: [''],
    },
    mode: 'onChange',
  });

  // Submit mutations
  const contactMutation = useMutation({
    mutationFn: async (data: ContactFormData) => {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      return { success: true, message: 'Contact form submitted successfully' };
    },
    onSuccess: () => {
      toastService.success('Contact form submitted successfully!');
      contactForm.reset();
    },
    onError: (error) => {
      toastService.error(error instanceof Error ? error.message : 'Submission failed');
    },
  });

  const postMutation = useMutation({
    mutationFn: (data: PostFormData) => dataApi.createPost(data),
    onSuccess: () => {
      toastService.success('Post created successfully!');
      postForm.reset();
    },
    onError: (error) => {
      toastService.error(error instanceof Error ? error.message : 'Failed to create post');
    },
  });

  const onContactSubmit = (data: ContactFormData) => {
    contactMutation.mutate(data);
  };

  const onPostSubmit = (data: PostFormData) => {
    // Filter out empty tags
    const filteredData = {
      ...data,
      tags: data.tags.filter((tag) => tag.trim() !== ''),
    };
    postMutation.mutate(filteredData);
  };

  const addTag = () => {
    const currentTags = postForm.getValues('tags');
    if (currentTags.length < 5) {
      postForm.setValue('tags', [...currentTags, '']);
    }
  };

  const removeTag = (index: number) => {
    const currentTags = postForm.getValues('tags');
    const newTags = currentTags.filter((_, i) => i !== index);
    postForm.setValue('tags', newTags.length > 0 ? newTags : ['']);
  };

  const renderContactForm = () => {
    const {
      control,
      handleSubmit,
      formState: { errors, isValid, isDirty },
    } = contactForm;

    return (
      <View className="space-y-4">
        <View className="grid grid-cols-2 gap-4">
          <View>
            <Label>Name *</Label>
            <Controller
              control={control}
              name="name"
              render={({ field: { onChange, value } }) => (
                <Input
                  placeholder="Your name"
                  value={value}
                  onChangeText={onChange}
                  className={errors.name ? 'border-destructive' : ''}
                />
              )}
            />
            {errors.name && (
              <Text className="text-xs text-destructive mt-1">{errors.name.message}</Text>
            )}
          </View>

          <View>
            <Label>Email *</Label>
            <Controller
              control={control}
              name="email"
              render={({ field: { onChange, value } }) => (
                <Input
                  placeholder="your.email@example.com"
                  value={value}
                  onChangeText={onChange}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  className={errors.email ? 'border-destructive' : ''}
                />
              )}
            />
            {errors.email && (
              <Text className="text-xs text-destructive mt-1">{errors.email.message}</Text>
            )}
          </View>
        </View>

        <View>
          <Label>Subject *</Label>
          <Controller
            control={control}
            name="subject"
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder="What is this about?"
                value={value}
                onChangeText={onChange}
                className={errors.subject ? 'border-destructive' : ''}
              />
            )}
          />
          {errors.subject && (
            <Text className="text-xs text-destructive mt-1">{errors.subject.message}</Text>
          )}
        </View>

        <View>
          <Label>Priority *</Label>
          <Controller
            control={control}
            name="priority"
            render={({ field: { onChange, value } }) => (
              <Select
                value={{ value, label: value }}
                onValueChange={(option) => onChange(option?.value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low" label="Low">
                    Low
                  </SelectItem>
                  <SelectItem value="medium" label="Medium">
                    Medium
                  </SelectItem>
                  <SelectItem value="high" label="High">
                    High
                  </SelectItem>
                </SelectContent>
              </Select>
            )}
          />
          {errors.priority && (
            <Text className="text-xs text-destructive mt-1">{errors.priority.message}</Text>
          )}
        </View>

        <View>
          <Label>Message *</Label>
          <Controller
            control={control}
            name="message"
            render={({ field: { onChange, value } }) => (
              <Textarea
                placeholder="Tell us more details..."
                value={value}
                onChangeText={onChange}
                numberOfLines={4}
                className={errors.message ? 'border-destructive' : ''}
              />
            )}
          />
          {errors.message && (
            <Text className="text-xs text-destructive mt-1">{errors.message.message}</Text>
          )}
        </View>

        <View className="flex-row items-center justify-between">
          <Label>Subscribe to newsletter</Label>
          <Controller
            control={control}
            name="newsletter"
            render={({ field: { onChange, value } }) => (
              <Switch checked={value || false} onCheckedChange={onChange} />
            )}
          />
        </View>

        <Button
          onPress={handleSubmit(onContactSubmit)}
          disabled={!isValid || !isDirty || contactMutation.isPending}
          className="w-full"
        >
          <Text>{contactMutation.isPending ? 'Submitting...' : 'Submit Contact Form'}</Text>
        </Button>
      </View>
    );
  };

  const renderPostForm = () => {
    const {
      control,
      handleSubmit,
      formState: { errors, isValid, isDirty },
      watch,
    } = postForm;
    const watchedTags = watch('tags');

    return (
      <View className="space-y-4">
        <View>
          <Label>Title *</Label>
          <Controller
            control={control}
            name="title"
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder="Enter post title"
                value={value}
                onChangeText={onChange}
                className={errors.title ? 'border-destructive' : ''}
              />
            )}
          />
          {errors.title && (
            <Text className="text-xs text-destructive mt-1">{errors.title.message}</Text>
          )}
        </View>

        <View>
          <Label>Author *</Label>
          <Controller
            control={control}
            name="author"
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder="Author name"
                value={value}
                onChangeText={onChange}
                className={errors.author ? 'border-destructive' : ''}
              />
            )}
          />
          {errors.author && (
            <Text className="text-xs text-destructive mt-1">{errors.author.message}</Text>
          )}
        </View>

        <View>
          <Label>Content *</Label>
          <Controller
            control={control}
            name="content"
            render={({ field: { onChange, value } }) => (
              <Textarea
                placeholder="Write your post content here..."
                value={value}
                onChangeText={onChange}
                numberOfLines={6}
                className={errors.content ? 'border-destructive' : ''}
              />
            )}
          />
          {errors.content && (
            <Text className="text-xs text-destructive mt-1">{errors.content.message}</Text>
          )}
        </View>

        <View>
          <View className="flex-row items-center justify-between mb-2">
            <Label>Tags * (min 1, max 5)</Label>
            <Button size="sm" variant="outline" onPress={addTag} disabled={watchedTags.length >= 5}>
              <Text className="text-xs">Add Tag</Text>
            </Button>
          </View>

          {watchedTags.map((_, index) => (
            <View key={`tag-${index}`} className="flex-row items-center gap-2 mb-2">
              <View className="flex-1">
                <Controller
                  control={control}
                  name={`tags.${index}`}
                  render={({ field: { onChange, value } }) => (
                    <Input
                      placeholder={`Tag ${index + 1}`}
                      value={value}
                      onChangeText={onChange}
                      className="flex-1"
                    />
                  )}
                />
              </View>
              {watchedTags.length > 1 && (
                <Button size="sm" variant="outline" onPress={() => removeTag(index)}>
                  <Text className="text-xs">Remove</Text>
                </Button>
              )}
            </View>
          ))}

          {errors.tags && (
            <Text className="text-xs text-destructive mt-1">
              {errors.tags.message || errors.tags.root?.message}
            </Text>
          )}
        </View>

        <Button
          onPress={handleSubmit(onPostSubmit)}
          disabled={!isValid || !isDirty || postMutation.isPending}
          className="w-full"
        >
          <Text>{postMutation.isPending ? 'Creating...' : 'Create Post'}</Text>
        </Button>
      </View>
    );
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-lg">Form Validation Demo</CardTitle>
        <Text className="text-sm text-muted-foreground">
          React Hook Form with Zod validation and real-time error feedback
        </Text>
      </CardHeader>

      <CardContent>
        {/* Form type selector */}
        <View className="flex-row gap-2 mb-4">
          <Button
            size="sm"
            variant={activeForm === 'contact' ? 'default' : 'outline'}
            onPress={() => setActiveForm('contact')}
            className="flex-1"
          >
            <Text className="text-xs">Contact Form</Text>
          </Button>
          <Button
            size="sm"
            variant={activeForm === 'post' ? 'default' : 'outline'}
            onPress={() => setActiveForm('post')}
            className="flex-1"
          >
            <Text className="text-xs">Post Creation</Text>
          </Button>
        </View>

        {/* Status indicators */}
        <View className="flex-row items-center gap-2 mb-4">
          <Badge variant="outline">
            <Text className="text-xs">Zod Validation</Text>
          </Badge>
          <Badge variant="outline">
            <Text className="text-xs">Real-time Errors</Text>
          </Badge>
          {(contactMutation.isPending || postMutation.isPending) && (
            <Badge variant="default">
              <Text className="text-xs">Submitting</Text>
            </Badge>
          )}
        </View>

        {/* Forms */}
        {activeForm === 'contact' ? renderContactForm() : renderPostForm()}
      </CardContent>
    </Card>
  );
}
