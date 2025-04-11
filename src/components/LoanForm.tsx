
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { toast } from "sonner";
import { IndianRupee, Car, Home, GraduationCap, Banknote, Landmark } from 'lucide-react';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

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
  loanType: string;
};

const LoanForm = ({ onSubmit }: LoanFormProps) => {
  const [formData, setFormData] = useState<LoanFormData>({
    income: 3500000, // Changed to equivalent in INR (approx)
    loanAmount: 15000000, // Changed to equivalent in INR (approx)
    loanTerm: 15,
    creditScore: 700,
    employmentYears: 5,
    age: 30,
    education: "graduate",
    maritalStatus: "single",
    dependents: 0,
    existingLoans: 0,
    loanType: "home",
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

  const getLoanIcon = (type: string) => {
    switch (type) {
      case "car": return <Car className="h-5 w-5" />;
      case "home": return <Home className="h-5 w-5" />;
      case "education": return <GraduationCap className="h-5 w-5" />;
      case "gold": return <Banknote className="h-5 w-5" />;
      case "mortgage": return <Landmark className="h-5 w-5" />;
      default: return <Home className="h-5 w-5" />;
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form-card animate-fade-in">
      <h2 className="text-2xl font-bold mb-6 gradient-heading">Loan Details</h2>
      
      <div className="mb-6">
        <Label className="text-lg mb-3 block">Loan Type</Label>
        <RadioGroup 
          value={formData.loanType} 
          onValueChange={(value) => handleInputChange('loanType', value)}
          className="grid grid-cols-2 md:grid-cols-5 gap-3"
        >
          {[
            {value: "home", label: "Home Loan", icon: <Home />},
            {value: "car", label: "Car Loan", icon: <Car />},
            {value: "education", label: "Education Loan", icon: <GraduationCap />},
            {value: "gold", label: "Gold Loan", icon: <Banknote />},
            {value: "mortgage", label: "Mortgage", icon: <Landmark />},
          ].map((option) => (
            <div key={option.value} className={`border rounded-lg p-3 cursor-pointer flex items-center gap-2 transition-all ${formData.loanType === option.value ? 'border-finance-teal bg-finance-lightBlue' : 'border-gray-200'}`}>
              <RadioGroupItem value={option.value} id={option.value} className="sr-only" />
              <label htmlFor={option.value} className="flex items-center gap-2 cursor-pointer w-full">
                {option.icon}
                <span>{option.label}</span>
              </label>
            </div>
          ))}
        </RadioGroup>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <Label htmlFor="income">Annual Income (₹)</Label>
            <div className="relative mt-1">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <IndianRupee className="h-5 w-5 text-finance-darkGray" />
              </div>
              <Input
                id="income"
                type="number"
                value={formData.income}
                onChange={(e) => handleNumberInput('income', e.target.value)}
                className="pl-10"
                min="0"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="loanAmount">Loan Amount (₹)</Label>
            <div className="relative mt-1">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <IndianRupee className="h-5 w-5 text-finance-darkGray" />
              </div>
              <Input
                id="loanAmount"
                type="number"
                value={formData.loanAmount}
                onChange={(e) => handleNumberInput('loanAmount', e.target.value)}
                className="pl-10"
                min="0"
              />
            </div>
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
