
import { ArrowRight, Calculator, BarChart, Building } from 'lucide-react';

const HowItWorks = () => {
  const steps = [
    {
      icon: <Calculator className="h-8 w-8 text-finance-teal" />,
      title: "Enter Loan Details",
      description: "Fill in your financial information and desired loan parameters."
    },
    {
      icon: <BarChart className="h-8 w-8 text-finance-teal" />,
      title: "Get AI Prediction",
      description: "Our XGBoost model analyzes your data to predict loan eligibility."
    },
    {
      icon: <Building className="h-8 w-8 text-finance-teal" />,
      title: "View Bank Matches",
      description: "See personalized bank recommendations based on your profile."
    }
  ];

  return (
    <div className="py-12 px-4 bg-white rounded-xl shadow-sm border border-gray-100">
      <h2 className="text-2xl font-bold text-center mb-10 gradient-heading">How It Works</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {steps.map((step, index) => (
          <div key={index} className="flex flex-col items-center text-center">
            <div className="bg-finance-lightBlue p-4 rounded-full mb-4">
              {step.icon}
            </div>
            <h3 className="font-bold text-lg mb-2">{step.title}</h3>
            <p className="text-finance-darkGray text-sm">{step.description}</p>
            
            {index < steps.length - 1 && (
              <div className="hidden md:block absolute transform translate-x-32">
                <ArrowRight className="h-6 w-6 text-gray-300" />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default HowItWorks;
