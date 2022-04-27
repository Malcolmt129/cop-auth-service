import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {

    @Get() 
    getVersion() {
        return { message: `Welcome to the Church of Phillippi Auth Service Version ${require('../../package.json').version}`};
    }
}
