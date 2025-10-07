// ABOUTME: Global head entries for resource hints
export default function Head() {
  // next/font self-hosts fonts, so no fonts preconnects are required here.
  return (
    <>
      <link rel="dns-prefetch" href="//www.googletagmanager.com" />
      <link rel="preconnect" href="https://www.googletagmanager.com" crossOrigin="" />
    </>
  );
}

