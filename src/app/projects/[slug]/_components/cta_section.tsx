const CtaSection = () => {
  return (
    <section className="py-24 bg-gradient-to-br from-gray-900 via-purple-900/10 to-gray-900 relative overflow-hidden">
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23c6ff00' fill-opacity='0.1' fill-rule='evenodd'%3E%3Cpath d='M0 0H40V40H0z'/%3E%3C/g%3E%3C/svg%3E")`,
        }}
      ></div>

      <div className="container mx-auto px-4 text-center relative z-10">
        <h2 className="font-orbitron font-bold text-4xl mb-6">
          Ready to Transform Your Business with{" "}
          <span className="bg-gradient-to-r from-purple-600 to-lime-400 bg-clip-text text-transparent">
            AI
          </span>
          ?
        </h2>
        <p className="text-gray-400 max-w-2xl mx-auto text-xl mb-10 leading-relaxed">
          Get in touch with our team to discuss how we can create a custom AI
          solution for your business needs. We will help you identify
          opportunities, design solutions, and implement cutting-edge AI
          technology that drives real business value.
        </p>
        <button
          onClick={() => {
            window.location.href = "/#contact";
          }}
          className="px-8 py-4 rounded-full font-bold text-lg bg-gradient-to-r from-purple-600 to-lime-400 text-gray-900 shadow-lg shadow-purple-600/30 hover:shadow-purple-600/50 hover:-translate-y-2 transition-all"
        >
          Get Started Today
        </button>
      </div>
    </section>
  );
};

export default CtaSection;
