
import { useState } from 'react';
import Layout from '@/components/Layout';
import LoanForm, { LoanFormData } from '@/components/LoanForm';
import PredictionResult from '@/components/PredictionResult';
import HowItWorks from '@/components/HowItWorks';
import CurrencyConverter from '@/components/CurrencyConverter';
import { toast } from "sonner";
import { Calculator } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Index = () => {
  const [prediction, setPrediction] = useState<null | {
    approved: boolean;
    probability: number;
    riskScore: number;
  }>(null);
  
  const [submittedFormData, setSubmittedFormData] = useState<null | LoanFormData>(null);

  const handleFormSubmit = (formData: LoanFormData) => {
    console.log("Form data submitted:", formData);
    
    toast.loading("Calculating loan prediction...");
    
    setTimeout(() => {
      const mockPrediction = generateMockPrediction(formData);
      
      setPrediction(mockPrediction);
      setSubmittedFormData(formData);
      
      toast.dismiss();
      toast.success("Prediction complete!");
    }, 1500);
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <section className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 gradient-heading">Loan Predictor AI</h1>
          <p className="text-xl text-finance-darkGray mb-6">
            Find out if you'll qualify for a loan and discover your best bank options
          </p>
          <div className="inline-flex items-center bg-finance-lightBlue text-finance-blue px-4 py-2 rounded-full text-sm">
            <Calculator className="h-4 w-4 mr-2" />
            <span>Powered by XGBoost machine learning</span>
          </div>
        </section>

        <section className="mb-12">
          <Tabs defaultValue="loan-predictor" className="w-full">
            <TabsList className="grid grid-cols-2 mb-6">
              <TabsTrigger value="loan-predictor">Loan Predictor</TabsTrigger>
              <TabsTrigger value="currency-converter">Currency Converter</TabsTrigger>
            </TabsList>
            
            <TabsContent value="loan-predictor">
              {!prediction && <LoanForm onSubmit={handleFormSubmit} />}
              {prediction && submittedFormData && (
                <PredictionResult 
                  prediction={prediction}
                  formData={submittedFormData}
                />
              )}
            </TabsContent>
            
            <TabsContent value="currency-converter">
              <CurrencyConverter />
            </TabsContent>
          </Tabs>
        </section>

        <section className="mb-12">
          <HowItWorks />
        </section>
      </div>
    </Layout>
  );
};

function generateMockPrediction(formData: LoanFormData) {
  let probability = 0.5;
  
  if (formData.creditScore > 750) probability += 0.3;
  else if (formData.creditScore > 650) probability += 0.15;
  else if (formData.creditScore < 600) probability -= 0.2;
  
  // Adjusted income to loan ratio for INR values
  const incomeToLoanRatio = formData.income / formData.loanAmount;
  if (incomeToLoanRatio > 0.3) probability += 0.2;
  else if (incomeToLoanRatio < 0.15) probability -= 0.2;
  
  if (formData.employmentYears > 5) probability += 0.1;
  else if (formData.employmentYears < 1) probability -= 0.1;
  
  if (formData.existingLoans > 2) probability -= 0.15;
  
  if (formData.education === "graduate") probability += 0.05;
  
  // Adjust probability based on loan type
  switch (formData.loanType) {
    case "car":
      // Car loans are generally easier to get
      probability += 0.05;
      break;
    case "home":
      // Home loans have stricter requirements
      probability -= 0.02;
      break;
    case "education":
      // Education loans may have special considerations
      if (formData.age < 30) probability += 0.1;
      break;
    case "gold":
      // Gold loans are secured by collateral
      probability += 0.15;
      break;
    case "mortgage":
      // Mortgages have stricter requirements
      probability -= 0.05;
      if (formData.employmentYears > 3) probability += 0.07;
      break;
    default:
      break;
  }
  
  probability = Math.max(0, Math.min(1, probability));
  
  const riskScore = Math.round((1 - probability) * 100);
  
  return {
    approved: probability > 0.6,
    probability,
    riskScore
  };
}

export default Index;
