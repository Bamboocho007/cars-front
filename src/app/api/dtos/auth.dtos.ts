export class LoginPayloadDto {
  constructor(public email: string, public password: string) {}
}

export class LoginResponseDto {
  constructor(public token = '') {}
}

export class RegistrationPayloadDto {
  constructor(
    public firstName = '',
    public lastName = '',
    public patronymic = '',
    public cityId = '',
    public password = '',
    public email = '',
    public phone = '',
  ) {}
}
