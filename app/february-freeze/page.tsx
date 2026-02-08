import { redirect } from 'next/navigation';

export default function FebruaryFreezePDF() {
  return (
    <iframe
      src="/results/February Freeze 2.7.2026 Results.pdf"
      width="100%"
      height="100%"
      style={{ border: 'none' }}
      title="February Freeze 2.7.2026 Results"
    />
  );
}