import { Fredoka, IBM_Plex_Sans, Noto_Serif } from "next/font/google";

export const ibmPlexSans = IBM_Plex_Sans({
    subsets: ["latin"],
    variable: "--ibm-plex-sans",
    weight: ["400", "500", "600", "700"],
    style: ["normal", "italic"],
    fallback: ["system-ui", "arial"],
});

export const fredoka = Fredoka({
    subsets: ["latin"],
    variable: "--font-fredoka",
    weight: ["400", "500", "600", "700"],
    style: ["normal"],
    fallback: ["system-ui", "arial"],
    display: "swap",
});

export const notoSerif = Noto_Serif({
    subsets: ["latin"],
    variable: "--noto-serif",
    weight: ["400", "500", "600", "700", "900"],
    style: ["normal", "italic"],
    fallback: ["system-ui", "arial"],
});
