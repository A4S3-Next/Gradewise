import Link from 'next/link'
import { buttonVariants } from '@/components/ui/button'
import { FeedbackPreview } from '@/components/marketing/feedback-preview'
import { cn } from 'cn'

export function Hero() {
  return (
    <section className="mx-auto flex max-w-6xl flex-col items-center gap-16 px-4 py-24 lg:flex-row lg:items-center lg:gap-12 lg:py-32">
      <div className="flex max-w-xl flex-col items-center gap-6 text-center lg:items-start lg:text-left">
        <h1 className="text-[clamp(2.75rem,6vw,4.25rem)] leading-[1.05] font-semibold tracking-[-0.03em] text-balance text-foreground">
          Feedback that makes you a better student
        </h1>
        <p className="max-w-lg text-lg leading-relaxed text-muted-foreground">
          Upload your essay, report, or project and get detailed, criterion-by-criterion
          feedback from GradeWise AI — coaching you to improve your own work, never
          rewriting it for you.
        </p>
        <div className="flex flex-col items-center gap-4 sm:flex-row">
          <Link
            href="/login"
            className={cn(buttonVariants({ size: 'lg' }), 'h-11 rounded-full px-7 text-base')}
          >
            Get started free
          </Link>
          <a
            href="#how-it-works"
            className="text-base font-medium text-primary transition-colors hover:text-primary/80"
          >
            See how it works ↓
          </a>
        </div>
      </div>

      <div className="flex w-full justify-center lg:w-auto">
        <FeedbackPreview />
      </div>
    </section>
  )
}
