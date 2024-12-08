import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'

export default function Services() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8 text-center">Our Services</h1>
      <div className="grid md:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Taxation Advice</CardTitle>
            <CardDescription>Expert guidance on Indian tax laws</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="list-disc pl-5 space-y-2">
              <li>Income tax planning and filing assistance</li>
              <li>GST compliance and strategy</li>
              <li>Tax-saving investment recommendations</li>
              <li>Handling tax notices and disputes</li>
            </ul>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Budgeting Tips</CardTitle>
            <CardDescription>Personalized financial management advice</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="list-disc pl-5 space-y-2">
              <li>Creating personalized budget plans</li>
              <li>Expense tracking and analysis</li>
              <li>Debt management strategies</li>
              <li>Savings goals and planning</li>
            </ul>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Investment Strategies</CardTitle>
            <CardDescription>Tailored investment advice for your goals</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="list-disc pl-5 space-y-2">
              <li>Portfolio diversification recommendations</li>
              <li>Risk assessment and management</li>
              <li>Retirement planning</li>
              <li>Market trends and opportunities analysis</li>
            </ul>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Financial Education</CardTitle>
            <CardDescription>Empowering you with financial knowledge</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="list-disc pl-5 space-y-2">
              <li>Basic to advanced financial concepts explained</li>
              <li>Regular webinars and workshops</li>
              <li>Personalized learning paths</li>
              <li>Access to a vast library of financial resources</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

