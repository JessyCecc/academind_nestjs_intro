import { Injectable } from "@nestjs/common";

@Injectable()
export class TestService {
    showPlainText(): string {
        return 'A plain text!';
    }
}