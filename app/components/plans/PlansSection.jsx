import React from 'react';
import PlanCard from './PlanCard';
import plans from '../../../utils/data/plans'; // Updated import path

function PlansSection() {
  return (
    <div className="my-12 lg:my-16 text-white" id="plans">
      <h1 className="text-3xl font-bold text-center mb-8">Our Plans</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {plans.map((plan) => (
          <PlanCard key={plan.id} plan={plan} />
        ))}
      </div>
    </div>
  );
}

export default PlansSection;
