import { ClockIcon } from "@phosphor-icons/react/dist/ssr";

import type { GamePalette } from "@/lib/gamePreviews";
import type { ReactNode } from "react";

interface GamePreviewFrameProps {
    palette: GamePalette;
    round: string;
    timer?: string;
    clue: string;
    footer: string;
    children: ReactNode;
}

/**
 * The chrome every hero preview shares, copied over from the main app's
 * `PreviewFrame` so a game announcement post shows the same widget the live
 * /game/<slug> page does: a round label, an optional countdown, the game
 * body, the instruction line, and a live status footer.
 */
export default function GamePreviewFrame({
    palette,
    round,
    timer,
    clue,
    footer,
    children,
}: GamePreviewFrameProps) {
    return (
        <div className="rounded-3xl bg-white border border-navy-900/10 overflow-hidden shadow-sm">
            <div
                className="px-5 py-3 flex items-center justify-between gap-3"
                style={{ backgroundColor: palette.accentInk }}
            >
                <span
                    className="text-[11px] font-bold uppercase tracking-wider font-fredoka"
                    style={{ color: palette.accentForeground }}
                >
                    {round}
                </span>
                {timer ? (
                    <span
                        className="inline-flex items-center gap-1.5 text-[11px] font-bold font-fredoka tabular-nums"
                        style={{ color: palette.accentForeground }}
                    >
                        <ClockIcon size={12} weight="bold" />
                        {timer}
                    </span>
                ) : null}
            </div>

            <div className="px-5 py-7 md:px-7 md:py-8">{children}</div>

            <div className="px-5 pb-5 md:px-7 md:pb-6">
                <p className="text-center text-[13px] leading-relaxed text-navy-900/65">{clue}</p>
            </div>

            <div className="px-5 py-3 border-t border-navy-900/10 bg-navy-900/[0.02] flex items-center gap-2">
                <span
                    className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                    style={{ backgroundColor: palette.accentInk }}
                    aria-hidden="true"
                />
                <span className="text-[11px] font-medium text-navy-900/60">{footer}</span>
            </div>
        </div>
    );
}
