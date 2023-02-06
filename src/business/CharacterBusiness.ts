import { CharacterDatabase } from "../database/CharacterDatabase"
import { Character } from "../models/Character"
import { TCharacterDB } from "../types"

export class CharacterBusiness {
    public async getCharacters() {
        const characterDatabase = new CharacterDatabase()
            const charactersDB: TCharacterDB[] = await characterDatabase.findCharacters()
    
            const characters = charactersDB.map((characterDB) => new Character(
                characterDB.id,
                characterDB.name,
                characterDB.origin
            ))
        return characters
    }

    public async newCharacter(input : any) {
        const {id, name, origin} = input

        if (typeof id !== "string") {
            throw new Error("'id' deve ser string")
        }

        if (typeof name !== "string") {
            throw new Error("'name' deve ser string")
        }

        if (typeof origin !== "string") {
            throw new Error("'origin' deve ser string")
        }

        const characterDatabase = new CharacterDatabase()
        const characterDBExists = await characterDatabase.findCharacterById(id)

        if (characterDBExists) {
            throw new Error("'id' já existe")
        }

        const newCharacter = new Character(
            id,
            name,
            origin
        )

        const newCharacterDB: TCharacterDB = {
            id: newCharacter.getId(),
            name: newCharacter.getName(),
            origin: newCharacter.getOrigin()
        }

        await characterDatabase.insertCharacter(newCharacterDB)

        return newCharacter
    }

    public async editCharacter (idToEdit: string, input: any) {

        const {newId, newName, newOrigin} = input

        if (newId !== undefined) {
            if (typeof newId !== "string") {
                throw new Error("'id' deve ser string")
            }
        }
        if (newName !== undefined) {
            if (typeof newName !== "string") {
                throw new Error("'name' deve ser string")
            }
        }
        if (newOrigin !== undefined) {
            if (typeof newOrigin !== "string") {
                throw new Error("'origin' deve ser string")
            }
        }

        const characterDatabase = new CharacterDatabase()
        const characterDB = await characterDatabase.findCharacterById(idToEdit)

        if (!characterDB) {
            throw new Error("'id' não encontrado")
        }

        const updatedCharacter = new Character(
            newId,
            newName,
            newOrigin
        )

        const updatedCharacterDB: TCharacterDB = {
            id: updatedCharacter.getId() || characterDB.id,
            name: updatedCharacter.getName() || characterDB.name,
            origin: updatedCharacter.getOrigin() || characterDB.origin
        }

        await characterDatabase.updateCharacter(idToEdit, updatedCharacterDB)

        return updatedCharacter
    }

    public async deleteCharacter (idToDelete : string) {
        const characterDatabase = new CharacterDatabase ()
        const character = await characterDatabase.findCharacterById(idToDelete)
        
        if (!character) {
            throw new Error("'id' do personagem não encontrada")
        }

        await characterDatabase.deleteCharacter(idToDelete)
    }
}