import * as playpass from "playpass";
import state, { Mode } from "./state";

export function getEmojis() {
    let emotes = state.isSolved()?'🔊':'🔇';
    for (let i = 0; i < state.attempts; i++) {
        if (i === state.guesses.length - 1 && state.isSolved()) {
            emotes += '🟩';
        } else if (i < state.guesses.length) {
            if(state.guesses[i])
                emotes += '🟥';
            else
                emotes += '⬛️';
        } else {
            emotes += '⬜'
        }
    }

    return emotes;
}

export default function share() {
    // Create a link to our game
    const link = "https://hololive-heardle.org/";

    if (state.gameMode === Mode.Time) {
        const emojis = getEmojis();

        // Share some text along with our link
        playpass.share({
            text: `Hololive Production Heardle #${(state.store.currentInterval + 1).toString()}\n${emojis}\n${link}`,
        });
    } else if (state.gameMode === Mode.Free) {
        playpass.share({
            text: `Hololive Production Heardle : Free Play\nScore ${state.score}\nGuessed ${state.wins} songs\n${link}`,
        });
    }
}
