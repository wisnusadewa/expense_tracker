import { AuthProvider } from '@/context/AuthContext';
import { createClient } from '@/lib/supabase/server';
import type { Metadata } from 'next';
import { ThemeProvider } from 'next-themes';
import { Geist } from 'next/font/google';
import { Toaster } from 'sonner';
import './globals.css';
import Providers from './providers/providers';

const defaultUrl = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000';

export const metadata: Metadata = {
  metadataBase: new URL(defaultUrl),
  title: 'Expense Tracker',
  description: 'Tracking your expenses',
};

const geistSans = Geist({
  variable: '--font-geist-sans',
  display: 'swap',
  subsets: ['latin'],
});

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  let profile = null;

  if (user) {
    const { data, error } = await supabase.from('profiles').select('*').eq('id', user.id).single();

    if (error) {
      console.error('Error fetching profile:', error.message);
    } else {
      profile = data;
    }
  }

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.className} antialiased`}>
        <Providers>
          <AuthProvider user={profile}>
            <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
              {children}
              <Toaster />
            </ThemeProvider>
          </AuthProvider>
        </Providers>
      </body>
    </html>
  );
}
