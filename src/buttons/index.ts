import { Button, ButtonAttributes } from '../abstracts/Button';
import { HomeButton } from './Home';
import { RefreshButton } from './Refresh';
import { InfoButton } from './Info';
import { ResultButton } from './Result';
import { CloseButton } from './Close';

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
    },
    // Close buttons. The click handler will automatically provided based on context, e.g.: in modal.
    close(attrs: ButtonAttributes): CloseButton {
        return new CloseButton(attrs);
    }
} as const;
