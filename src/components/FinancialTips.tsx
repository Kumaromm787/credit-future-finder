
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { LightbulbIcon, Plus, Minus, Info } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { LoanFormData } from "./LoanForm";

interface FinancialTipsProps {
  formData: LoanFormData;
  riskScore: number;
}

const FinancialTips = ({ formData, riskScore }: FinancialTipsProps) => {
  const [isOpen, setIsOpen] = useState(false);
  
  // Generate tips based on form data and risk score
  const getTips = () => {
    const tips = [];

    if (formData.creditScore < 650) {
      tips.push({
        title: "Improve Your Credit Score",
        description: "Pay your bills on time, reduce outstanding debt, and check your credit report for errors."
      });
    }

    if (formData.existingLoans > 2) {
      tips.push({
        title: "Reduce Existing Debt",
        description: "Work on paying off some of your existing loans before applying for a new one."
      });
    }

    if (formData.income / formData.loanAmount < 0.15) {
      tips.push({
        title: "Increase Income to Loan Ratio",
        description: "Consider either a smaller loan amount or ways to increase your income before applying."
      });
    }

    if (formData.employmentYears < 2) {
      tips.push({
        title: "Stable Employment History",
        description: "Lenders prefer applicants with a stable job history of at least 2 years."
      });
    }

    // Add general tips if we don't have specific ones
    if (tips.length === 0) {
      tips.push({
        title: "Build an Emergency Fund",
        description: "Having 3-6 months of expenses saved shows financial responsibility to lenders."
      });
      tips.push({
        title: "Get a Co-Signer",
        description: "If eligible, having a co-signer with strong credit can improve your loan approval chances."
      });
    }

    return tips;
  };

  const tips = getTips();

  return (
    <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
      <Collapsible open={isOpen} onOpenChange={setIsOpen} className="space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-yellow-800">
            <LightbulbIcon className="h-5 w-5 text-yellow-600" />
            <h3 className="text-lg font-medium">Financial Improvement Tips</h3>
          </div>
          <CollapsibleTrigger asChild>
            <Button variant="ghost" size="sm" className="w-9 p-0">
              {isOpen ? 
                <Minus className="h-4 w-4 text-yellow-800" /> : 
                <Plus className="h-4 w-4 text-yellow-800" />
              }
              <span className="sr-only">Toggle</span>
            </Button>
          </CollapsibleTrigger>
        </div>
        
        <CollapsibleContent className="space-y-3 mt-2">
          <p className="text-sm text-yellow-800 flex items-center gap-1.5">
            <Info className="h-4 w-4" />
            Based on your profile, here are some suggestions to improve your financial standing:
          </p>
          
          <div className="space-y-3">
            {tips.map((tip, index) => (
              <div key={index} className="bg-white border border-yellow-100 rounded-md p-3">
                <h4 className="font-medium text-yellow-900">{tip.title}</h4>
                <p className="text-sm text-gray-600 mt-1">{tip.description}</p>
              </div>
            ))}
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
};

export default FinancialTips;
