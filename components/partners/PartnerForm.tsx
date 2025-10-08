"use client";

import { useState } from 'react';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Label } from '@/components/ui/Label';
import { Checkbox } from '@/components/ui/Checkbox';
import { Button } from '@/components/ui/Button';
import { submitPartnerLead, type PartnerLeadData } from '@/lib/partner-api';

interface PartnerFormProps {
  variant: 'referral-partner' | 'partner-opportunity';
  title: string;
  description?: string;
}

export default function PartnerForm({ variant, title, description }: PartnerFormProps) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState<PartnerLeadData>({
    firstName: '',
    lastName: '',
    email: '',
    company: '',
    role: '',
    website: '',
    message: '',
    formType: variant,
    consent: false,
  });

  const update = (field: keyof PartnerLeadData, value: string | boolean) => {
    setForm((f) => ({ ...f, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    // Minimal validation
    if (!form.firstName || !form.lastName || !form.email || !form.company || !form.consent) {
      setError('Please complete required fields and accept the privacy terms.');
      setLoading(false);
      return;
    }
    try {
      const res = await submitPartnerLead(form);
      if (res.success) {
        setSuccess('Thanks! We received your submission and will be in touch.');
        setForm({ ...form, message: '', website: '' });
      } else {
        setError(res.message || 'Submission failed. Please try again.');
      }
    } catch (err: any) {
      setError(err?.message || 'Submission error.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      <h3 className="mb-1 text-xl font-semibold">{title}</h3>
      {description && <p className="mb-4 text-gray-600">{description}</p>}

      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <Label htmlFor={`firstName-${variant}`}>First Name</Label>
          <Input id={`firstName-${variant}`} value={form.firstName} onChange={(e) => update('firstName', e.target.value)} required />
        </div>
        <div>
          <Label htmlFor={`lastName-${variant}`}>Last Name</Label>
          <Input id={`lastName-${variant}`} value={form.lastName} onChange={(e) => update('lastName', e.target.value)} required />
        </div>
        <div>
          <Label htmlFor={`email-${variant}`}>Email</Label>
          <Input id={`email-${variant}`} type="email" value={form.email} onChange={(e) => update('email', e.target.value)} required />
        </div>
        <div>
          <Label htmlFor={`company-${variant}`}>Company</Label>
          <Input id={`company-${variant}`} value={form.company} onChange={(e) => update('company', e.target.value)} required />
        </div>
        <div>
          <Label htmlFor={`role-${variant}`}>Role/Title (optional)</Label>
          <Input id={`role-${variant}`} value={form.role || ''} onChange={(e) => update('role', e.target.value)} />
        </div>
        <div>
          <Label htmlFor={`website-${variant}`}>Website (optional)</Label>
          <Input id={`website-${variant}`} value={form.website || ''} onChange={(e) => update('website', e.target.value)} />
        </div>
        <div className="md:col-span-2">
          <Label htmlFor={`message-${variant}`}>Message</Label>
          <Textarea id={`message-${variant}`} rows={4} value={form.message || ''} onChange={(e) => update('message', e.target.value)} />
        </div>
      </div>

      <div className="mt-4 flex items-center gap-2">
        <Checkbox id={`consent-${variant}`} checked={form.consent} onCheckedChange={(v) => update('consent', !!v)} />
        <Label htmlFor={`consent-${variant}`} className="text-sm text-gray-700">
          I agree to the processing of my information per the Privacy Policy.
        </Label>
      </div>

      {error && <p className="mt-3 text-sm font-medium text-red-600" role="alert">{error}</p>}
      {success && <p className="mt-3 text-sm font-medium text-green-700" role="status">{success}</p>}

      <div className="mt-4">
        <Button type="submit" disabled={loading}>
          {loading ? 'Submitting...' : 'Submit'}
        </Button>
      </div>
    </form>
  );
}

