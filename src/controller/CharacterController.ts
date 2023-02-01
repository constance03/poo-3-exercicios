import { Request, Response } from 'express'
import { CharacterDatabase } from "../database/CharacterDatabase"
import { Character } from "../models/Character"
import { TCharacterDB } from "../types"

export class CharacterController {
    public getCharacters = async (req: Request, res: Response) => {
        try {
            const characterDatabase = new CharacterDatabase()
            const charactersDB: TCharacterDB[] = await characterDatabase.findCharacters()
    
            const characters = charactersDB.map((characterDB) => new Character(
                characterDB.id,
                characterDB.name,
                characterDB.origin
            ))
    
            res.status(200).send(characters)
        } catch (error) {
            console.log(error)
    
            if (req.statusCode === 200) {
                res.status(500)
            }
    
            if (error instanceof Error) {
                res.send(error.message)
            } else {
                res.send("Erro inesperado")
            }
        }
    }

    public newCharacter = async (req: Request, res: Response) => {
        try {
            const { id, name, origin } = req.body
    
            if (typeof id !== "string") {
                res.status(400)
                throw new Error("'id' deve ser string")
            }
    
            if (typeof name !== "string") {
                res.status(400)
                throw new Error("'name' deve ser string")
            }

            if (typeof origin !== "string") {
                res.status(400)
                throw new Error("'origin' deve ser string")
            }
    
            const characterDatabase = new CharacterDatabase()
            const characterDBExists = await characterDatabase.findCharacterById(id)
    
            if (characterDBExists) {
                res.status(400)
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
    
            res.status(201).send(newCharacter)
        } catch (error) {
            console.log(error)
    
            if (req.statusCode === 200) {
                res.status(500)
            }
    
            if (error instanceof Error) {
                res.send(error.message)
            } else {
                res.send("Erro inesperado")
            }
        }
    }

    public editCharacter = async (req: Request, res: Response) => {
        try {
            const idToEdit = req.params.id

            const newId = req.body.value
            const newName = req.body.value
            const newOrigin = req.body.value
    
            if (newId !== undefined) {
                if (typeof newId !== "string") {
                    res.status(400)
                    throw new Error("'id' deve ser string")
                }
            }
            if (newName !== undefined) {
                if (typeof newName !== "string") {
                    res.status(400)
                    throw new Error("'name' deve ser string")
                }
            }
            if (newOrigin !== undefined) {
                if (typeof newOrigin !== "string") {
                    res.status(400)
                    throw new Error("'origin' deve ser string")
                }
            }
    
            const characterDatabase = new CharacterDatabase()
            const characterDB = await characterDatabase.findCharacterById(idToEdit)
    
            if (!characterDB) {
                res.status(404)
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
            
            res.status(200).send(updatedCharacterDB)
        } catch (error) {
            console.log(error)
    
            if (req.statusCode === 200) {
                res.status(500)
            }
    
            if (error instanceof Error) {
                res.send(error.message)
            } else {
                res.send("Erro inesperado")
            }
        }
    }

    public deleteCharacter =  async (req: Request, res: Response) => {
        try {
            const idToDelete = req.params.id
    
            const characterDatabase = new CharacterDatabase ()
            const character = await characterDatabase.findCharacterById(idToDelete)
            
            if (!character) {
                res.status(400)
                throw new Error("'id' do personagem não encontrada")
            }
    
            await characterDatabase.deleteCharacter(idToDelete)
    
            res.status(200).send({message: "Personagem deletado com sucesso"})
    
        } catch (error) {
            console.log(error)
    
            if (req.statusCode === 200) {
                res.status(500)
            }
    
            if (error instanceof Error) {
                res.send(error.message)
            } else {
                res.send("Erro inesperado")
            }
        }
    }    
}