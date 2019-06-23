export class ModelTransformException extends Error
{
    constructor(message, errors) {
        super(message);
        this.errors = errors;
    }
}