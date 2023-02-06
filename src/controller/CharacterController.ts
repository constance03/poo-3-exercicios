import { Request, Response } from 'express'
import { CharacterBusiness } from '../business/CharacterBusiness'
import { CharacterDatabase } from "../database/CharacterDatabase"
import { Character } from "../models/Character"
import { TCharacterDB } from "../types"

export class CharacterController {
    public getCharacters = async (req: Request, res: Response) => {
        try {
            const characterBusiness = new CharacterBusiness ()
            const output = await characterBusiness.getCharacters()
    
            res.status(200).send(output)
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
            const characterBusiness = new CharacterBusiness ()
            const output = await characterBusiness.newCharacter(req.body)
    
            res.status(201).send(output)
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

            const newId = req.body.id
            const newName = req.body.name
            const newOrigin = req.body.origin

            const input = { 
                newId,
                newName,
                newOrigin
            }
    
            const characterBusiness = new CharacterBusiness()
            const output = await characterBusiness.editCharacter(idToEdit, input)
            
            res.status(201).send(output)
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
            
            const characterBusiness = new CharacterBusiness()
            characterBusiness.deleteCharacter(idToDelete)
          
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