import GamePreviewFrame from "./GamePreviewFrame";
import { CardBody, CloudBody, GridBody } from "./GamePreviewBodies";

import type { GamePalette, GamePreview } from "@/lib/gamePreviews";

/**
 * Renders a game's real hero preview inside a blog post, the same widget
 * shown on its live /game/<slug> page, copied over rather than faked.
 */
export default function GamePreviewCard({
    preview,
    palette,
}: {
    preview: GamePreview;
    palette: GamePalette;
}) {
    return (
        <GamePreviewFrame
            palette={palette}
            round={preview.round}
            timer={preview.timer}
            clue={preview.clue}
            footer={preview.footer}
        >
            {renderBody(preview, palette)}
        </GamePreviewFrame>
    );
}

function renderBody(preview: GamePreview, palette: GamePalette) {
    switch (preview.layout) {
        case "grid":
            return <GridBody preview={preview} palette={palette} />;
        case "card":
            return <CardBody preview={preview} palette={palette} />;
        case "cloud":
            return <CloudBody preview={preview} palette={palette} />;
    }
}
