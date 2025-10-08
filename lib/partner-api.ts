export interface PartnerLeadData {
  firstName: string;
  lastName: string;
  email: string;
  company: string;
  role?: string;
  website?: string;
  message?: string;
  formType: 'referral-partner' | 'partner-opportunity';
  consent: boolean;
}

export interface PartnerSubmissionResult {
  success: boolean;
  message?: string;
  data?: any;
}

export async function submitPartnerLead(data: PartnerLeadData): Promise<PartnerSubmissionResult> {
  try {
    const webhookUrl = process.env.NEXT_PUBLIC_ASSESSMENT_WEBHOOK_URL || 'https://hooks.zapier.com/hooks/catch/1234567/abcdefg';

    const payload = {
      ...data,
      submittedAt: new Date().toISOString(),
      source: 'cloudfix-partner-form',
      userAgent: typeof window !== 'undefined' ? window.navigator.userAgent : undefined,
      referrer: typeof document !== 'undefined' ? document.referrer : undefined,
    };

    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

    const result = await response.json();

    if (typeof window !== 'undefined') {
      const submissions = JSON.parse(localStorage.getItem('partner_submissions') || '[]');
      submissions.push({ ...payload, timestamp: Date.now(), status: 'submitted' });
      submissions.splice(0, Math.max(0, submissions.length - 5));
      localStorage.setItem('partner_submissions', JSON.stringify(submissions));
    }

    return { success: true, message: 'Partner lead submitted', data: result };
  } catch (error) {
    console.error('Partner lead submission error:', error);
    if (typeof window !== 'undefined') {
      const fallback = JSON.parse(localStorage.getItem('partner_fallback_submissions') || '[]');
      fallback.push({ ...data, submittedAt: new Date().toISOString(), error: error instanceof Error ? error.message : 'Unknown error', timestamp: Date.now() });
      localStorage.setItem('partner_fallback_submissions', JSON.stringify(fallback));
    }
    return { success: false, message: error instanceof Error ? error.message : 'Failed to submit partner lead' };
  }
}

