import { AssessmentData } from '@/lib/validations/assessment';
import { Card, CardContent } from '@/components/ui/Card';

interface FormSummaryProps {
  data: Partial<AssessmentData>;
}

export function FormSummary({ data }: FormSummaryProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Review Your Information</h3>

      <div className="grid md:grid-cols-2 gap-4">
        <Card>
          <CardContent className="p-4">
            <h4 className="font-medium text-gray-900 mb-3">Company Information</h4>
            <dl className="space-y-2 text-sm">
              <div className="flex justify-between">
                <dt className="text-gray-600">Company:</dt>
                <dd className="font-medium text-gray-900">{data.companyName}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-gray-600">Industry:</dt>
                <dd className="font-medium text-gray-900">{data.industry}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-gray-600">Size:</dt>
                <dd className="font-medium text-gray-900">{data.companySize}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-gray-600">Your Role:</dt>
                <dd className="font-medium text-gray-900">{data.role}</dd>
              </div>
            </dl>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <h4 className="font-medium text-gray-900 mb-3">AWS Usage</h4>
            <dl className="space-y-2 text-sm">
              <div className="flex justify-between">
                <dt className="text-gray-600">Monthly Spend:</dt>
                <dd className="font-medium text-gray-900">{data.monthlySpend}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-gray-600">Usage Duration:</dt>
                <dd className="font-medium text-gray-900">{data.usageDuration}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-gray-600">Services Used:</dt>
                <dd className="font-medium text-gray-900">{data.primaryServices?.length || 0} services</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-gray-600">Savings Goal:</dt>
                <dd className="font-medium text-gray-900">{data.savingsGoals}</dd>
              </div>
            </dl>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardContent className="p-4">
            <h4 className="font-medium text-gray-900 mb-3">Contact Information</h4>
            <dl className="grid md:grid-cols-2 gap-4 text-sm">
              <div className="flex justify-between">
                <dt className="text-gray-600">Name:</dt>
                <dd className="font-medium text-gray-900">{data.firstName} {data.lastName}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-gray-600">Email:</dt>
                <dd className="font-medium text-gray-900">{data.email}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-gray-600">Phone:</dt>
                <dd className="font-medium text-gray-900">{data.phone}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-gray-600">Consent:</dt>
                <dd className="font-medium text-gray-900">
                  {data.consent ? '✓ Yes' : '✗ No'}
                </dd>
              </div>
            </dl>
          </CardContent>
        </Card>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
        <p className="text-sm text-blue-800">
          <strong>Next Step:</strong> Click "Complete Assessment" to submit your information.
          You'll receive your comprehensive report within 24 hours.
        </p>
      </div>
    </div>
  );
}