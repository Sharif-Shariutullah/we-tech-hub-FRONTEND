export interface jobPosting{


    jobTitle : string,
    jobDescription : string,
    salary : string, //there could be ERROR
    experienceRequired: string,
    educationQualification : string,
    applicationDeadline : string, //there could be ERROR
    contactInformation : string,

    responsibilities: string[];
    requirements: string[];
    whatWeOffer: string[];

    postTime: string; // added this field


}