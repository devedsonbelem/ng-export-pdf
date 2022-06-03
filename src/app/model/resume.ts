import { Experience } from "./experiencia";

export class Resume {
    profilePic: string;
    name: string;
    address: string;
    contactNo: number;
    email: string;
    socialProfile: string;
    experience: Experience; 
  
   
    

    constructor() {
        this.experience=new Experience;
       
    }
}

