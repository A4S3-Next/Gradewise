const FEATURES = [
  {
    title: 'Criterion-by-criterion scoring',
    description:
      'Feedback graded against official assessment criteria for MYP, IB DP, GCSE, AP, CBSE, IGCSE, or your own custom rubric.',
  },
  {
    title: 'Coaching, not rewriting',
    description:
      'GradeWise AI never rewrites your assignment. It shows you what to fix and why, so you improve the work yourself.',
  },
  {
    title: 'Track your progress',
    description:
      'See your improvement over time with a dashboard of past submissions, scores, and completed suggestions.',
  },
]

export function Features() {
  return (
    <section id="how-it-works" className="bg-muted/40">
      <div className="mx-auto max-w-4xl px-4 py-24">
        <h2 className="max-w-lg text-[clamp(1.75rem,3.5vw,2.5rem)] leading-tight font-semibold tracking-[-0.02em] text-foreground">
          How GradeWise grades
        </h2>

        <div className="mt-12 divide-y divide-border border-t border-border">
          {FEATURES.map((feature) => (
            <div
              key={feature.title}
              className="grid gap-2 py-8 sm:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] sm:gap-10"
            >
              <h3 className="text-xl font-medium tracking-tight text-foreground">
                {feature.title}
              </h3>
              <p className="text-base leading-relaxed text-muted-foreground">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
