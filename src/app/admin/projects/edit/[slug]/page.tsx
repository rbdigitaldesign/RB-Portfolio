import { getProject } from '@/app/actions/projects';
import ProjectForm from '@/components/admin/project-form';
import { notFound } from 'next/navigation';

export default async function EditProjectPage({ params }: { params: { slug: string } }) {
  const project = await getProject(params.slug);

  if (!project) {
    notFound();
  }

  return (
    <div className="container mx-auto max-w-4xl py-16 px-4">
      <header className="mb-10">
        <h1 className="text-4xl font-bold font-headline">Edit Project</h1>
        <p className="text-xl text-muted-foreground mt-1">Update the details for <span className="font-semibold text-foreground">{project.title}</span>.</p>
      </header>
      <ProjectForm mode="edit" initialProject={project} />
    </div>
  );
}
