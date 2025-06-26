import React from 'react';
import { Check, Circle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Step {
  id: number;
  title: string;
  description: string;
}

interface StepProgressProps {
  currentStep: number;
  steps: Step[];
  className?: string;
}

export const StepProgress: React.FC<StepProgressProps> = ({
  currentStep,
  steps,
  className,
}) => {
  return (
    <div className={cn("w-full", className)}>
      <div className="flex items-center justify-between mb-8">
        {steps.map((step, index) => {
          const stepNumber = index + 1;
          const isCompleted = stepNumber < currentStep;
          const isCurrent = stepNumber === currentStep;
          const isUpcoming = stepNumber > currentStep;

          return (
            <React.Fragment key={step.id}>
              <div className="flex flex-col items-center space-y-2">
                <div
                  className={cn(
                    "relative flex items-center justify-center w-12 h-12 rounded-full border-2 transition-all duration-300",
                    {
                      "bg-gradient-to-r from-emerald-500 to-teal-500 border-emerald-500 text-white shadow-lg glow": isCompleted,
                      "bg-gradient-to-r from-blue-500 to-purple-500 border-blue-500 text-white shadow-lg glow": isCurrent,
                      "bg-slate-800 border-slate-600 text-slate-400": isUpcoming,
                    }
                  )}
                >
                  {isCompleted ? (
                    <Check className="w-6 h-6" />
                  ) : (
                    <Circle className={cn("w-6 h-6", {
                      "fill-current": isCurrent,
                    })} />
                  )}
                  
                  {isCurrent && (
                    <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 animate-pulse opacity-75" />
                  )}
                </div>
                
                <div className="text-center max-w-[120px]">
                  <h3
                    className={cn(
                      "text-sm font-semibold transition-colors duration-300",
                      {
                        "text-emerald-400": isCompleted,
                        "text-blue-400": isCurrent,
                        "text-slate-500": isUpcoming,
                      }
                    )}
                  >
                    {step.title}
                  </h3>
                  <p
                    className={cn(
                      "text-xs transition-colors duration-300",
                      {
                        "text-emerald-300/80": isCompleted,
                        "text-blue-300/80": isCurrent,
                        "text-slate-600": isUpcoming,
                      }
                    )}
                  >
                    {step.description}
                  </p>
                </div>
              </div>
              
              {index < steps.length - 1 && (
                <div className="flex-1 mx-4">
                  <div
                    className={cn(
                      "h-0.5 transition-all duration-500",
                      {
                        "bg-gradient-to-r from-emerald-500 to-teal-500": stepNumber < currentStep,
                        "bg-gradient-to-r from-blue-500 to-purple-500": stepNumber === currentStep,
                        "bg-slate-700": stepNumber >= currentStep,
                      }
                    )}
                  />
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};