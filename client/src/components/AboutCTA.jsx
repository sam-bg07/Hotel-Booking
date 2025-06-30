export const AboutCTA = () => {
  return (
    <section className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
          Ready to Experience QuickStay?
        </h2>
        <p className="text-xl text-blue-100 mb-8 leading-relaxed">
          Join thousands of satisfied travelers who trust us with their luxury
          accommodation needs. Start your journey today and discover what makes
          QuickStay special.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="bg-white text-blue-600 font-semibold py-4 px-8 rounded-xl hover:bg-gray-100 transition-a duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
            Browse Hotels
          </button>
          <button className="bg-transparent border-2 border-white text-white font-semibold py-4 px-8 rounded-xl hover:bg-white hover:text-blue-600 transition-all duration-200">
            Contact Our Team
          </button>
        </div>
      </div>
    </section>
  );
};
