
import type { Metadata } from 'next';
import './globals.css';
import { Providers } from './providers';

export const metadata: Metadata = {
  title: 'Subcast Sentinel',
  description: 'Never miss a critical conversation. Track, alert, and replay Farcaster interactions.',
  icons: {
    icon: '/icon.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-bg text-primary antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
