import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

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
    <section className="mx-auto grid max-w-5xl gap-6 px-4 py-16 sm:grid-cols-3">
      {FEATURES.map((feature) => (
        <Card key={feature.title} className="border-border/60 bg-background/60 backdrop-blur">
          <CardHeader>
            <CardTitle className="text-lg">{feature.title}</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            {feature.description}
          </CardContent>
        </Card>
      ))}
    </section>
  )
}
