
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, StarHalf } from "lucide-react";

type BankProps = {
  bank: {
    id: number;
    name: string;
    logo: string;
    interestRate: string;
    maxLoanAmount: string;
    score: number;
  };
};

const BankRecommendation = ({ bank }: BankProps) => {
  const { name, logo, interestRate, maxLoanAmount, score } = bank;
  
  // Generate stars based on the score
  const stars = Array.from({ length: 5 }, (_, i) => {
    const starValue = i + 1;
    if (starValue <= Math.floor(score)) {
      return <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />;
    } else if (starValue - 0.5 <= score) {
      return <StarHalf key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />;
    } else {
      return <Star key={i} className="h-4 w-4 text-gray-300" />;
    }
  });
  
  return (
    <div className="bank-card">
      <div className="flex justify-center mb-4">
        <img src={logo} alt={name} className="h-12 object-contain" />
      </div>
      
      <h4 className="font-bold text-lg mb-1">{name}</h4>
      
      <div className="flex items-center mb-3">
        {stars}
        <span className="ml-1 text-sm text-gray-600">{score}</span>
      </div>
      
      <div className="space-y-2 mb-4">
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">Interest Rate:</span>
          <Badge variant="outline" className="font-semibold">{interestRate}</Badge>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">Max Loan:</span>
          <Badge variant="outline" className="font-semibold">{maxLoanAmount}</Badge>
        </div>
      </div>
      
      <Button className="w-full bg-finance-teal hover:bg-finance-teal/90">Apply Now</Button>
    </div>
  );
};

export default BankRecommendation;
