import { User, AvaliableCity, AvaliableRole } from '@project/shared/contracts';
import { compare, genSalt, hash } from 'bcrypt';

const SALT_ROUNDS = 10;

export class AccountEntity implements User {
  _id: string;
  firstname: string;
  lastname: string;
  email: string;
  city: AvaliableCity;
  role: AvaliableRole;
  avatar?: string;
  birthDate: Date;
  registrationDate: Date;
  password: string;

  constructor(account: User) {
    this.fillEntity(account);
  }

  fillEntity(account: User) {
    const {
      _id,
      firstname,
      lastname,
      email,
      city,
      role,
      avatar,
      birthDate,
      registrationDate,
    } = account;
    this._id = _id;
    this.firstname = firstname;
    this.lastname = lastname;
    this.email = email;
    this.city = city;
    this.role = role;
    this.avatar = avatar;
    this.birthDate = birthDate;
    this.registrationDate = registrationDate;
  }

  toObject() {
    return { ...this };
  }

  async setPassword(password: string): Promise<AccountEntity> {
    const salt = await genSalt(SALT_ROUNDS);
    this.password = await hash(password.toString(), salt);
    return this;
  }

  async comparePassword(password: string): Promise<boolean> {
    return compare(password, this.password);
  }
}
