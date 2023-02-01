import { TCharacterDB } from "../types";
import { BaseDatabase } from "./BaseDatabase";

export class CharacterDatabase extends BaseDatabase {
    public static TABLE_CHARACTERS = "characters"

    public async findCharacters () {
        const result: TCharacterDB[] = await BaseDatabase.connection(CharacterDatabase.TABLE_CHARACTERS)
        return result
    }

    public async findCharacterById (id: string) {
        const [ characterDB ]: TCharacterDB[] | undefined[] = await BaseDatabase
            .connection(CharacterDatabase.TABLE_CHARACTERS)
            .where({ id })

        return characterDB
    }

    public async insertCharacter (newCharacterDB: TCharacterDB) {
        await BaseDatabase
            .connection(CharacterDatabase.TABLE_CHARACTERS)
            .insert(newCharacterDB)
    }

    public async updateCharacter (id: string, newCharacterDB: TCharacterDB) {
        await BaseDatabase
            .connection(CharacterDatabase.TABLE_CHARACTERS)
            .update(newCharacterDB)
            .where({ id })
    }

    public async deleteCharacter (id: string) {
        await BaseDatabase
        .connection(CharacterDatabase.TABLE_CHARACTERS)
        .del()
        .where({id})
    }
}