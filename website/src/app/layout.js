import './globals.css'

export const metadata = {
  title: 'I.Q.R.A - Intelligent Quick-Response Arboretum',
  description: 'Sistem Informasi Digital Pohon - Belajar tentang pohon melalui teknologi QR Code',
}

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body>{children}</body>
    </html>
  )
}
