export interface IInterviewQuestions {
  Interview_Preparation: {
    Questions_to_Expect: {
      From_Recruiter: {
        Behavioral: string[];
        Competency: string[];
        General: string[];
      };
      From_Hiring_Manager: {
        Behavioral: string[];
        Competency: string[];
        General: string[];
      };
      From_Team_Members: {
        Behavioral: string[];
        Competency: string[];
        General: string[];
      };
    };
    Questions_to_Ask_Interviewer: {
      To_Recruiter: {
        General_Informational: string[];
        Role_Specific: string[];
        Company_Culture: string[];
      };
      To_Team_Members: {
        General_Informational: string[];
        Role_Specific: string[];
        Company_Culture: string[];
      };
      To_Hiring_Manager: {
        General_Informational: string[];
        Role_Specific: string[];
        Company_Culture: string[];
      };
    };
    Interview_Questions_Assessing_Cultural_Value: {
      Creating_Happiness: string[];
      Promoting_Health: string[];
      Innovation: string[];
    };
  };
}
