import './style.css';
export default function FebruaryFreezePDF() {
  return (
    <div style={{ height: '1000px', width: '100vw' }}>
      <div className="mobile-zoom-tip">
        If the PDF appears too small or large, pinch to zoom in or out.
      </div>
      <iframe
        src="/results/February Freeze 2.7.2026 Results.pdf"
        width="100%"
        height="100%"
        style={{ border: 'none' }}
        title="February Freeze 2.7.2026 Results"
      />
    </div>
  );
}