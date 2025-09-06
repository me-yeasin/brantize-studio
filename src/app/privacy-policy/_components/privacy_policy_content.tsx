"use client";

import Link from "next/link";

const PrivacyPolicyContent = () => {
  return (
    <main className="pt-32 pb-20 bg-gradient-to-br from-gray-900 via-purple-900/10 to-gray-900">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto bg-gray-900/80 p-8 rounded-2xl border border-gray-700 shadow-xl">
          <h1 className="font-orbitron text-3xl md:text-4xl font-bold mb-8 text-center">
            Privacy Policy
          </h1>

          <div className="text-gray-300 space-y-6">
            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4 text-purple-400">
                Introduction
              </h2>
              <p>
                At Brandtize Studio, we respect your privacy and are committed
                to protecting your personal data. This privacy policy will
                inform you about how we look after your personal data when you
                visit our website and tell you about your privacy rights and how
                the law protects you.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4 text-purple-400">
                The Data We Collect
              </h2>
              <p className="mb-4">
                We may collect, use, store and transfer different kinds of
                personal data about you which we have grouped together as
                follows:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong>Identity Data</strong> includes first name, last name,
                  username or similar identifier.
                </li>
                <li>
                  <strong>Contact Data</strong> includes email address and
                  telephone numbers.
                </li>
                <li>
                  <strong>Technical Data</strong> includes internet protocol
                  (IP) address, browser type and version, time zone setting and
                  location, browser plug-in types and versions, operating system
                  and platform, and other technology on the devices you use to
                  access this website.
                </li>
                <li>
                  <strong>Usage Data</strong> includes information about how you
                  use our website and services.
                </li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4 text-purple-400">
                How We Use Your Data
              </h2>
              <p className="mb-4">
                We will only use your personal data when the law allows us to.
                Most commonly, we will use your personal data in the following
                circumstances:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>To register you as a new customer.</li>
                <li>To provide and manage our services to you.</li>
                <li>
                  To manage our relationship with you, including notifying you
                  about changes to our services or policies.
                </li>
                <li>
                  To administer and protect our business and this website.
                </li>
                <li>
                  To deliver relevant website content and advertisements to you.
                </li>
                <li>
                  To use data analytics to improve our website, services,
                  marketing, customer relationships and experiences.
                </li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4 text-purple-400">
                Cookies
              </h2>
              <p>
                We use cookies and similar tracking technologies to track the
                activity on our website and hold certain information. Cookies
                are files with a small amount of data which may include an
                anonymous unique identifier. You can instruct your browser to
                refuse all cookies or to indicate when a cookie is being sent.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4 text-purple-400">
                Data Security
              </h2>
              <p>
                We have put in place appropriate security measures to prevent
                your personal data from being accidentally lost, used, or
                accessed in an unauthorized way, altered, or disclosed. In
                addition, we limit access to your personal data to those
                employees, agents, contractors, and other third parties who have
                a business need to know.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4 text-purple-400">
                Your Legal Rights
              </h2>
              <p className="mb-4">
                Under certain circumstances, you have rights under data
                protection laws in relation to your personal data, including the
                right to:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Request access to your personal data.</li>
                <li>Request correction of your personal data.</li>
                <li>Request erasure of your personal data.</li>
                <li>Object to processing of your personal data.</li>
                <li>Request restriction of processing your personal data.</li>
                <li>Request transfer of your personal data.</li>
                <li>Right to withdraw consent.</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4 text-purple-400">
                Contact Us
              </h2>
              <p>
                If you have any questions about this privacy policy or our
                privacy practices, please contact us at:
                <br />
                <span className="text-lime-400">
                  contact@brandtizestudio.com
                </span>
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4 text-purple-400">
                Changes to the Privacy Policy
              </h2>
              <p>
                We may update our Privacy Policy from time to time. We will
                notify you of any changes by posting the new Privacy Policy on
                this page.
                <br />
                <br />
                This privacy policy was last updated on September 6, 2025.
              </p>
            </section>
          </div>

          <div className="mt-10 pt-6 border-t border-gray-700">
            <Link
              href="/"
              className="inline-flex items-center text-purple-400 hover:text-lime-400 transition-colors"
              aria-label="Return to homepage"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
                  clipRule="evenodd"
                />
              </svg>
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
};

export default PrivacyPolicyContent;
