import "./globals.css";
import Link from "next/link";

export const metadata = {
  title: "GNAI TV",
  description: "GNAI TV website, weather, and earthquake simulation baseline",
};

const links = [
  ["/", "Home"],
  ["/watch", "Watch"],
  ["/channels", "Channels"],
  ["/weather", "Weather"],
  ["/weather/live", "Weather Live"],
  ["/earthquake", "Earthquake"],
  ["/simulator", "Simulator"],
  ["/privacy", "Privacy"],
];

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <header className="site-header">
          <div className="container">
            <h1>GNAI TV</h1>
            <nav>
              {links.map(([href, label]) => (
                <Link key={href} href={href}>
                  {label}
                </Link>
              ))}
            </nav>
          </div>
        </header>
        <main className="container">{children}</main>
      </body>
    </html>
  );
}
