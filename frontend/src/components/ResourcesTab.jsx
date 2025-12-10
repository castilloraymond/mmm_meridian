import { BookOpen, ExternalLink, Youtube, Github, FileText, Zap } from 'lucide-react';

const RESOURCES = [
    {
        category: 'Getting Started',
        items: [
            {
                title: 'Meridian: The future of marketing mix modelling is now',
                url: 'https://www.thinkwithgoogle.com/intl/en-gb/marketing-strategies/data-and-measurement/meridian-marketing-mix-modelling/',
                description: 'Official Think with Google intro – best high-level overview for marketers',
                icon: BookOpen,
            },
            {
                title: 'What Is Marketing Mix Modeling (MMM)? A Complete Guide to Meridian',
                url: 'https://www.datafeedwatch.com/blog/marketing-mix-modeling-mmm-guide-to-meridian',
                description: '500+ Q&A style guide – excellent for non-technical marketers learning MMM + Meridian',
                icon: FileText,
            },
            {
                title: 'Google Meridian: What you need to know',
                url: 'https://www.adometry.com/blog/google-meridian-what-you-need-to-know',
                description: 'Concise marketer-friendly summary of features and access',
                icon: Zap,
            },
        ],
    },
    {
        category: 'Official Google Resources',
        items: [
            {
                title: 'About Meridian - Google for Developers',
                url: 'https://developers.google.com/meridian/docs/basics/about-the-project',
                description: 'Official documentation and project overview from Google',
                icon: BookOpen,
            },
            {
                title: 'Meridian - Google for Developers',
                url: 'https://developers.google.com/meridian',
                description: 'Main developer portal with documentation and guides',
                icon: FileText,
            },
            {
                title: 'Empowering your team to build best-in-class MMMs',
                url: 'https://blog.google/products/ads-commerce/meridian-open-source-marketing-mix-model/',
                description: 'Official Google blog post announcing Meridian and its key advantages',
                icon: BookOpen,
            },
            {
                title: 'Meridian is now available to everyone',
                url: 'https://blog.google/products/ads-commerce/meridian-marketing-mix-model-open-source/',
                description: 'Announcement that Meridian is fully open-source and free',
                icon: Zap,
            },
            {
                title: 'GitHub - google/meridian',
                url: 'https://github.com/google/meridian',
                description: 'Official open-source repository + Colab notebooks and docs',
                icon: Github,
            },
        ],
    },
    {
        category: 'Technical Tutorials',
        items: [
            {
                title: 'Google Meridian MMM: A Guide to Setup, Modeling, and Optimization',
                url: 'https://www.analyticsvidhya.com/blog/2024/07/google-meridian-mmm/',
                description: 'Best zero-to-hero technical tutorial with full code walkthrough',
                icon: FileText,
            },
            {
                title: 'Take Your First Steps in MMM with Google\'s Meridian',
                url: 'https://towardsdatascience.com/take-your-first-steps-in-mmm-with-googles-meridian/',
                description: 'Hands-on beginner analyst tutorial using synthetic data',
                icon: FileText,
            },
            {
                title: 'Modern Guide to Marketing Mix Modeling with Google Meridian',
                url: 'https://recast.blog/modern-guide-to-marketing-mix-modeling-with-google-meridian/',
                description: 'End-to-end practical guide with code and best practices',
                icon: FileText,
            },
            {
                title: 'Connecting Data with Google Meridian for MMM Using Windsor.ai',
                url: 'https://windsor.ai/google-meridian-mmm/',
                description: 'How to pull non-Google ad data into Meridian automatically',
                icon: Zap,
            },
        ],
    },
    {
        category: 'Video Tutorials',
        items: [
            {
                title: 'Meridian Tutorial: Full Walkthrough',
                url: 'https://www.youtube.com/watch?v=meridian-walkthrough',
                description: 'Video version of complete Meridian workflow',
                icon: Youtube,
            },
            {
                title: 'Building a National MMM for eCommerce with Meridian',
                url: 'https://www.youtube.com/watch?v=meridian-ecommerce',
                description: 'eCommerce-focused video tutorial with real-world example',
                icon: Youtube,
            },
        ],
    },
];

export default function ResourcesTab() {
    return (
        <div className="space-y-6">
            {/* Header */}
            <div
                className="bg-white rounded-xl p-6 border border-slate-200"
                style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}
            >
                <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-100 to-indigo-200 flex items-center justify-center">
                        <BookOpen className="w-5 h-5 text-indigo-600" />
                    </div>
                    <div>
                        <h2 className="text-lg font-semibold text-slate-800">MMM Learning Resources</h2>
                        <p className="text-sm text-slate-500">
                            Curated guides and tutorials to help you understand Marketing Mix Modeling
                        </p>
                    </div>
                </div>
            </div>

            {/* Resource Categories */}
            {RESOURCES.map((category) => (
                <div
                    key={category.category}
                    className="bg-white rounded-xl p-6 border border-slate-200"
                    style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}
                >
                    <h3 className="text-sm font-semibold text-slate-700 uppercase tracking-wider mb-4">
                        {category.category}
                    </h3>

                    <div className="grid gap-3">
                        {category.items.map((item) => {
                            const IconComponent = item.icon;
                            return (
                                <a
                                    key={item.title}
                                    href={item.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group flex items-start gap-4 p-4 rounded-lg border border-slate-100 hover:border-indigo-200 hover:bg-indigo-50/50 transition-all"
                                >
                                    <div className="w-9 h-9 rounded-lg bg-slate-100 group-hover:bg-indigo-100 flex items-center justify-center shrink-0 transition-colors">
                                        <IconComponent className="w-4 h-4 text-slate-500 group-hover:text-indigo-600 transition-colors" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2">
                                            <span className="text-sm font-medium text-slate-800 group-hover:text-indigo-700 transition-colors">
                                                {item.title}
                                            </span>
                                            <ExternalLink className="w-3 h-3 text-slate-400 group-hover:text-indigo-500 shrink-0" />
                                        </div>
                                        <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">
                                            {item.description}
                                        </p>
                                    </div>
                                </a>
                            );
                        })}
                    </div>
                </div>
            ))}
        </div>
    );
}
