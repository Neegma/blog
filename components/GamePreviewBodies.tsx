import type { GamePalette, GamePreview } from "@/lib/gamePreviews";

/**
 * The three preview bodies used by the games featured in blog posts so far,
 * copied over from the main app's `PreviewBodies.tsx`. Each is a simplified,
 * light-mode redraw of the screen a player is actually looking at mid-round.
 * Add a body here (and its layout to `GamePreview`) if a future post features
 * a game that needs a layout this file doesn't have yet.
 */

type Body<L extends GamePreview["layout"]> = {
    preview: Extract<GamePreview, { layout: L }>;
    palette: GamePalette;
};

/** Bingo: a collected card being marked off as numbers get called. */
export function GridBody({ preview, palette }: Body<"grid">) {
    return (
        <div>
            <p className="text-[11px] font-bold uppercase tracking-wider text-navy-900/50 text-center mb-2 font-fredoka">
                Just called
            </p>
            <p
                className="font-fredoka text-5xl sm:text-6xl font-bold leading-none text-center mb-6"
                style={{ color: palette.accentInk }}
            >
                {preview.lastCalled}
            </p>
            <ul className="grid grid-cols-3 gap-2 list-none">
                {preview.tokens.map((token) => (
                    <li
                        key={token.label}
                        className="h-14 rounded-xl flex items-center justify-center font-fredoka text-xl font-bold border"
                        style={
                            token.marked
                                ? {
                                      backgroundColor: palette.accentInk,
                                      borderColor: palette.accentInk,
                                      color: palette.accentForeground,
                                  }
                                : {
                                      backgroundColor: "#FFFFFF",
                                      borderColor: "rgba(15, 23, 41, 0.12)",
                                      color: "#0F1729",
                                  }
                        }
                    >
                        {token.label}
                    </li>
                ))}
            </ul>
        </div>
    );
}

/** Charades, Taboo, Find the Mole, Villagers & Wolves, Song Association, Word Art. */
export function CardBody({ preview, palette }: Body<"card">) {
    return (
        <div className="text-center">
            <p className="text-[11px] font-bold uppercase tracking-wider text-navy-900/50 mb-3 font-fredoka">
                {preview.kicker}
            </p>
            <p
                className="font-fredoka font-bold leading-tight text-3xl sm:text-4xl md:text-[2.75rem]"
                style={{ color: palette.accentInk }}
            >
                {preview.word}
            </p>
            {preview.forbidden?.length ? (
                <ul className="mt-6 space-y-1.5 list-none max-w-[15rem] mx-auto">
                    {preview.forbidden.map((word) => (
                        <li
                            key={word}
                            className="rounded-lg border border-navy-900/10 bg-navy-900/[0.03] py-1.5 text-sm font-semibold text-navy-900/55 line-through"
                        >
                            {word}
                        </li>
                    ))}
                </ul>
            ) : null}
        </div>
    );
}

/** Size, weight and opacity by cloud weight, biggest for the most-given answer. */
const CLOUD_STEPS = [
    { maxWeight: 0.25, size: "text-sm sm:text-base", weight: "font-semibold", opacity: 0.55 },
    { maxWeight: 0.5, size: "text-base sm:text-xl", weight: "font-bold", opacity: 0.72 },
    { maxWeight: 0.75, size: "text-xl sm:text-2xl", weight: "font-extrabold", opacity: 0.88 },
    { maxWeight: 1.01, size: "text-2xl sm:text-4xl", weight: "font-extrabold", opacity: 1 },
] as const;

function cloudStepFor(weight: number) {
    return (
        CLOUD_STEPS.find((step) => weight < step.maxWeight) ?? CLOUD_STEPS[CLOUD_STEPS.length - 1]
    );
}

/** Who Said It: anonymous answers sized by how many people gave them. */
export function CloudBody({ preview, palette }: Body<"cloud">) {
    return (
        <div>
            <p className="font-fredoka text-lg sm:text-xl font-bold text-navy-900 leading-snug mb-5 text-center">
                {preview.question}
            </p>
            <div
                className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2 sm:gap-x-4"
                aria-label={preview.entries.map((entry) => entry.text).join(", ")}
            >
                {preview.entries.map((entry, i) => {
                    const step = cloudStepFor(entry.weight);
                    return (
                        <span
                            key={entry.text}
                            aria-hidden="true"
                            className={`font-fredoka leading-none ${step.size} ${step.weight}`}
                            style={{
                                color: palette.accentInk,
                                opacity: step.opacity,
                                transform: `rotate(${((i * 7) % 5) - 2}deg)`,
                            }}
                        >
                            {entry.text}
                        </span>
                    );
                })}
            </div>
        </div>
    );
}
