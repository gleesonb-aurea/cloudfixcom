import { UseFormReturn } from 'react-hook-form';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/Form';
import { Select, SelectTrigger } from '@/components/ui/Select';
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
                <Select.Value placeholder="Select monthly spend range" />
              </Select.Trigger>
              <Select.Content>
                {spendRanges.map((range) => (
                  <Select.Item key={range} value={range}>
                    {range}
                  </Select.Item>
                ))}
              </Select.Content>
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
                  <Select.Value placeholder="Select duration" />
                </Select.Trigger>
                <Select.Content>
                  {usageDurations.map((duration) => (
                    <Select.Item key={duration} value={duration}>
                      {duration}
                    </Select.Item>
                  ))}
                </Select.Content>
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
                  <Select.Value placeholder="Select status" />
                </Select.Trigger>
                <Select.Content>
                  {optimizationStatuses.map((status) => (
                    <Select.Item key={status} value={status}>
                      {status}
                    </Select.Item>
                  ))}
                </Select.Content>
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
                <Select.Value placeholder="Select savings goal" />
              </Select.Trigger>
              <Select.Content>
                {savingsGoals.map((goal) => (
                  <Select.Item key={goal} value={goal}>
                    {goal}
                  </Select.Item>
                ))}
              </Select.Content>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
