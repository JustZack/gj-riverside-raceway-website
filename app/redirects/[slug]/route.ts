import { redirects } from '@/content/redirects';
import { redirect } from 'next/navigation';

export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  const { slug } = params;
  const targetUrl = redirects[slug];

  // If no redirect found, redirect to home page
  if (!targetUrl) redirect('/');
  else redirect(targetUrl);
}
