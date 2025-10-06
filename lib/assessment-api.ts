import { AssessmentData } from '@/lib/validations/assessment';

interface SubmissionResult {
  success: boolean;
  message?: string;
  data?: any;
}

/**
 * Submit assessment data to webhook endpoint
 */
export async function submitAssessment(data: AssessmentData): Promise<SubmissionResult> {
  try {
    const webhookUrl = process.env.NEXT_PUBLIC_ASSESSMENT_WEBHOOK_URL || 'https://hooks.zapier.com/hooks/catch/1234567/abcdefg';

    // Prepare payload with metadata
    const payload = {
      ...data,
      submittedAt: new Date().toISOString(),
      source: 'cloudfix-assessment-form',
      userAgent: typeof window !== 'undefined' ? window.navigator.userAgent : undefined,
      referrer: typeof document !== 'undefined' ? document.referrer : undefined,
    };

    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // Add any required authentication headers
        // 'Authorization': `Bearer ${process.env.WEBHOOK_API_KEY}`,
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();

    // Also store in local storage for debugging
    if (typeof window !== 'undefined') {
      const submissions = JSON.parse(localStorage.getItem('assessment_submissions') || '[]');
      submissions.push({
        ...payload,
        timestamp: Date.now(),
        status: 'submitted',
      });
      // Keep only last 5 submissions
      submissions.splice(0, Math.max(0, submissions.length - 5));
      localStorage.setItem('assessment_submissions', JSON.stringify(submissions));
    }

    return {
      success: true,
      message: 'Assessment submitted successfully',
      data: result,
    };

  } catch (error) {
    console.error('Assessment submission error:', error);

    // Fallback: Store in localStorage for manual processing
    if (typeof window !== 'undefined') {
      const fallbackSubmissions = JSON.parse(localStorage.getItem('assessment_fallback_submissions') || '[]');
      fallbackSubmissions.push({
        ...data,
        submittedAt: new Date().toISOString(),
        error: error instanceof Error ? error.message : 'Unknown error',
        timestamp: Date.now(),
      });
      localStorage.setItem('assessment_fallback_submissions', JSON.stringify(fallbackSubmissions));
    }

    return {
      success: false,
      message: error instanceof Error ? error.message : 'Failed to submit assessment',
    };
  }
}

/**
 * Get recent submissions from localStorage (for debugging)
 */
export function getRecentSubmissions() {
  if (typeof window === 'undefined') return [];

  return {
    successful: JSON.parse(localStorage.getItem('assessment_submissions') || '[]'),
    fallback: JSON.parse(localStorage.getItem('assessment_fallback_submissions') || '[]'),
  };
}

/**
 * Validate assessment data before submission
 */
export function validateAssessmentData(data: Partial<AssessmentData>): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];

  // Required fields validation
  if (!data.companyName?.trim()) errors.push('Company name is required');
  if (!data.industry) errors.push('Industry is required');
  if (!data.companySize) errors.push('Company size is required');
  if (!data.role) errors.push('Role is required');
  if (!data.currentChallenges?.length) errors.push('At least one challenge must be selected');

  if (!data.monthlySpend) errors.push('Monthly spend is required');
  if (!data.primaryServices?.length) errors.push('At least one AWS service must be selected');
  if (!data.usageDuration) errors.push('Usage duration is required');
  if (!data.optimizationEfforts) errors.push('Optimization efforts status is required');
  if (!data.painPoints?.length) errors.push('At least one pain point must be selected');
  if (!data.savingsGoals) errors.push('Savings goal is required');

  if (!data.firstName?.trim()) errors.push('First name is required');
  if (!data.lastName?.trim()) errors.push('Last name is required');
  if (!data.email?.trim()) errors.push('Email is required');
  if (!data.phone?.trim()) errors.push('Phone number is required');
  if (!data.consent) errors.push('Consent is required');

  // Email format validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (data.email && !emailRegex.test(data.email)) {
    errors.push('Invalid email format');
  }

  // Phone number validation (basic)
  const phoneRegex = /^[\d\s\-\+\(\)]+$/;
  if (data.phone && !phoneRegex.test(data.phone)) {
    errors.push('Invalid phone number format');
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}
