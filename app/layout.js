import "./globals.css";
import "./fanta.css";
import Head from "./head";
import AuthProvider from "@/context/AuthContext";


export const metadata = {
  title: "NotesNest | Effortless Note Organization",
  description: "A creative and seamless notetaking experience.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
        <AuthProvider>
          <body>
            <div id = 'app'>{children}</div>
            <div id = 'portal'></div>
          </body>
        </AuthProvider>
    </html>
  );
}
