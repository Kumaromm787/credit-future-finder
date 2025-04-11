
import { CheckCircle, AlertCircle, Award, ArrowUpRight } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import BankRecommendation from './BankRecommendation';
import { LoanFormData } from './LoanForm';
import FinancialTips from './FinancialTips';

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

  const getLoanTypeLabel = (type: string) => {
    switch (type) {
      case "home": return "Home Loan";
      case "car": return "Car Loan";
      case "education": return "Education Loan";
      case "gold": return "Gold Loan";
      case "mortgage": return "Mortgage";
      default: return "Loan";
    }
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
            {approved ? `${getLoanTypeLabel(formData.loanType)} Approved!` : `${getLoanTypeLabel(formData.loanType)} Not Recommended`}
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
        
        {!approved && <FinancialTips formData={formData} riskScore={riskScore} />}
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

// Mock function to get recommended banks based on the prediction and loan type
function getRecommendedBanks(prediction: { approved: boolean; probability: number; riskScore: number }, formData: LoanFormData) {
  // Common banks for all loan types
  const commonBanks = [
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
  
  // Specialized banks based on loan type
  const specializedBanks = {
    home: [
      {
        id: 4,
        name: "Home Finance Ltd",
        logo: "https://placehold.co/200x100/047857/FFFFFF?text=HFL",
        interestRate: "5.50%",
        maxLoanAmount: "₹50,00,000",
        score: 4.7,
      }
    ],
    car: [
      {
        id: 5,
        name: "Auto Loan Group",
        logo: "https://placehold.co/200x100/D97706/FFFFFF?text=ALG",
        interestRate: "7.25%",
        maxLoanAmount: "₹12,00,000",
        score: 4.6,
      }
    ],
    education: [
      {
        id: 6,
        name: "Scholar Finance",
        logo: "https://placehold.co/200x100/4F46E5/FFFFFF?text=SF",
        interestRate: "4.75%",
        maxLoanAmount: "₹15,00,000",
        score: 4.8,
      }
    ],
    gold: [
      {
        id: 7,
        name: "Gold Asset Bank",
        logo: "https://placehold.co/200x100/F59E0B/FFFFFF?text=GAB",
        interestRate: "8.50%",
        maxLoanAmount: "₹10,00,000",
        score: 4.2,
      }
    ],
    mortgage: [
      {
        id: 8,
        name: "Mortgage Masters",
        logo: "https://placehold.co/200x100/881337/FFFFFF?text=MM",
        interestRate: "5.85%",
        maxLoanAmount: "₹70,00,000",
        score: 4.5,
      }
    ]
  };
  
  // Get specialized banks for the loan type
  const typeSpecificBanks = (specializedBanks as any)[formData.loanType] || [];
  
  // If low credit score or high risk, adjust the interest rates
  if (formData.creditScore < 650 || prediction.riskScore > 50) {
    const adjustedBanks = [...typeSpecificBanks, ...commonBanks.slice(0, 1)].map(bank => ({
      ...bank,
      interestRate: (parseFloat(bank.interestRate) + 1.5) + "%"
    }));
    return adjustedBanks;
  }
  
  // Return a mix of specialized and common banks
  return [...typeSpecificBanks, ...commonBanks.slice(0, 2)];
}

export default PredictionResult;
