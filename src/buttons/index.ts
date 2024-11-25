import { Button, ButtonAttributes } from '../abstracts/Button';
import { HomeButton } from './Home';
import { RefreshButton } from './Refresh';
import { InfoButton } from './Info';
import { ResultButton } from './Result';

export const Buttons = {
    home(): HomeButton {
        return new HomeButton();
    },
    refresh(attrs: ButtonAttributes): RefreshButton {
        return new RefreshButton(attrs);
    },
    info(attrs: ButtonAttributes): InfoButton {
        return new InfoButton(attrs);
    },
    result(attrs: ButtonAttributes): ResultButton {
        return new ResultButton(attrs);
    }
} as const;
