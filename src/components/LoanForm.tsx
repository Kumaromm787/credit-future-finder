
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { toast } from "sonner";

type LoanFormProps = {
  onSubmit: (formData: LoanFormData) => void;
};

export type LoanFormData = {
  income: number;
  loanAmount: number;
  loanTerm: number;
  creditScore: number;
  employmentYears: number;
  age: number;
  education: string;
  maritalStatus: string;
  dependents: number;
  existingLoans: number;
};

const LoanForm = ({ onSubmit }: LoanFormProps) => {
  const [formData, setFormData] = useState<LoanFormData>({
    income: 50000,
    loanAmount: 200000,
    loanTerm: 15,
    creditScore: 700,
    employmentYears: 5,
    age: 30,
    education: "graduate",
    maritalStatus: "single",
    dependents: 0,
    existingLoans: 0,
  });

  const [sliderValues, setSliderValues] = useState({
    loanTerm: [15],
    creditScore: [700],
  });

  const handleInputChange = (field: keyof LoanFormData, value: number | string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleNumberInput = (field: keyof LoanFormData, value: string) => {
    const numValue = parseFloat(value);
    if (!isNaN(numValue)) {
      handleInputChange(field, numValue);
    }
  };

  const handleSliderChange = (field: 'loanTerm' | 'creditScore', value: number[]) => {
    setSliderValues((prev) => ({ ...prev, [field]: value }));
    handleInputChange(field, value[0]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (formData.income <= 0 || formData.loanAmount <= 0) {
      toast.error("Please enter valid income and loan amount values");
      return;
    }
    
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="form-card animate-fade-in">
      <h2 className="text-2xl font-bold mb-6 gradient-heading">Loan Details</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <Label htmlFor="income">Annual Income ($)</Label>
            <Input
              id="income"
              type="number"
              value={formData.income}
              onChange={(e) => handleNumberInput('income', e.target.value)}
              className="mt-1"
              min="0"
            />
          </div>

          <div>
            <Label htmlFor="loanAmount">Loan Amount ($)</Label>
            <Input
              id="loanAmount"
              type="number"
              value={formData.loanAmount}
              onChange={(e) => handleNumberInput('loanAmount', e.target.value)}
              className="mt-1"
              min="0"
            />
          </div>

          <div>
            <Label htmlFor="loanTerm">Loan Term (Years): {sliderValues.loanTerm[0]}</Label>
            <Slider
              id="loanTerm"
              min={1}
              max={30}
              step={1}
              value={sliderValues.loanTerm}
              onValueChange={(value) => handleSliderChange('loanTerm', value)}
              className="mt-2"
            />
          </div>

          <div>
            <Label htmlFor="creditScore">Credit Score: {sliderValues.creditScore[0]}</Label>
            <Slider
              id="creditScore"
              min={300}
              max={850}
              step={1}
              value={sliderValues.creditScore}
              onValueChange={(value) => handleSliderChange('creditScore', value)}
              className="mt-2"
            />
          </div>

          <div>
            <Label htmlFor="age">Age</Label>
            <Input
              id="age"
              type="number"
              value={formData.age}
              onChange={(e) => handleNumberInput('age', e.target.value)}
              className="mt-1"
              min="18"
              max="100"
            />
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <Label htmlFor="employmentYears">Years of Employment</Label>
            <Input
              id="employmentYears"
              type="number"
              value={formData.employmentYears}
              onChange={(e) => handleNumberInput('employmentYears', e.target.value)}
              className="mt-1"
              min="0"
            />
          </div>

          <div>
            <Label htmlFor="education">Education</Label>
            <Select
              value={formData.education}
              onValueChange={(value) => handleInputChange('education', value)}
            >
              <SelectTrigger className="mt-1">
                <SelectValue placeholder="Select education level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="graduate">Graduate</SelectItem>
                <SelectItem value="undergraduate">Undergraduate</SelectItem>
                <SelectItem value="high_school">High School</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="maritalStatus">Marital Status</Label>
            <Select
              value={formData.maritalStatus}
              onValueChange={(value) => handleInputChange('maritalStatus', value)}
            >
              <SelectTrigger className="mt-1">
                <SelectValue placeholder="Select marital status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="single">Single</SelectItem>
                <SelectItem value="married">Married</SelectItem>
                <SelectItem value="divorced">Divorced</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="dependents">Number of Dependents</Label>
            <Input
              id="dependents"
              type="number"
              value={formData.dependents}
              onChange={(e) => handleNumberInput('dependents', e.target.value)}
              className="mt-1"
              min="0"
            />
          </div>

          <div>
            <Label htmlFor="existingLoans">Number of Existing Loans</Label>
            <Input
              id="existingLoans"
              type="number"
              value={formData.existingLoans}
              onChange={(e) => handleNumberInput('existingLoans', e.target.value)}
              className="mt-1"
              min="0"
            />
          </div>
        </div>
      </div>

      <div className="mt-8 flex justify-center">
        <Button type="submit" className="bg-finance-blue hover:bg-finance-blue/90 text-white px-8 py-2 rounded-md transition-colors">
          Predict Loan Eligibility
        </Button>
      </div>
    </form>
  );
};

export default LoanForm;
