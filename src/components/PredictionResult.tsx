
import { CheckCircle, AlertCircle, Award, ArrowUpRight } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import BankRecommendation from './BankRecommendation';
import { LoanFormData } from './LoanForm';

type PredictionResultProps = {
  prediction: {
    approved: boolean;
    probability: number;
    riskScore: number;
  };
  formData: LoanFormData;
};

const PredictionResult = ({ prediction, formData }: PredictionResultProps) => {
  const { approved, probability, riskScore } = prediction;
  
  // Get recommended banks based on the prediction and form data
  const recommendedBanks = getRecommendedBanks(prediction, formData);
  
  // Format currency values for display
  const formatINR = (value: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(value);
  };
  
  return (
    <div className="space-y-8 animate-slide-up">
      <div className="results-card">
        <div className="flex flex-col items-center text-center mb-6">
          {approved ? (
            <CheckCircle className="h-16 w-16 text-green-500 mb-2" />
          ) : (
            <AlertCircle className="h-16 w-16 text-red-500 mb-2" />
          )}
          <h2 className="text-2xl font-bold mb-1">
            {approved ? 'Loan Approved!' : 'Loan Not Recommended'}
          </h2>
          <p className="text-finance-darkGray">
            {approved 
              ? 'Based on your profile, you have a good chance of loan approval.'
              : 'Based on your profile, this loan may be difficult to get approved.'}
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-4 bg-white rounded-lg border border-gray-100">
            <p className="text-sm text-finance-darkGray mb-2">Approval Probability</p>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xl font-bold">{Math.round(probability * 100)}%</span>
              {probability > 0.7 ? (
                <Award className="h-5 w-5 text-finance-teal" />
              ) : null}
            </div>
            <Progress value={probability * 100} className="h-2" />
          </div>
          
          <div className="p-4 bg-white rounded-lg border border-gray-100">
            <p className="text-sm text-finance-darkGray mb-2">Risk Score</p>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xl font-bold">{riskScore}/100</span>
              <div className={`h-4 w-4 rounded-full ${getRiskColor(riskScore)}`}></div>
            </div>
            <Progress value={100 - riskScore} className={`h-2 ${getRiskProgressColor(riskScore)}`} />
          </div>
        </div>
      </div>
      
      {approved && (
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold">Recommended Banks</h3>
            <Button variant="outline" className="text-sm flex items-center gap-1">
              View All <ArrowUpRight className="h-3 w-3" />
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {recommendedBanks.map((bank) => (
              <BankRecommendation key={bank.id} bank={bank} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

// Helper functions
function getRiskColor(score: number): string {
  if (score < 30) return "bg-green-500";
  if (score < 70) return "bg-yellow-500";
  return "bg-red-500";
}

function getRiskProgressColor(score: number): string {
  if (score < 30) return "bg-green-500";
  if (score < 70) return "bg-yellow-500";
  return "bg-red-500";
}

// Mock function to get recommended banks based on the prediction
function getRecommendedBanks(prediction: { approved: boolean; probability: number; riskScore: number }, formData: LoanFormData) {
  // This would typically call an API or use a more sophisticated algorithm
  // For now, we're returning mock data
  const baseBanks = [
    {
      id: 1,
      name: "First National Bank",
      logo: "https://placehold.co/200x100/0D9488/FFFFFF?text=FNB",
      interestRate: "5.75%",
      maxLoanAmount: "₹25,00,000",
      score: 4.5,
    },
    {
      id: 2,
      name: "City Credit Union",
      logo: "https://placehold.co/200x100/1E3A8A/FFFFFF?text=CCU",
      interestRate: "5.99%",
      maxLoanAmount: "₹20,00,000",
      score: 4.3,
    },
    {
      id: 3,
      name: "Premier Lending",
      logo: "https://placehold.co/200x100/2563EB/FFFFFF?text=PL",
      interestRate: "6.25%",
      maxLoanAmount: "₹35,00,000",
      score: 4.1,
    }
  ];
  
  // If low credit score or high risk, adjust the interest rates
  if (formData.creditScore < 650 || prediction.riskScore > 50) {
    return baseBanks.map(bank => ({
      ...bank,
      interestRate: (parseFloat(bank.interestRate) + 1.5) + "%"
    }));
  }
  
  return baseBanks;
}

export default PredictionResult;
