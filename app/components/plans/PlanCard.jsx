import React from 'react';

function PlanCard({ plan }) {
  return (
    <div className="border p-4 rounded-lg shadow-lg bg-[#1a1443] text-white">
      <h2 className="text-xl font-bold mb-2">{plan.title}</h2>
      <h3 className="text-lg text-[#16f2b3] mb-4">{plan.price}</h3>
      <p className="text-sm mb-4">{plan.description}</p>
      <ul className="list-disc pl-5 mb-4 text-sm">
        {plan.features.map((feature, index) => (
          <li key={index}>{feature}</li>
        ))}
      </ul>
      <p className="text-sm mb-2">⏳ Delivery Time: {plan.deliveryTime}</p>
      <p className="text-sm mb-4">🔄 Revisions: {plan.revisions}</p>
      <a
        href={plan.link}
        target="_blank"
        rel="noopener noreferrer"
        className="bg-[#16f2b3] text-gray-800 px-4 py-2 rounded hover:bg-[#0dcf93] transition-all"
      >
        Get Started
      </a>
    </div>
  );
}

export default PlanCard;
