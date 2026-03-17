import ProjectForm from '@/components/admin/project-form';

export default function NewProjectPage() {
  return (
    <div className="container mx-auto max-w-4xl py-16 px-4">
      <header className="mb-10">
        <h1 className="text-4xl font-bold font-headline">Add New Project</h1>
        <p className="text-xl text-muted-foreground mt-1">Fill in the details to add a project to your portfolio.</p>
      </header>
      <ProjectForm mode="new" />
    </div>
  );
}
