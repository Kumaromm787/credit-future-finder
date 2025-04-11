
import Layout from '@/components/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, BarChart2, Award, Shield, Database } from 'lucide-react';

const About = () => {
  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <section className="mb-12 text-center">
          <h1 className="text-4xl font-bold mb-4 gradient-heading">About Loan Predictor</h1>
          <p className="text-xl text-finance-darkGray">
            Using advanced machine learning to make loan decisions smarter and easier
          </p>
        </section>

        <section className="mb-12">
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-2xl">Our Technology</CardTitle>
              <CardDescription>How we predict loan approvals</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                Loan Predictor uses the powerful XGBoost (Extreme Gradient Boosting) algorithm, a state-of-the-art 
                machine learning technique that excels at predicting outcomes based on multiple factors.
              </p>
              <p>
                Our model has been trained on thousands of historical loan applications, learning patterns that 
                determine approval or rejection. It considers factors such as:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Credit score and history</li>
                <li>Income and employment stability</li>
                <li>Debt-to-income ratio</li>
                <li>Loan amount and terms</li>
                <li>Existing financial obligations</li>
                <li>Education and demographic information</li>
              </ul>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center gap-4">
                <Shield className="h-8 w-8 text-finance-teal" />
                <div>
                  <CardTitle>Privacy First</CardTitle>
                  <CardDescription>Your data is secure</CardDescription>
                </div>
              </CardHeader>
              <CardContent>
                <p>
                  We never store your personal financial information. All predictions are made in real-time and 
                  no sensitive data is saved on our servers.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center gap-4">
                <BarChart2 className="h-8 w-8 text-finance-teal" />
                <div>
                  <CardTitle>Advanced Analytics</CardTitle>
                  <CardDescription>Sophisticated prediction model</CardDescription>
                </div>
              </CardHeader>
              <CardContent>
                <p>
                  Our XGBoost model delivers over 90% accuracy in predicting loan approvals, helping you understand 
                  your chances before you apply.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center gap-4">
                <Database className="h-8 w-8 text-finance-teal" />
                <div>
                  <CardTitle>Data-Driven</CardTitle>
                  <CardDescription>Trained on real loan data</CardDescription>
                </div>
              </CardHeader>
              <CardContent>
                <p>
                  Our model is continuously trained and updated using anonymized real-world loan application data to
                  ensure accurate predictions across various financial scenarios.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center gap-4">
                <Award className="h-8 w-8 text-finance-teal" />
                <div>
                  <CardTitle>Bank Matching</CardTitle>
                  <CardDescription>Find your best options</CardDescription>
                </div>
              </CardHeader>
              <CardContent>
                <p>
                  Beyond prediction, we match you with banking institutions most likely to approve your loan and 
                  offer favorable terms based on your unique financial profile.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="mb-12 text-center">
          <p className="text-lg text-finance-darkGray mb-4">
            Ready to check your loan eligibility?
          </p>
          <a 
            href="/" 
            className="inline-flex items-center bg-finance-blue hover:bg-finance-blue/90 text-white px-6 py-3 rounded-md transition-colors"
          >
            Get Started Now <ArrowRight className="ml-2 h-4 w-4" />
          </a>
        </section>
      </div>
    </Layout>
  );
};

export default About;
