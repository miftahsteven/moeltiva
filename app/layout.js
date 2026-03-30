import 'bootstrap/dist/css/bootstrap.min.css';
import './globals.css';

export const metadata = {
  title: 'Moeltiva — Minuman Serbuk Ekstrak Alpukat | Hidup Sehat dari Alam',
  description: 'Moeltiva adalah minuman serbuk ekstrak alpukat premium untuk energi alami harianmu. 100% bahan alami, vegan friendly, tanpa pengawet. Made in Indonesia.',
  keywords: 'moeltiva, minuman alpukat, serbuk alpukat, minuman sehat, healthy drink, avocado powder drink',
  openGraph: {
    title: 'Moeltiva — Hidup Sehat dari Alam, Lebih Mudah.',
    description: 'Minuman serbuk ekstrak alpukat untuk energi alami harianmu.',
    type: 'website',
    url: 'https://moeltiva.id',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&family=Playfair+Display:ital,wght@0,600;0,700;1,600&display=swap"
          rel="stylesheet"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
