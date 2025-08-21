
'use client';

import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useRouter, useParams } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import { format } from 'date-fns';
import { Calendar as CalendarIcon, Code } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { getPost, updatePost } from '@/app/actions/blog';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import type { Post } from '@/lib/types';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';
import RichEditor from '@/components/rich-editor';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { mdToHtmlSafe } from '@/lib/md';


const formSchemaBase = z.object({
  title: z.string().min(5, 'Title must be at least 5 characters.'),
  summary: z.string().min(10, 'Summary must be at least 10 characters.'),
  contentHtml: z.string().min(1, 'Content is required.'),
  tags: z.string().refine(
    (value) => !value || value.split(',').map(tag => tag.trim()).filter(Boolean).length <= 3,
    { message: 'You can add a maximum of 3 tags.' }
  ).optional(),
  publishedDate: z.date().optional(),
  coverImageType: z.enum(['url', 'upload']),
  coverImageUrl: z.string().url('Please enter a valid URL.').optional().or(z.literal('')),
  coverImageFile: z.any().optional(),
});

const formSchema = formSchemaBase.refine(data => {
    if (data.coverImageType === 'url') return !!data.coverImageUrl;
    return true;
}, {
    message: 'Please provide an image URL.',
    path: ['coverImageUrl'],
});

type FormValues = z.infer<typeof formSchema>;

export default function EditPostPage() {
  const { slug } = useParams() as { slug: string };
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [post, setPost] = useState<Post | null>(null);
  const [isFetching, setIsFetching] = useState(true);
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      summary: '',
      tags: '',
      publishedDate: new Date(),
      coverImageType: 'url',
      coverImageUrl: '',
      contentHtml: '',
    },
  });
  
  useEffect(() => {
    async function fetchPost() {
      if (!slug) return;
      setIsFetching(true);
      const fetchedPost = await getPost(slug);
      if (fetchedPost) {
        setPost(fetchedPost);
        const initialHtml = fetchedPost.contentHtml?.trim()
          ? fetchedPost.contentHtml
          : fetchedPost.content
          ? mdToHtmlSafe(fetchedPost.content)
          : '';

        form.reset({
            title: fetchedPost.title ?? '',
            summary: fetchedPost.summary ?? '',
            tags: (fetchedPost.tags ?? []).join(', '),
            publishedDate: new Date(fetchedPost.publishedDate),
            coverImageType: 'url',
            coverImageUrl: fetchedPost.coverImage ?? '',
            contentHtml: initialHtml,
        });
      } else {
        toast({ title: 'Error', description: 'Post not found.', variant: 'destructive' });
        router.push('/admin/blog');
      }
      setIsFetching(false);
    }
    fetchPost();
  }, [slug, form, router, toast]);

  const initialHtml = useMemo(() => {
    if (!post) return '';
    return post.contentHtml?.trim()
      ? post.contentHtml
      : post.content
      ? mdToHtmlSafe(post.content)
      : '';
  }, [post]);


  const coverImageType = form.watch('coverImageType');

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    if (!post || !post.id) return;
    setIsLoading(true);

    const formData = new FormData();
    formData.append('title', data.title);
    formData.append('summary', data.summary);
    formData.append('contentHtml', data.contentHtml);
    if (data.tags) formData.append('tags', data.tags);
    if (data.publishedDate) formData.append('publishedDate', data.publishedDate.toISOString());
    formData.append('coverImageType', data.coverImageType);
    if (data.coverImageUrl) formData.append('coverImageUrl', data.coverImageUrl);
    if (data.coverImageFile) formData.append('coverImageFile', data.coverImageFile);
    formData.append('postId', post.id);
    formData.append('originalSlug', post.slug);

    try {
        const result = await updatePost(formData);
        if (result.success) {
            toast({
                title: 'Post Updated!',
                description: 'Your blog post has been successfully updated.',
            });
            router.push('/admin/blog');
            router.refresh();
        } else {
            throw new Error(result.error ?? 'An unknown error occurred.');
        }
    } catch (error) {
       const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred.';
       toast({
        title: 'Error',
        description: `Failed to update post: ${errorMessage}`,
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  }

  if (isFetching || !post) {
    return (
        <div className="container mx-auto max-w-4xl py-16 px-4">
            <header className="mb-12">
                <Skeleton className="h-10 w-3/5" />
                <Skeleton className="h-6 w-4/5 mt-2" />
            </header>
            <Card>
                <CardContent className="pt-6 space-y-8">
                     <Skeleton className="h-10 w-full" />
                     <Skeleton className="h-24 w-full" />
                     <Skeleton className="h-64 w-full" />
                </CardContent>
            </Card>
        </div>
    )
  }

  return (
    <div className="container mx-auto max-w-4xl py-16 px-4">
      <header className="mb-12">
        <h1 className="text-4xl font-bold font-headline">Edit Post</h1>
        <p className="text-xl text-muted-foreground">
          Make changes to your blog post below.
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
                            type="button"
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
                name="contentHtml"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Content</FormLabel>
                     <FormControl>
                        <RichEditor 
                            initialHtml={initialHtml}
                            onChange={(html) => form.setValue('contentHtml', html ?? '', { shouldValidate: true, shouldDirty: true })} 
                        />
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
                            onValueChange={(value) => {
                            field.onChange(value);
                            if (value === 'url' && post) {
                                form.setValue('coverImageUrl', post.coverImage);
                            } else {
                                form.setValue('coverImageUrl', '');
                            }
                            }}
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
                                Upload New Image
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
                                onChange(event.target.files?.[0]);
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
                  {isLoading ? 'Saving...' : 'Save Changes'}
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
