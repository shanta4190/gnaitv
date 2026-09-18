import "./globals.css";

export const metadata = {
  title: "GNAITV",
  description: "Official GNAITV website built with Next.js",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
