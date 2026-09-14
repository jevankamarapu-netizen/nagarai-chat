import "./globals.css";

export const metadata = {
  title: "NAGARAI",
  description: "A ChatGPT-style AI chat application"
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}