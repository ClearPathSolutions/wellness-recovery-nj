import Link from 'next/link';
import { Container, Icon } from '@/components/ui';

export default function NotFound() {
  return (
    <section className="flex min-h-[70vh] items-center bg-cream">
      <Container>
        <div className="mx-auto max-w-xl text-center">
          <p className="font-display text-7xl text-clay-500">404</p>
          <h1 className="mt-4 font-display text-3xl text-ink-900">This page took a wrong turn</h1>
          <p className="mt-4 text-ink-600">
            The page you’re looking for can’t be found — but the help you’re looking for is always
            here. Let’s get you back on track.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link href="/" className="btn-primary">
              Back to Home
            </Link>
            <a href="tel:+18668613449" className="btn-outline">
              <Icon name="phone" className="h-4 w-4" />
              Call (866) 861-3449
            </a>
          </div>
        </div>
      </Container>
    </section>
  );
}
