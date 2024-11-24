import { Button } from '../abstracts/Button';
import { HomeButton } from './Home';
import { RefreshButton } from './Refresh';
import { InfoButton } from './Info';
import { ResultButton } from './Result';

export const Buttons = {
    home(): HomeButton {
        return new HomeButton();
    },
    refresh(): RefreshButton {
        return new RefreshButton();
    },
    info(): InfoButton {
        return new InfoButton();
    },
    result(): ResultButton {
        return new ResultButton();
    }
} as const;
