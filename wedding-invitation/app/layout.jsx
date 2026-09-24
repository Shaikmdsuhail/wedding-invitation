import './globals.css';

export const metadata = {
  title: 'Heena & Rouf — Wedding Invitation',
  description: 'A cinematic multilingual wedding invitation.'
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
