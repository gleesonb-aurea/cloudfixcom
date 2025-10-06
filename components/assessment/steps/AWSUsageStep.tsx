import { UseFormReturn } from 'react-hook-form';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/Form';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/Select';
import { Checkbox } from '@/components/ui/Checkbox';
import { AssessmentData } from '@/lib/validations/assessment';

interface AWSUsageStepProps {
  form: UseFormReturn<AssessmentData>;
}

export function AWSUsageStep({ form }: AWSUsageStepProps) {
  const spendRanges = [
    'Less than $1,000/month',
    '$1,000 - $5,000/month',
    '$5,000 - $10,000/month',
    '$10,000 - $50,000/month',
    '$50,000 - $100,000/month',
    '$100,000 - $500,000/month',
    '$500,000+/month',
  ];

  const awsServices = [
    'EC2 (Compute)',
    'S3 (Storage)',
    'RDS (Database)',
    'Lambda (Serverless)',
    'EKS/ECS (Containers)',
    'CloudFront (CDN)',
    'VPC (Networking)',
    'ElastiCache',
    'DocumentDB',
    'Redshift',
    'Other',
  ];

  const usageDurations = [
    'Less than 6 months',
    '6 months - 1 year',
    '1-2 years',
    '2-5 years',
    '5+ years',
  ];

  const optimizationStatuses = [
    'No optimization efforts yet',
    'Basic cost monitoring',
    'Using AWS Cost Explorer',
    'Using third-party tools',
    'Advanced optimization program',
  ];

  const monitoringTools = [
    'AWS CloudWatch',
    'AWS Cost Explorer',
    'Datadog',
    'New Relic',
    'Grafana/Prometheus',
    'Custom monitoring',
    'None',
  ];

  const painPoints = [
    'Unexpected cost spikes',
    'Over-provisioned resources',
    'Idle resources',
    'Data transfer costs',
    'Storage costs growing',
    'Complex resource tagging',
    'Lack of visibility',
    'Other',
  ];

  const savingsGoals = [
    '10-20% reduction',
    '20-30% reduction',
    '30-50% reduction',
    '50%+ reduction',
    'Not sure, need assessment',
  ];

  return (
    <div className="space-y-6">
      <FormField
        control={form.control}
        name="monthlySpend"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Monthly AWS Spend *</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <SelectTrigger className="text-base">
                <SelectValue placeholder="Select monthly spend range" />
              </SelectTrigger>
              <SelectContent>
                {spendRanges.map((range) => (
                  <SelectItem key={range} value={range}>
                    {range}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="primaryServices"
        render={() => (
          <FormItem>
            <FormLabel>Primary AWS Services * (Select all that apply)</FormLabel>
            <div className="grid md:grid-cols-2 gap-3 mt-3">
              {awsServices.map((service) => (
                <FormField
                  key={service}
                  control={form.control}
                  name="primaryServices"
                  render={({ field }) => (
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value?.includes(service)}
                          onCheckedChange={(checked) => {
                            const updatedValue = checked
                              ? [...(field.value || []), service]
                              : field.value?.filter((item) => item !== service);
                            field.onChange(updatedValue);
                          }}
                        />
                      </FormControl>
                      <FormLabel className="text-sm font-normal text-gray-700">
                        {service}
                      </FormLabel>
                    </FormItem>
                  )}
                />
              ))}
            </div>
            <FormMessage />
          </FormItem>
        )}
      />

      <div className="grid md:grid-cols-2 gap-6">
        <FormField
          control={form.control}
          name="usageDuration"
          render={({ field }) => (
            <FormItem>
              <FormLabel>How long using AWS? *</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <SelectTrigger className="text-base">
                  <SelectValue placeholder="Select duration" />
                </SelectTrigger>
                <SelectContent>
                  {usageDurations.map((duration) => (
                    <SelectItem key={duration} value={duration}>
                      {duration}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="optimizationEfforts"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Current optimization efforts *</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <SelectTrigger className="text-base">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  {optimizationStatuses.map((status) => (
                    <SelectItem key={status} value={status}>
                      {status}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <FormField
        control={form.control}
        name="monitoringTools"
        render={() => (
          <FormItem>
            <FormLabel>Monitoring Tools (Select all that apply)</FormLabel>
            <div className="grid md:grid-cols-2 gap-3 mt-3">
              {monitoringTools.map((tool) => (
                <FormField
                  key={tool}
                  control={form.control}
                  name="monitoringTools"
                  render={({ field }) => (
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value?.includes(tool)}
                          onCheckedChange={(checked) => {
                            const updatedValue = checked
                              ? [...(field.value || []), tool]
                              : field.value?.filter((item) => item !== tool);
                            field.onChange(updatedValue);
                          }}
                        />
                      </FormControl>
                      <FormLabel className="text-sm font-normal text-gray-700">
                        {tool}
                      </FormLabel>
                    </FormItem>
                  )}
                />
              ))}
            </div>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="painPoints"
        render={() => (
          <FormItem>
            <FormLabel>Main Pain Points * (Select all that apply)</FormLabel>
            <div className="grid md:grid-cols-2 gap-3 mt-3">
              {painPoints.map((point) => (
                <FormField
                  key={point}
                  control={form.control}
                  name="painPoints"
                  render={({ field }) => (
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value?.includes(point)}
                          onCheckedChange={(checked) => {
                            const updatedValue = checked
                              ? [...(field.value || []), point]
                              : field.value?.filter((item) => item !== point);
                            field.onChange(updatedValue);
                          }}
                        />
                      </FormControl>
                      <FormLabel className="text-sm font-normal text-gray-700">
                        {point}
                      </FormLabel>
                    </FormItem>
                  )}
                />
              ))}
            </div>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="savingsGoals"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Target Cost Savings *</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <SelectTrigger className="text-base">
                <SelectValue placeholder="Select savings goal" />
              </SelectTrigger>
              <SelectContent>
                {savingsGoals.map((goal) => (
                  <SelectItem key={goal} value={goal}>
                    {goal}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
