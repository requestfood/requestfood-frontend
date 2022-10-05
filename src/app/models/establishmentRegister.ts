import { FileHandle } from './file-handle';

export interface EstablishmentRegister{

    name: String;
    email: String;
    phone: String;
    password: String;
    timeToOpen: String;
    timeToClose: String;
    description: String;
    image: FileHandle[];
}
