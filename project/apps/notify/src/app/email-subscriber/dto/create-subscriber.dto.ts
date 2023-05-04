import { IsEmail, IsNotEmpty } from 'class-validator';
import { Exception } from '../../constants';

export class CreateSubscriberDto {
  @IsEmail({}, { message: Exception.InvalidEmail })
  email: string;

  @IsNotEmpty({ message: Exception.FirstnameRequired })
  firstname: string;

  @IsNotEmpty({ message: Exception.LastnameRequired })
  lastname: string;
}
