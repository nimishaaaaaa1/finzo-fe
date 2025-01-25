'use client'
import Link from 'next/link'

const blogs = [
  {
    slug: 'how-to-calculate-income-tax',
    title: 'How to Calculate Income Tax in India: A Complete Guide (2024)',
    description: 'Learn step-by-step process to calculate your income tax liability with examples and expert tips.',
    readTime: '8 min read',
    path: '/blogs/income-tax/how-to-calculate-income-tax'
  },
  {
    slug: 'tax-free-income-7-5-lakhs',
    title: 'How to Make ₹7.5 Lakhs Income Tax Free: Complete Strategy',
    description: 'Detailed guide on making your income up to ₹7.5 lakhs tax-free using legal deductions and exemptions.',
    readTime: '6 min read',
    path: '/blogs/income-tax/tax-free-income-7-5-lakhs'
  },
  {
    slug: 'tax-calculation-10-lakhs',
    title: 'Income Tax on ₹10 Lakhs Salary: Detailed Breakdown (2024-25)',
    description: 'Complete analysis of tax liability on ₹10 lakhs income under both old and new tax regimes.',
    readTime: '7 min read',
    path: '/blogs/income-tax/tax-calculation-10-lakhs'
  },
  {
    slug: 'tax-calculation-23-lakhs',
    title: 'Income Tax Calculator for ₹23 Lakhs: Maximize Your Savings',
    description: 'Expert guide on calculating and optimizing tax for ₹23 lakhs salary with tax-saving tips.',
    readTime: '9 min read',
    path: '/blogs/income-tax/tax-calculation-23-lakhs'
  },
  {
    slug: 'old-vs-new-tax-regime',
    title: 'Old vs New Tax Regime: Which One Should You Choose? (2024)',
    description: 'Comprehensive comparison of old and new tax regimes with examples and decision framework.',
    readTime: '10 min read',
    path: '/blogs/income-tax/old-vs-new-tax-regime'
  }
]

export default function TaxBlogs() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 via-white to-pink-50 pt-24">
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-8">Income Tax Guides & Resources</h1>
        <div className="grid md:grid-cols-2 gap-8">
          {blogs.map((blog) => (
            <Link 
              href={blog.path}
              key={blog.slug}
              className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-purple-100 hover:shadow-xl transition-shadow"
            >
              <h2 className="text-2xl font-bold mb-3">{blog.title}</h2>
              <p className="text-gray-600 mb-4">{blog.description}</p>
              <div className="flex items-center text-sm text-purple-600">
                <span>{blog.readTime}</span>
                <span className="mx-2">•</span>
                <span>Read more →</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
} 