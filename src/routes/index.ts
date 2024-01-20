const routes = {
  baseURL: "http://13.51.166.73",

  auth: "/auth",
  refresh: "/api/token/refresh/",
  getTokens: "/api/users/login",
  registration: "/api/users/registration",
  forgotPassword: "/api/users/forgot-password",

  resetPassword: "/api/reset-password/:uuid/:token",

  getCvById: "api/v1/user/resume-by-id/",
  allResumes: "api/v1/user/all-resumes/",
  createResume: "/api/v1/user/create-resume/",

  getAllCoverLetters: "/api/v1/user/all-cover-letters/",
  coverLetterById: "/api/v1/user/cover-letter-by-id/",
  createCoverLetter: "/api/v1/user/create-cover-letter/",

  getAllConceirge: "/api/v1/concierge/all-concierges",
  getConceirgeLinkenUsers: "/api/v1/concierge/assigned-users/",
  getAllResumesByUserId: "/api/v1/concierge/user-resumes/",
  getAllJDByUserId: "/api/v1/concierge/user-job-desc/",
  changeJDStatus: "/api/v1/concierge/change-status/",
  getAssignedUsersForAdmin: "api/v1/concierge/assigned-user-for-admin/",
  getConciergDashBoard: "/api/v1/concierge/dashboard-view/",
  changeStatusMinusToken: "/api/v1/concierge/change-status-by-concierge/",
  getAllUserLinks: "/api/v1/concierge/get-user-links-by-id/",

  getAllUsers: "/api/v1/user/get-all-users/",
  editUser: "/api/v1/user/edit-user/",
  getAllFeatures: "/api/v1/user/list-ideas/",
  vote: "/api/v1/user/idea-vote/",
  unVote: "/api/v1/user/idea-unvote/",
  userSearchJob: "/api/v1/user/create-search-criteria/",
  userGetSearchQuery: "/api/v1/user/get-search-criteria/",
  userGetGeneratedQuery: "/api/v1/user/get-link/",
  userSaveGeneratedUrl: "/api/v1/user/save-link/",
  userGetAllLinks: "/api/v1/user/get-user-links/",

  allJobDesc: "/api/v1/user/all-job-desc/",
  createJobDescription: "/api/v1/user/create-job-desc/",
  getJobDescById: "/api/v1/user/job-desc-by-id/",
  getJobDescSumary: "/api/v1/result/get-job-desc-summary/",

  getInterviewQuestions: "/api/v1/result/generate-questions/",

  getResults: "api/v1/result/generate-result/",
  saveResults: "/api/v1/result/save-result/",
  getResultByJd: "/api/v1/result/get-result-by-jd/",

  createPrompt: "api/v1/result/create-prompt/",
  getTextPrompts: "api/v1/result/get-text-prompts/",
  getFilePrompts: "api/v1/result/get-file-prompts/",
  getCurrentPrompts: "api/v1/result/get-current-prompts/",
  getDeletePrompt: "api/v1/result/get-delete-prompt/",

  reasignCV: "api/v1/user/reassign-cv/",

  user: "/api/v1/user/data/",

  index: "/",
  cv: "/cv",
  cvById: "/resume/current/",
  coverLetterByIdPage: "/cv/current/",
  jobsDescriptions: "/jobs-descriptions",
  adminPage: "/admin-page",
  usersPage: "/users-page",
  ideasPage: "/ideas",
  userProfile: "/profile/",
  userProfileSettings: "/profile-settings/",
  userJobs: "/user-jobs",
  userFindJob: "/find-job",

  conciergDashBoard: "/dashboard",
  conceirgePage: "/conceirge-page",
  conceirgePageUsers: "/conceirge-users/",
  conceirgePageUserData: "/conceirge-page-user-data/",
};

export default routes;
