import {ValidProperties} from "../../../../core/decorators/generalDecorators";
import {_servResponse} from "../../../../core/dependencies";
import {AppModuleDTO} from "./AppModule.dto";

const _flow="Test App"

export class AppModuleCase {

  constructor() {}

  @ValidProperties(_flow)
  async execute(data: AppModuleDTO|any) {
    return new Promise((resolve, reject) => {
      if(data['valid_error']) {
        reject(data['error_data'])
        return;
      }

      const _response = _servResponse.response({
        code:1000,
        message:"Success Response",
        flow:_flow,
        data: {}
      })
      resolve(_response)

    })
  }
}