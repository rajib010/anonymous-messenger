export const metadata = {
  title: 'Send Message',
  description: 'Send message anonymously to the user',
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
