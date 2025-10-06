'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { StepIndicator } from './StepIndicator';
import { CompanyInfoStep } from './steps/CompanyInfoStep';
import { AWSUsageStep } from './steps/AWSUsageStep';
import { ContactInfoStep } from './steps/ContactInfoStep';
import { FormSummary } from './FormSummary';
import { submitAssessment } from '@/lib/assessment-api';
import { Button } from '@/components/ui/Button';
import { AlertCircle, CheckCircle, Loader2 } from 'lucide-react';
import { assessmentSchema, type AssessmentData } from '@/lib/validations/assessment';

const STEPS = [
  { id: 1, title: 'Company Info', description: 'Tell us about your organization' },
  { id: 2, title: 'AWS Usage', description: 'Share your AWS infrastructure details' },
  { id: 3, title: 'Contact Info', description: 'How can we reach you?' },
];

export function AssessmentForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<AssessmentData>>({});

  const form = useForm<AssessmentData>({
    resolver: zodResolver(assessmentSchema),
    mode: 'onChange',
    defaultValues: {
      currentChallenges: [],
      primaryServices: [],
      monitoringTools: [],
      painPoints: [],
      consent: false,
    },
  });

  const currentStepData = STEPS.find(step => step.id === currentStep);

  const handleNext = async () => {
    let isValid = false;

    if (currentStep === 1) {
      isValid = await form.trigger(['companyName', 'industry', 'companySize', 'role', 'currentChallenges']);
    } else if (currentStep === 2) {
      isValid = await form.trigger(['monthlySpend', 'primaryServices', 'usageDuration', 'optimizationEfforts', 'painPoints', 'savingsGoals']);
    } else if (currentStep === 3) {
      isValid = await form.trigger(['firstName', 'lastName', 'email', 'phone', 'consent']);
    }

    if (isValid && currentStep < STEPS.length) {
      // Save current step data
      const currentValues = form.getValues();
      setFormData(prev => ({ ...prev, ...currentValues }));
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleStepClick = (stepId: number) => {
    // Only allow navigating to previous steps or the next step if current is valid
    if (stepId < currentStep) {
      setCurrentStep(stepId);
    } else if (stepId === currentStep + 1) {
      handleNext();
    }
  };

  const handleSubmit = async (data: AssessmentData) => {
    setIsSubmitting(true);
    setSubmitStatus('idle');
    setSubmitError(null);

    try {
      const result = await submitAssessment(data);

      if (result.success) {
        setSubmitStatus('success');
        // Track conversion event
        if (typeof window !== 'undefined' && (window as any).gtag) {
          (window as any).gtag('event', 'assessment_submitted', {
            event_category: 'conversion',
            event_label: 'assessment_form',
          });
        }
      } else {
        throw new Error(result.message || 'Submission failed');
      }
    } catch (error) {
      setSubmitStatus('error');
      setSubmitError(error instanceof Error ? error.message : 'An unexpected error occurred');
      console.error('Assessment submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <CompanyInfoStep form={form} />;
      case 2:
        return <AWSUsageStep form={form} />;
      case 3:
        return <ContactInfoStep form={form} />;
      default:
        return null;
    }
  };

  if (submitStatus === 'success') {
    return (
      <div className="p-8 lg:p-12 text-center">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-10 h-10 text-green-600" />
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Thank You! Assessment Received.
        </h2>
        <p className="text-xl text-gray-600 mb-8">
          We're analyzing your AWS infrastructure and will send your comprehensive assessment report within 24 hours.
        </p>
        <div className="bg-gray-50 rounded-xl p-6 mb-8 text-left max-w-2xl mx-auto">
          <h3 className="font-semibold text-gray-900 mb-4">What happens next:</h3>
          <ul className="space-y-3 text-gray-600">
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
              <span>Our AWS experts will analyze your submission</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
              <span>You'll receive a detailed report with cost-saving opportunities</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
              <span>Optional follow-up call to discuss implementation</span>
            </li>
          </ul>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            onClick={() => window.location.href = '/'}
            variant="outline"
            className="w-full sm:w-auto"
          >
            Return to Homepage
          </Button>
          <Button
            onClick={() => window.location.href = '/contact'}
            className="w-full sm:w-auto"
          >
            Schedule a Consultation
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div id="assessment-form">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary to-secondary text-white p-8 lg:p-12">
        <h1 className="text-2xl lg:text-3xl font-bold mb-4">
          AWS Cost Optimization Assessment
        </h1>
        <p className="text-white/80">
          Complete this 3-step assessment to receive your free optimization report.
        </p>
      </div>

      {/* Step Indicator */}
      <StepIndicator
        steps={STEPS}
        currentStep={currentStep}
        onStepClick={handleStepClick}
      />

      {/* Form Content */}
      <form onSubmit={form.handleSubmit(handleSubmit)} className="p-8 lg:p-12">
        {submitStatus === 'error' && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
            <div>
              <h3 className="font-semibold text-red-900 mb-1">Submission Error</h3>
              <p className="text-red-700 text-sm">
                {submitError || 'There was an error submitting your assessment. Please try again.'}
              </p>
            </div>
          </div>
        )}

        {/* Current Step */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Step {currentStep}: {currentStepData?.title}
          </h2>
          <p className="text-gray-600">{currentStepData?.description}</p>
        </div>

        {renderStep()}

        {/* Form Summary for final step */}
        {currentStep === 3 && (
          <div className="mt-8 pt-8 border-t border-gray-200">
            <FormSummary data={form.getValues()} />
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex justify-between items-center mt-12">
          <Button
            type="button"
            variant="outline"
            onClick={handlePrevious}
            disabled={currentStep === 1 || isSubmitting}
            className="flex items-center gap-2"
          >
            Previous
          </Button>

          {currentStep < STEPS.length ? (
            <Button
              type="button"
              onClick={handleNext}
              disabled={isSubmitting}
              className="flex items-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Validating...
                </>
              ) : (
                <>
                  Next Step
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </>
              )}
            </Button>
          ) : (
            <Button
              type="submit"
              disabled={isSubmitting || !form.formState.isValid}
              className="flex items-center gap-2 px-8"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Submitting Assessment...
                </>
              ) : (
                'Complete Assessment'
              )}
            </Button>
          )}
        </div>

        {/* Privacy Note */}
        <div className="mt-8 p-4 bg-gray-50 rounded-xl">
          <p className="text-sm text-gray-600 text-center">
            <span className="font-medium">Privacy Notice:</span> Your information is secure and will never be shared.
            We're SOC 2 Type II certified and GDPR compliant.
          </p>
        </div>
      </form>
    </div>
  );
}
