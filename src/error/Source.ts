export class Source {
    /**
     * A JSON Pointer [RFC6901] to the associated entity in the request document
     * [e.g. "/data" for a primary data object, or "/data/attributes/title" for a specific attribute].
     */
    public readonly pointer: string | null;
    /**
     * A string indicating which URI query parameter caused the error.
     */
    public readonly parameter: string | null;

    constructor(pointer: string | null, parameter: string | null) {
        this.pointer = pointer;
        this.parameter = parameter;
    }
}
