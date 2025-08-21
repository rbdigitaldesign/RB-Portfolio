"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { useState } from "react"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { sendContactMessage } from "@/app/actions/contact"

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  message: z.string().min(10, {
    message: "Message must be at least 10 characters.",
  }).max(500, {
    message: "Message must not be longer than 500 characters."
  })
})

export function ContactForm() {
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    const formData = new FormData();
    formData.append('name', values.name);
    formData.append('email', values.email);
    formData.append('message', values.message);

    try {
      const result = await sendContactMessage(formData);
      if (result.success) {
        toast({
          title: "Message Sent!",
          description: "Thanks for reaching out. I'll get back to you soon.",
        });
        form.reset();
      } else {
        throw new Error(result.error ?? 'An unknown error occurred.');
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "An unexpected error occurred.";
      toast({
        title: "Error",
        description: `Failed to send message: ${errorMessage}`,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Card className="w-full max-w-lg mx-auto">
        <CardHeader>
            <CardTitle className="font-headline">Send a Message</CardTitle>
        </CardHeader>
        <CardContent>
            <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                        <Input placeholder="Your Name" {...field} disabled={isLoading} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
                <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                        <Input placeholder="your.email@example.com" {...field} disabled={isLoading} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
                <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Message</FormLabel>
                    <FormControl>
                        <Textarea
                        placeholder="Tell me about your project or just say hello!"
                        className="resize-none"
                        {...field}
                        disabled={isLoading}
                        />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Sending..." : "Send Message"}
                </Button>
            </form>
            </Form>
        </CardContent>
    </Card>
  )
}
