function AboutSection() {
  return (
    <div>
      {/* Plans Section */}
      <div className="my-12">
        <h2 className="text-2xl font-bold text-[#16f2b3] uppercase mb-8">
          Our Plans
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className="bg-[#1a1443] text-white p-6 rounded-lg shadow-lg"
            >
              <h3 className="text-xl font-bold mb-4">{plan.title}</h3>
              <p className="text-lg font-semibold mb-4">{plan.price}</p>
              <p className="text-sm mb-4">{plan.description}</p>
              <ul className="list-disc ml-5 mb-4 text-sm">
                {plan.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
              <p className="text-sm mb-2">
                <strong>Delivery Time:</strong> {plan.deliveryTime}
              </p>
              <p className="text-sm mb-4">
                <strong>Revisions:</strong> {plan.revisions}
              </p>
            </div>
          ))}
        </div>

        {/* Purchase Button */}
        <div className="flex justify-center mt-8">
          <a
            href="https://devzahir.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#16f2b3] text-white font-semibold py-2 px-6 rounded-lg shadow-lg hover:bg-[#13d2a1] transition"
          >
            Purchase Now
          </a>
        </div>
      </div>

      {/* About Section */}
      <div id="about" className="my-12 lg:my-16 relative">
        <div className="hidden lg:flex flex-col items-center absolute top-16 -right-8">
          <span className="bg-[#1a1443] w-fit text-white rotate-90 p-2 px-5 text-xl rounded-md">
            ABOUT ME
          </span>
          <span className="h-36 w-[2px] bg-[#1a1443]"></span>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
          <div className="order-2 lg:order-1">
            <p className="font-medium mb-5 text-[#16f2b3] text-xl uppercase">
              Who I am?
            </p>
            <p className="text-gray-200 text-sm lg:text-lg">
              {personalData.description}
            </p>
          </div>
          <div className="flex justify-center order-1 lg:order-2">
            <Image
              src={personalData.profile}
              width={280}
              height={280}
              alt="Abu Said"
              className="rounded-lg transition-all duration-1000 hover:scale-110 cursor-pointer"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
