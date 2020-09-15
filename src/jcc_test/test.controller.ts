import { Controller, Get } from '@nestjs/common';
import { TestService } from './test.service';

@Controller('test')
export class TestController {
    // construtor(private readonly testService: TestService) {}

    @Get()
    outputMain(): string {
        let output = '';
        const urlRoot = '/test'
        output += '<hr />';
        output += '<a href="' + urlRoot + '/" target="_blank">Main</a><br />';
        output += '<a href="' + urlRoot + '/text" target="_blank">Show a plain text</a><br />';
        output += '<a href="' + urlRoot + '/json" target="_blank">Show a json</a><br />';
        return output;
    }

    @Get('text')
    outputPlainText(): string {
        return 'A test plain text!';
    }

    @Get('json')
    outputJSON(): { out: string } {
        return {out:'This is JSON'};
    }
}