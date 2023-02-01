export class Character {
    constructor (
        private id: string,
        private name: string,
        private origin: string
    ) {}

    public getOrigin(): string {
        return this.origin;
    }
    public setOrigin(value: string) {
        this.origin = value;
    }
    public getName(): string {
        return this.name;
    }
    public setName(value: string) {
        this.name = value;
    }
    public getId(): string {
        return this.id;
    }
    public setId(value: string) {
        this.id = value;
    }
}