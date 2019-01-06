import {Source} from './Source';

export class ErrorItem {
    /**
     * A short, human-readable summary of the problem that SHOULD NOT change from occurrence to occurrence of
     * the problem, except for purposes of localization.
     */
    public readonly title: string;

    /**
     * An object containing references to the source of the error.
     */
    public readonly source?: Source;

    constructor(title: string, source?: Source) {
        this.title = title;
        this.source = source;
    }
}
