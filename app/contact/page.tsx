import Hero from '@/components/Hero';
import ContentBlock from '@/components/ContentBlock';

export const metadata = {
  title: "Contact Us | CloudFix",
  description: "Get in touch with CloudFix. Talk to our AWS optimization experts about reducing your cloud costs.",
};

export default function Contact() {
  return (
    <>
      <Hero
        title="Let's Talk About Your AWS Costs"
        description="Whether you have questions about our solutions or want to discuss your AWS optimization needs, we're here to help."
      />

      <ContentBlock className="bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <h2 className="text-2xl font-bold mb-6">Send Us a Message</h2>

              <form className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>

                <div>
                  <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-2">
                    Company
                  </label>
                  <input
                    type="text"
                    id="company"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    rows={5}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-primary text-white px-8 py-4 rounded-lg font-semibold hover:bg-primary-dark transition"
                >
                  Send Message
                </button>
              </form>
            </div>

            {/* Contact Info */}
            <div>
              <h2 className="text-2xl font-bold mb-6">Other Ways to Reach Us</h2>

              <div className="space-y-8">
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mr-4">
                    <span className="text-2xl">📍</span>
                  </div>
                  <div>
                    <h3 className="font-bold mb-2">Office</h3>
                    <p className="text-gray-600">
                      2028 E Ben White Blvd.<br />
                      Ste 240-2650<br />
                      Austin, TX 78741
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mr-4">
                    <span className="text-2xl">💬</span>
                  </div>
                  <div>
                    <h3 className="font-bold mb-2">Get a Free Assessment</h3>
                    <p className="text-gray-600 mb-3">
                      The fastest way to get started is with a free AWS cost assessment.
                    </p>
                    <a
                      href="/assessment"
                      className="text-primary hover:text-primary-dark font-semibold"
                    >
                      Start Your Assessment →
                    </a>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mr-4">
                    <span className="text-2xl">🎧</span>
                  </div>
                  <div>
                    <h3 className="font-bold mb-2">AWS Insiders Podcast</h3>
                    <p className="text-gray-600 mb-3">
                      Listen to our podcast for AWS insights and optimization tips.
                    </p>
                    <a
                      href="/podcast"
                      className="text-primary hover:text-primary-dark font-semibold"
                    >
                      Listen Now →
                    </a>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mr-4">
                    <span className="text-2xl">🔧</span>
                  </div>
                  <div>
                    <h3 className="font-bold mb-2">Support</h3>
                    <p className="text-gray-600 mb-3">
                      Already a customer? Get technical support.
                    </p>
                    <a
                      href="https://support.cloudfix.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:text-primary-dark font-semibold"
                    >
                      Visit Support Center →
                    </a>
                  </div>
                </div>
              </div>

              <div className="mt-12 p-6 bg-gradient-to-br from-primary/5 to-primary-dark/5 rounded-xl">
                <h3 className="font-bold mb-3">Enterprise Solutions?</h3>
                <p className="text-gray-700 mb-4">
                  Looking for consulting-driven optimization or custom enterprise solutions?
                </p>
                <a
                  href="/pricing"
                  className="text-primary hover:text-primary-dark font-semibold"
                >
                  View Enterprise Pricing →
                </a>
              </div>
            </div>
          </div>
        </div>
      </ContentBlock>
    </>
  );
}
