export type Psychologist = {
  id: string;
  name: string;
  bio: string;
  focus: string;
  photoUrl: string;
  phone: string;
  tags: string[];
};

export type QuestionnaireResponse = {
  primaryIssue: string;
  duration: string;
  goal: string;
};
