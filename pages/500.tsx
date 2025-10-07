// ABOUTME: Legacy pages router 500 fallback to satisfy Next export rename
export default function LegacyServerError() {
  return (
    <html>
      <body>
        <h1>500 - Server Error</h1>
        <p>An unexpected error occurred.</p>
      </body>
    </html>
  );
}

