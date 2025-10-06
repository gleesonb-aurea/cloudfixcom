import { Check } from 'lucide-react';

interface Step {
  id: number;
  title: string;
  description: string;
}

interface StepIndicatorProps {
  steps: Step[];
  currentStep: number;
  onStepClick: (stepId: number) => void;
}

export function StepIndicator({ steps, currentStep, onStepClick }: StepIndicatorProps) {
  return (
    <div className="px-8 pb-8">
      <div className="relative">
        {/* Progress Line */}
        <div className="absolute top-5 left-0 right-0 h-0.5 bg-gray-200">
          <div
            className="h-full bg-primary-dark transition-all duration-300"
            style={{
              width: `${((currentStep - 1) / (steps.length - 1)) * 100}%`,
            }}
          />
        </div>

        {/* Steps */}
        <div className="relative flex justify-between">
          {steps.map((step) => {
            const isCompleted = step.id < currentStep;
            const isCurrent = step.id === currentStep;
            const isUpcoming = step.id > currentStep;

            return (
              <div
                key={step.id}
                className="flex flex-col items-center cursor-pointer group"
                onClick={() => onStepClick(step.id)}
              >
                {/* Step Circle */}
                <div
                  className={`
                    w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold
                    transition-all duration-200 z-10 relative
                    ${isCompleted
                      ? 'bg-primary-dark text-white'
                      : isCurrent
                      ? 'bg-primary-dark text-white ring-4 ring-primary/20'
                      : 'bg-gray-200 text-gray-500 group-hover:bg-gray-300'
                    }
                  `}
                >
                  {isCompleted ? (
                    <Check className="w-5 h-5" />
                  ) : (
                    step.id
                  )}
                </div>

                {/* Step Title */}
                <div className="mt-3 text-center">
                  <h3
                    className={`
                      font-medium text-sm
                      ${isCurrent ? 'text-gray-900' : isCompleted ? 'text-gray-900' : 'text-gray-500'}
                    `}
                  >
                    {step.title}
                  </h3>
                  <p
                    className={`
                      text-xs mt-1 hidden sm:block
                      ${isCurrent ? 'text-gray-600' : 'text-gray-400'}
                    `}
                  >
                    {step.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
