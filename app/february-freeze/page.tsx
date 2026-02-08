export default function FebruaryFreezePDF() {
  return (
    <div style={{ height: '80vh', width: '100vw' }}>
      <div style={{ textAlign: 'center', margin: '8px 0', fontSize: 14 }}>
        If the PDF appears zoomed in, use your browser’s zoom or pinch to zoom out.
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