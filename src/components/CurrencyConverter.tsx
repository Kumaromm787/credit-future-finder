
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { DollarSign, IndianRupee, ArrowRight } from 'lucide-react';

const CurrencyConverter = () => {
  const [amount, setAmount] = useState<number>(1);
  const [convertedAmount, setConvertedAmount] = useState<number | null>(null);
  const [exchangeRate, setExchangeRate] = useState<number>(83.5); // Default exchange rate
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleConvert = () => {
    if (amount <= 0) {
      toast.error("Please enter a valid amount");
      return;
    }

    setIsLoading(true);
    
    // Simulate API call with timeout
    setTimeout(() => {
      const result = amount * exchangeRate;
      setConvertedAmount(result);
      setIsLoading(false);
      toast.success("Currency converted successfully");
    }, 800);
  };

  // This would ideally fetch the latest exchange rate from an API
  useEffect(() => {
    // For demo purposes, we're using a fixed exchange rate
    // In a real application, you would fetch this from an API
    const mockFetchExchangeRate = () => {
      // Slightly randomize the exchange rate for demo purposes
      const baseRate = 83.5;
      const variance = (Math.random() * 0.5) - 0.25; // +/- 0.25
      return baseRate + variance;
    };
    
    setExchangeRate(mockFetchExchangeRate());
  }, []);

  return (
    <div className="form-card animate-fade-in">
      <h2 className="text-2xl font-bold mb-6 gradient-heading">Currency Converter</h2>
      <p className="text-finance-darkGray mb-6">Convert US Dollars (USD) to Indian Rupees (INR)</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <Label htmlFor="usdAmount">USD Amount</Label>
            <div className="relative mt-1">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <DollarSign className="h-5 w-5 text-finance-darkGray" />
              </div>
              <Input
                id="usdAmount"
                type="number"
                value={amount}
                onChange={(e) => setAmount(parseFloat(e.target.value) || 0)}
                className="pl-10"
                min="0.01"
                step="0.01"
              />
            </div>
          </div>
        </div>
        
        <div className="space-y-4">
          <div>
            <Label htmlFor="inrAmount">INR Amount</Label>
            <div className="relative mt-1">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <IndianRupee className="h-5 w-5 text-finance-darkGray" />
              </div>
              <Input
                id="inrAmount"
                type="number"
                value={convertedAmount !== null ? convertedAmount.toFixed(2) : ''}
                readOnly
                className="pl-10 bg-gray-50"
              />
            </div>
          </div>
        </div>
      </div>
      
      <div className="flex items-center justify-center my-6">
        <ArrowRight className="h-6 w-6 text-finance-blue" />
      </div>
      
      <div className="flex justify-center mt-4">
        <Button 
          onClick={handleConvert} 
          disabled={isLoading}
          className="bg-finance-blue hover:bg-finance-blue/90 text-white px-8 py-2 rounded-md transition-colors"
        >
          {isLoading ? "Converting..." : "Convert"}
        </Button>
      </div>
      
      {convertedAmount !== null && (
        <div className="mt-6 p-4 bg-finance-lightBlue rounded-lg text-center">
          <p className="text-finance-darkGray">Current Exchange Rate: 1 USD = {exchangeRate.toFixed(2)} INR</p>
          <p className="text-lg font-semibold mt-2">
            ${amount.toFixed(2)} = ₹{convertedAmount.toFixed(2)}
          </p>
        </div>
      )}
    </div>
  );
};

export default CurrencyConverter;
