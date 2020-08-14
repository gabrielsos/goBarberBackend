import { de } from "date-fns/locale";

export default interface ICreateUserDTO {
  name: string;
  email: string;
  password: string;
}