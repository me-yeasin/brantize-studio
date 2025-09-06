"use client";

import Link from "next/link";

const TermsAndConditionsContent = () => {
  return (
    <main className="pt-32 pb-20 bg-gradient-to-br from-gray-900 via-purple-900/10 to-gray-900">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto bg-gray-900/80 p-8 rounded-2xl border border-gray-700 shadow-xl">
          <h1 className="font-orbitron text-3xl md:text-4xl font-bold mb-8 text-center">
            Terms and Conditions
          </h1>

          <div className="text-gray-300 space-y-6">
            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4 text-purple-400">
                Introduction
              </h2>
              <p>
                These terms and conditions outline the rules and regulations for
                the use of Brandtize Studio&apos;s website. By accessing this
                website, we assume you accept these terms and conditions in
                full. Do not continue to use Brandtize Studio&apos;s website if
                you do not accept all of the terms and conditions stated on this
                page.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4 text-purple-400">
                Intellectual Property
              </h2>
              <p className="mb-4">
                Unless otherwise stated, Brandtize Studio and/or its licensors
                own the intellectual property rights for all material on this
                website. All intellectual property rights are reserved. You may
                view and/or print pages from the website for your own personal
                use subject to restrictions set in these terms and conditions.
              </p>
              <p>You must not:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Republish material from this website</li>
                <li>Sell, rent, or sub-license material from this website</li>
                <li>
                  Reproduce, duplicate, or copy material from this website
                </li>
                <li>
                  Redistribute content from Brandtize Studio (unless content is
                  specifically made for redistribution)
                </li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4 text-purple-400">
                User Content
              </h2>
              <p>
                In these terms and conditions, &quot;User Content&quot; means
                material (including without limitation text, images, audio
                material, video material and audio-visual material) that you
                submit to this website, for whatever purpose.
                <br />
                <br />
                You grant to Brandtize Studio a worldwide, irrevocable,
                non-exclusive, royalty-free license to use, reproduce, adapt,
                publish, translate and distribute your User Content in any
                existing or future media. You also grant to Brandtize Studio the
                right to sub-license these rights, and the right to bring an
                action for infringement of these rights.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4 text-purple-400">
                Limitation of Liability
              </h2>
              <p>
                In no event shall Brandtize Studio, nor any of its officers,
                directors, and employees, be liable to you for anything arising
                out of or in any way connected with your use of this website,
                whether such liability is under contract, tort or otherwise, and
                Brandtize Studio shall not be liable for any indirect,
                consequential or special liability arising out of or in any way
                related to your use of this website.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4 text-purple-400">
                Indemnification
              </h2>
              <p>
                You hereby indemnify to the fullest extent Brandtize Studio from
                and against any and all liabilities, costs, demands, causes of
                action, damages and expenses (including reasonable
                attorney&apos;s fees) arising out of or in any way related to
                your breach of any of the provisions of these terms.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4 text-purple-400">
                Severability
              </h2>
              <p>
                If any provision of these terms is found to be unenforceable or
                invalid under any applicable law, such unenforceability or
                invalidity shall not render these terms unenforceable or invalid
                as a whole, and such provisions shall be deleted without
                affecting the remaining provisions herein.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4 text-purple-400">
                Variation of Terms
              </h2>
              <p>
                Brandtize Studio is permitted to revise these terms at any time
                as it sees fit, and by using this website you are expected to
                review these terms regularly to ensure you understand all terms
                and conditions governing the use of this website.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4 text-purple-400">
                Assignment
              </h2>
              <p>
                Brandtize Studio is allowed to assign, transfer, and subcontract
                its rights and/or obligations under these terms without any
                notification. However, you are not allowed to assign, transfer,
                or subcontract any of your rights and/or obligations under these
                terms.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4 text-purple-400">
                Governing Law & Jurisdiction
              </h2>
              <p>
                These terms will be governed by and construed in accordance with
                the laws of the state of [YOUR STATE/COUNTRY], and you submit to
                the non-exclusive jurisdiction of the state and federal courts
                located in [YOUR STATE/COUNTRY] for the resolution of any
                disputes.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4 text-purple-400">
                Contact Information
              </h2>
              <p>
                If you have any questions about these Terms and Conditions,
                please contact us at:
                <br />
                <span className="text-lime-400">
                  contact@brandtizestudio.com
                </span>
              </p>
            </section>
          </div>

          <div className="mt-10 pt-6 border-t border-gray-700">
            <Link
              href="/"
              className="inline-flex items-center text-purple-400 hover:text-lime-400 transition-colors"
              aria-label="Return to Home"
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

export default TermsAndConditionsContent;
