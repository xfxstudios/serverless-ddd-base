import express from 'express';
import {IncommingLog} from './core/middleware/incommingLog';
const path=require('path');
const fs=require('fs');

const app = express();

const _replace = (txt: string,values: any[]) => {
  let _out=txt
  values.forEach((item) => {
      _out=_out.replace(":?",item)
  })
  return _out
}

app.use(express.json({limit: '50mb'}))
app.use(express.urlencoded({extended: true}));
app.use(IncommingLog)


const _modules=path.resolve(fs.existsSync('.dist/src/app/')?'.dist/src/app/':'src/app/')
const _moduleRoutes=path.resolve(`${_modules}/:?/routes/`)

const _folders=fs.readdirSync(_modules);
_folders.forEach((item:any) => {
    const _actual=path.resolve(_replace(_moduleRoutes,[item]))
    const _files=fs.readdirSync(_actual);
    _files.forEach((file:any) => {
        app.use(require(`${_actual}/${file}`))
    })
})

export default app;
