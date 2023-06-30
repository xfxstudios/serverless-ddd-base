import {Request,Response} from "express";
import {AppModuleCase} from '../application/AppModuleCase/AppModule.case'
import {AppModuleDTO} from '../application/AppModuleCase/AppModule.dto'

export class AppModuleController {

  /**
   * Hello AppModuleController
   * @param req
   * @param res
   */
  async helloApp(req: Request,res: Response) {

    const _dto = new AppModuleDTO(req.body)
    const _int = new AppModuleCase()
    _int.execute(_dto)
      .then((resp) => res.status(200).send(resp))
      .catch((e) => res.status(400).send({error:true, message: 'Error general'}))
  }

}