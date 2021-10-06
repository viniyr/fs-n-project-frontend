import { CityDTO } from "./city.dto";

export interface AddressDTO {
    id : string;
    street : string;
    number : string;
    complement : string;
    neighborhood : string;
    zip : string;
    city : CityDTO;

}