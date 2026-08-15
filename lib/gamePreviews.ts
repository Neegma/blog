/**
 * Hero preview data for a handful of game announcement posts, copied over from
 * the main app's `src/game/content/games/*.ts` + `src/game/content/palettes.ts`
 * (same brand tokens, so it renders pixel-faithful to the live /game/<slug> page).
 * Add an entry here and reference it via a post's `gamePreview` frontmatter field.
 */

export interface GamePalette {
    accentInk: string;
    accentForeground: string;
    accentSoft: string;
    accentBorder: string;
}

interface PreviewBase {
    round: string;
    timer?: string;
    footer: string;
}

export type GamePreview =
    | (PreviewBase & {
          layout: "grid";
          lastCalled: string;
          tokens: { label: string; marked: boolean }[];
          clue: string;
      })
    | (PreviewBase & {
          layout: "card";
          kicker: string;
          word: string;
          forbidden?: string[];
          clue: string;
      })
    | (PreviewBase & {
          layout: "cloud";
          question: string;
          entries: { text: string; weight: number }[];
          clue: string;
      });

interface GamePreviewEntry {
    palette: GamePalette;
    preview: GamePreview;
}

export const GAME_PREVIEWS: Record<string, GamePreviewEntry> = {
    bingo: {
        palette: {
            accentInk: "#00786E",
            accentForeground: "#FFFFFF",
            accentSoft: "#D6F2EE",
            accentBorder: "#00968933",
        },
        preview: {
            layout: "grid",
            round: "Calling · 14 called",
            lastCalled: "42",
            tokens: [
                { label: "07", marked: true },
                { label: "23", marked: true },
                { label: "42", marked: true },
                { label: "56", marked: false },
                { label: "61", marked: true },
                { label: "88", marked: false },
            ],
            clue: "Tap a number when it is called. Two to go.",
            footer: "You collected these from six different people",
        },
    },
    "word-art": {
        palette: {
            accentInk: "#7B1E7A",
            accentForeground: "#FFFFFF",
            accentSoft: "#F0E2FB",
            accentBorder: "#7B1E7A33",
        },
        preview: {
            layout: "card",
            round: "Turn 4 · Team Coral",
            timer: "0:20",
            kicker: "Say a word that fits",
            word: "A word with a double letter",
            clue: "Out loud, before the clock stops. The room judges, you decide.",
            footer: "Miss it and Team Blue gets five seconds to steal",
        },
    },
    "who-said-it": {
        palette: {
            accentInk: "#115E59",
            accentForeground: "#FFFFFF",
            accentSoft: "#D6F0EC",
            accentBorder: "#0D948833",
        },
        preview: {
            layout: "cloud",
            round: "Prompt 3 of 8",
            timer: "0:25",
            question: "What is your favourite food?",
            entries: [
                { text: "Jollof rice", weight: 1 },
                { text: "Pizza", weight: 0.85 },
                { text: "Pork belly", weight: 0.6 },
                { text: "Egg fried rice", weight: 0.55 },
                { text: "Toast and baked beans", weight: 0.4 },
                { text: "Roast chicken", weight: 0.3 },
                { text: "Ramen", weight: 0.25 },
                { text: "Suya", weight: 0.15 },
                { text: "Cheese toastie", weight: 0.1 },
                { text: "Plantain", weight: 0.05 },
            ],
            clue: "Everyone's answer, no names on any of them. The ones people agreed on grow.",
            footer: "12 of 12 answers in",
        },
    },
};
