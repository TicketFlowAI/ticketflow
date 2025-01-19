export class ResetPasswordRequestModel {
    constructor(
        public email: string = '',
        public token: string = '',
        public password: string = '',
        public password_confirmation: string = ''
    ) { }
}
