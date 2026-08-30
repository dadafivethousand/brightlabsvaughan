// The document shell: metadata, the three faces, and the stylesheet.
//
// FONTS ARE SELF-HOSTED NOW. The static site pulled Permanent Marker, Caveat
// and Nunito off fonts.googleapis.com with a <link>, which is a blocking
// request to a third party before a single word can be drawn in the right
// face. `next/font/google` downloads them at build time, serves them from this
// origin, and emits the @font-face itself — so there is no preconnect, no
// external stylesheet, and no flash of the fallback while a CDN answers.
//
// Each face is handed to CSS as a variable rather than a class, because the
// stylesheet already routes every rule through --marker / --hand / --body.
import { Permanent_Marker, Caveat, Nunito } from "next/font/google";
import "./globals.css";

const marker = Permanent_Marker({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-marker",
});

const hand = Caveat({
  weight: ["600", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-hand",
});

const body = Nunito({
  weight: ["400", "600", "700", "800", "900"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-body",
});

// `metadataBase` is what makes the og:image absolute. The static page shipped
// `content="assets/brightlabs-mark-512.png"` — a RELATIVE url, which every
// scraper resolves against its own idea of the base and most resolve to
// nothing. Facebook and iMessage want an absolute one or they show no card.
export const metadata = {
  metadataBase: new URL("https://brightlabsvaughan.com"),
  title:
    "Bright Labs Vaughan — student-led science tutoring, workshops & experiments",
  description:
    "Bright Labs is a student-led tutoring and education organization in Vaughan, dedicated to making science exciting, accessible and inspiring for young learners.",
  alternates: { canonical: "/" },
  icons: {
    icon: "/assets/favicon.png",
    apple: "/assets/brightlabs-mark-512.png",
  },
  openGraph: {
    type: "website",
    url: "/",
    title: "Bright Labs Vaughan",
    description:
      "Student-led science tutoring, workshops and unique experiments for young learners in Vaughan.",
    images: ["/assets/brightlabs-mark-512.png"],
  },
  twitter: { card: "summary_large_image" },
};

// Next 15 wants viewport and themeColor out of `metadata` and in their own
// export; left in metadata they are silently dropped with a build warning.
export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#f6b93b",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${marker.variable} ${hand.variable} ${body.variable}`}>
      <body>
        {/* Runs while the body is still being parsed, so the reveal's hidden
            state is in force before anything paints — no flash of the finished
            page collapsing into the animation. It is also the switch that keeps
            the effect honest: the hidden state is scoped to `.js`, so if this
            never runs the site is simply the static page it was before, rather
            than a screen of invisible content. */}
        <script
          dangerouslySetInnerHTML={{
            __html: "document.documentElement.classList.add('js')",
          }}
        />
        {children}
      </body>
    </html>
  );
}
