import Link from 'next/link'
import { buttonVariants } from '@/components/ui/button'

export function Hero() {
  return (
    <section className="mx-auto flex max-w-4xl flex-col items-center gap-6 px-4 py-24 text-center">
      <span className="rounded-full border border-border/60 bg-background/60 px-4 py-1 text-sm text-muted-foreground backdrop-blur">
        Teacher-style feedback, not AI-written answers
      </span>
      <h1 className="text-4xl font-semibold tracking-tight sm:text-6xl">
        Feedback that makes you a better student
      </h1>
      <p className="max-w-2xl text-lg text-muted-foreground">
        Upload your essay, report, or project and get detailed, criterion-by-criterion
        feedback from GradeWise AI — coaching you to improve your own work, never
        rewriting it for you.
      </p>
      <div className="flex gap-3">
        <Link href="/login" className={buttonVariants({ size: 'lg' })}>
          Get started free
        </Link>
      </div>
    </section>
  )
}
