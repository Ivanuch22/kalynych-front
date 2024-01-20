export interface IUploadCV {
  name: string;
  text: string;
}

export interface IGetCvById {
  id: number;
  name: string;
  text: string;
  created: string;
  user_id: number;
}

export interface IGetJBSummary {
  id: number;
  name: string;
  text: string;
  created: string;
  file_url: string;
  status: string;
  employer_name: string;
  job_title: string;
  location: string;
  job_overview: string;
  responsibilities: string;
  qualification: string;
  user_id: number;
}
