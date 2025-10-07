'use client';

import React from 'react';
import { cn } from '@/lib/utils';

export default function RICalculator() {
  const [monthlySpend, setMonthlySpend] = React.useState<number>(50000);
  const [coverage, setCoverage] = React.useState<number>(60);
  const [discount, setDiscount] = React.useState<number>(35);

  const estSavings = Math.round((monthlySpend * (coverage / 100) * (discount / 100)));

  return (
    <div className={cn('rounded-2xl border border-gray-200 bg-white p-6 shadow-sm')}> 
      <h3 className="text-xl font-semibold text-gray-900 mb-4">Estimated RI Savings</h3>
      <div className="grid gap-4 md:grid-cols-3">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Current AWS Monthly Spend ($)</label>
          <input type="number" value={monthlySpend} onChange={(e) => setMonthlySpend(Number(e.target.value) || 0)} className="w-full rounded-lg border border-gray-300 px-3 py-2" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Target RI Coverage (%)</label>
          <input type="number" value={coverage} onChange={(e) => setCoverage(Number(e.target.value) || 0)} className="w-full rounded-lg border border-gray-300 px-3 py-2" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Expected RI Discount (%)</label>
          <input type="number" value={discount} onChange={(e) => setDiscount(Number(e.target.value) || 0)} className="w-full rounded-lg border border-gray-300 px-3 py-2" />
        </div>
      </div>
      <div className="mt-6 text-center">
        <div className="text-5xl font-bold text-primary">${estSavings.toLocaleString()}</div>
        <div className="text-gray-600">per month estimated savings</div>
      </div>
    </div>
  );
}

