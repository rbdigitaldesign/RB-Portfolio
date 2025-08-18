
'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { format } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { addPost } from '@/app/actions/blog';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { cn } from '@/lib/utils';

const formSchema = z.object({
  title: z.string().min(5, 'Title must be at least 5 characters.'),
  summary: z.string().min(10, 'Summary must be at least 10 characters.'),
  content: z.string().min(20, 'Content must be at least 20 characters.'),
  tags: z.string().refine(
    (value) => value.split(',').map(tag => tag.trim()).filter(Boolean).length <= 3,
    { message: 'You can add a maximum of 3 tags.' }
  ).optional(),
  publishedDate: z.date().optional(),
  coverImageType: z.enum(['url', 'upload']),
  coverImageUrl: z.string().url('Please enter a valid URL.').optional().or(z.literal('')),
  coverImageFile: z.any().optional(),
}).refine(data => {
    if (data.coverImageType === 'url') {
        return !!data.coverImageUrl;
    }
    return true;
}, {
    message: 'Please provide an image URL.',
    path: ['coverImageUrl'],
}).refine(data => {
    if (data.coverImageType === 'upload') {
        return !!data.coverImageFile && data.coverImageFile.length > 0;
    }
    return true;
}, {
    message: 'Please select a file to upload.',
    path: ['coverImageFile'],
});

export default function NewPostPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      summary: '',
      content: '',
      tags: '',
      publishedDate: new Date(),
      coverImageType: 'url',
      coverImageUrl: '',
    },
  });

  const coverImageType = form.watch('coverImageType');

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    
    const formData = new FormData();
    formData.append('title', values.title);
    formData.append('summary', values.summary);
    formData.append('content', values.content);
    formData.append('tags', values.tags || '');
    if (values.publishedDate) {
        formData.append('publishedDate', values.publishedDate.toISOString());
    }
    formData.append('coverImageType', values.coverImageType);
    if (values.coverImageType === 'url' && values.coverImageUrl) {
      formData.append('coverImageUrl', values.coverImageUrl);
    }
    if (values.coverImageType === 'upload' && values.coverImageFile && values.coverImageFile.length > 0) {
      formData.append('coverImageFile', values.coverImageFile[0]);
    }

    try {
      const result = await addPost(formData);
      if (result.success) {
        toast({
          title: 'Post Published!',
          description: 'Your new blog post is now live.',
        });
        router.push('/admin/blog');
        router.refresh();
      } else {
        throw new Error(result.error || 'An unknown error occurred');
      }
    } catch (error) {
       const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred.';
       toast({
        title: 'Error',
        description: `Failed to publish post: ${errorMessage}`,
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="container mx-auto max-w-4xl py-16 px-4">
      <header className="mb-12">
        <h1 className="text-4xl font-bold font-headline">Create New Post</h1>
        <p className="text-xl text-muted-foreground">
          Fill out the details below to publish a new blog post.
        </p>
      </header>

      <Card>
        <CardContent className="pt-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Your amazing blog post title" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
               <FormField
                control={form.control}
                name="publishedDate"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Publication Date</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-[240px] pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) =>
                            date > new Date() || date < new Date("1900-01-01")
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="summary"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Summary</FormLabel>
                    <FormControl>
                      <Textarea placeholder="A short, catchy summary..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="content"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Content</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Write your full blog post content here. Markdown is supported." className="min-h-[300px]" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="tags"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tags</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. UX, Design, Learning" {...field} />
                    </FormControl>
                     <FormDescription>
                        Enter up to 3 tags, separated by commas.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="coverImageType"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel>Cover Image</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex flex-col space-y-1"
                      >
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="url" />
                          </FormControl>
                          <FormLabel className="font-normal">
                            Image URL
                          </FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="upload" />
                          </FormControl>
                          <FormLabel className="font-normal">
                            Upload Image
                          </FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {coverImageType === 'url' && (
                <FormField
                  control={form.control}
                  name="coverImageUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Image URL</FormLabel>
                      <FormControl>
                        <Input placeholder="https://example.com/image.png" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}

              {coverImageType === 'upload' && (
                 <FormField
                    control={form.control}
                    name="coverImageFile"
                    render={({ field: { value, onChange, ...fieldProps } }) => (
                      <FormItem>
                        <FormLabel>Image File</FormLabel>
                        <FormControl>
                          <Input
                            {...fieldProps}
                            type="file"
                            accept="image/png, image/jpeg, image/gif"
                            onChange={(event) => {
                                onChange(event.target.files);
                            }}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
              )}

              <div className="flex gap-4">
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? 'Publishing...' : 'Publish Post'}
                </Button>
                 <Button type="button" variant="outline" onClick={() => router.back()}>
                  Cancel
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
