export const metadata = {
  title: 'Verify',
  description: 'Verify the OTP code',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
