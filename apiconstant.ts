export class UserApiConstant {
    public static version = "1"
    public static loginModule =
        {
            signIn: "v1/User/Signin",
            signInCustomActiveDirectory: "v1/User/SigninCustomActiveDirectory",
            ssoLogin: "v1/token/sso/login",
            domainList: "v1/DomainSettings/GetAllDomain",
            ssoGenerateToken: "v1/token/sso/generate",
            ssoValidateToken: "v1/token/sso/validate",
            mobileAuthorize: "v1/token/sso/mobile/Authorize",
            ssoLoginInMobile: "v1/token/sso/login/mobile",
            ssoLoginUsingJwtToken: "v1/token/sso/login/jwt",
            deeplinkurl: "v1/token/deeplinkurl",
            ssoLoginDeeplink: "v1/token/sso/login/deeplink",
            updateDeepLinkDetails: "v1/token/deeplink/Status/update",
            isUserExist: "v1/B2CUser/SSO/Signin",
            getReferenceData: "v1/B2CUser/getReferenceData",
            getDuplicate_Email: "v1/User/GetDuplicate_Email"

        }
    public static b2cRegister = {
        register: "v1/B2CUser/Registration",
        stateBind: "v1/Organisation/MasterData",
        cityBind: "v1/Organisation/MasterData",
        speakUp: "v1/SpeakUp/Request"
    }
    public static b2bRegister = {
        register: "v1/B2BUser/Registration",
        validateotp: "v1/B2BUser/ValidateOTP",
        requestotp: "v1/B2BUser/RequestOTP",
        confirmationmail: "v1/B2BUser/MailConfirmation"
    }
    public static multitenancy =
        {
            domainName: "v1/DomainSettings/",
            switchOptions: 'v1/DomainSettings/SwitchOptions',
            languageMaster: "v1/DomainSettings/GetLanguageDetails",
            timeZoneDetails: "v1/DomainSettings/TimeZoneDetails"
        }
    public static common =
        {
            userModule: "v1/DomainSettings/Module",
            deviceValidity: "v1/User/CheckDeviceValidity",
            appVersionValidity: "v1/Appmanagement/version/validate"
        }

    //Add by Sagar 
    public static notification =
        {
            getNotificationList: "v1/Notification/List",
            setNotificationStatus: "v1/Notification/Status",
            deleteNotification: "v1/Notification/Delete"
        }

    public static faq =
        {
            getFaqWithTopic: "v1/FAQ/FAQWithTopic"
        }

    public static reference =
        {
            getReferenceData: "v1/Reference/ReferenceWithTopic"
        }

    public static passwordmanagement =
        {
            passwordRecovery: "v1/User/RequestOTP",
            // validateOTP: "v1/User/ValidateOTP",
            validateOTP: "v1/User/checkrequestedotp",
            changePassword: "v1/User/PasswordManagement",
            b2bRequestOTP: "v1/User/B2BRequestOTP",
        }

    public static logging =
        {
            setDeviceInfo: "v1/Communication/ActivateCommunicationDeviceInfo?Ref_Domain_ID=",
        }

    // Added By Gulam For Report Module
    public static reportMyPerformance =
        {
            getPerformanceReport: "v1/Report/MyPerformance",
            getDropdown: "v1/Report/MyPerformance/List",
            getCourseCompletionGraph: "v1/leaderboard/PerformanceReport",
            getLPUserData: "v1/Report/LearningPath"
        }
    public static reportTeamPerformance =
        {
            getCourseOrgReport: "v1/Report/TeamCourseOrgReport",
            getAssessmentOrgReport: "v1/Report/TeamAssessmentOrgReport",
            getCourse: "v1/Report/CourseTeamPerformance",
            getAssessment: "v1/Report/TeamAssessmentReport",
            getDropdown: "v1/Report/TeamPerformance/List",
            getMaster: "v1/Organisation/Report_GetUserMasterdata"
        }
    //End:Report Module

    // Added by Bhavesh Savla 
    // Elearn related these two data set added.
    public static elearn =
        {
            getCourseList: "v1/courses/Assigned",
            postStatus: "v1/courses/Status",
            getLatestElearnData: "v1/courses/GetLatest",
            postSyncedcall: "v1/courses/Synced",
            viewCertificate: "v1/Certificate/View",
            removeCertificate: "v1/Certificate/Remove",
            setSCORMParam: "v1/Scorm/Parameter",
            getCommunicationID: "v1/Scorm/InitializeUser",
            courseDetailsLIVE: "v1/courses/",
            courseDetailsUAT: "v1/courses/Details"
        }

    public static launchSCORM =
        {
            lmsinitialize: "v1/Scorm/initialize?Ref_Domain_ID=",
            lmsgetvalue: "v1/Scorm/getvalue",
            lmssetvalue: "v1/Scorm/setvalue",
        }


    //End: Elearn Module

    // Generic API to send email
    public static generic =
        {
            sendExceptionAsEmail: "Admin/Logging/sendException"
        }

    //Added by Ajit
    //widgetsmodule Training Module : Start Here
    public static widgetsModuleKeys =
        {
            /**
             * For Slider Component
             */
            bannerDetails: "v1/banner",
            /**
             * For Performance Graph Component
             */
            reportPerformance: "v1/Report/Performance",
            /**
             * For Upcoming Training Component
             */
            trainingList: "v1/TrainingManagement/UpcomingTraining",
            /**
            * For Splash Component
            */
            splash: "v1/Splash",
            splashCount: "v1/Splash",
        }
    //widgetsmodule Training Module : End Here

    //Added by Ajit
    //Classroom Training Module : Start Here
    public static classroomTrainingModuleKeys =
        {
            /**
            * For Request New Training Component
            */
            requestNewTraining: "v1/TrainingManagement/RequestNewTraining",
            /**
             * For Training Calender Component
             */
            calenderDataMain: "v1/TrainingManagement/Agenda",
            calenderData: "v1/TrainingManagement/Calendar",
            acceptRejectCancelAll: "v1/TrainingManagement/AcceptRejectCancel",
            sessionDetails: "v1/TrainingManagement/Session",
            listViewData: "v1/TrainingManagement/ListView",
            listUserParticipants: "v1/TrainingManagement/Participants",
            listUserForSendNomination: "v1/TrainingManagement/User",
            listUserForAttendanceGet: "v1/TrainingManagement/Attendance",
            listUserForAttendancePost: "v1/TrainingManagement/Attendance",
            /**
             * For Agenda Component
             */
            agendaDetails: "v1/TrainingManagement/AgendaDetails",
            trainingListDetails: "Admin/MasterManagement/Training",
            categoryListDetails: "Admin/MasterManagement/Category",
            managecategoryList: "Admin/MasterManagement/ManageCategory",
            levelListDetails: "Admin/MasterManagement/Level",
            trainerListDetails: "Admin/TrainingManagement/TrainerDetails",
            venueListDetails: "Admin/TrainingManagement/Venue",
            getVenueList: "Admin/TrainingManagement/Venue",
            getModifyVenueList: "Admin/TrainingManagement/VenueDetails",
            venueManage: "Admin/TrainingManagement/ActiveDeactiveVenue",
            trainingManage: "Admin/MasterManagement/ActiveDeactive",
            getTraningNameList: "Admin/MasterManagement/Training",
            topicListDetails: "Admin/MasterManagement/Topic",
            certificateListDetails: "Admin/CertificateManagement/Certificate",
            feedbackListDetails: "Admin/FeedbackManagement/Feedback",
            languageListDetails: "Admin/MasterManagement/Language",
            assessmentListDetails: "Admin/AssessManagement/Assessment",
            addTrainingBatch: "Admin/TrainingManagement/Batch",
            getMasterData: "v1/Organisation/GetUserMasterdata",
            initiateFeedback: "v1/TrainingManagement/ActiveFeedBack",
            trainigList: "Admin/TrainingManagement/Batch",
            template: "Admin/MasterManagement/Template",
            getBatchDetails: "Admin/TrainingManagement/",
            getTemplateList: "Admin/MasterManagement/Template",
            setActiveDeActiveDeleteTemplate: "Admin/MasterManagement/ActiveDeactiveTemplate",
            saveFile: "v1/User/SaveFile",
            deleteActiveDeactive: "Admin/TrainingManagement/ActiveDeactiveBatch",
            manageTopic: "Admin/MasterManagement/ManageTopic"
        }
    //Classroom Training Module : End Here
    public static Dashboard =
        {
            dashboardStatistics: "v1/Dashboard/Statistics",
            dashboardTabs: "v1/Dashboard/Tabs",
            dashboardStatisticsWithSchema: "v1/Dashboard/StatisticsWithSchema",
            dashboardCourseOrgReport: "v1/Dashboard/CourseOrganizationalReport"
        }

    public static ShowCertificateList =
        {
            showAllCertificateListData: "v1/CertificatesDetails/ShowCertificateList",
            getBadgeData: "v1/Accomplishment/Badges",
            getMyJourey: "v1/CertificatesDetails/MyjourneyList",
        }


    public static learningpath =
        {
            assigned: "v1/LearningPath/Assigned",
            getDetails: "v1/LearningPath/",
            getCertificate: "v1/CertificatesDetails/ShowCertificateList"
        }

    public static ojtmodule =
        {
            assignedForms: "v1/OnBoardProgram/AssignedForm",
            pendingTaskGraph: "v1/OnBoardProgram/Report/UserPendingTasks",
            completedFormsGraph: "v1/OnBoardProgram/Report/UserCompletedForms",
            AssignedTask: "v1/OnBoardProgram/Tasks/AssignedTasks",
            submitTaskStatus: "v1/OnBoardProgram/SubmitTaskStaus"
        }

    public static userProfile =
        {
            timeZoneDetails: "v1/DomainSettings/TimeZoneDetails",
            saveFile: "v1/User/SaveFile?DomainID=",
            removeProfilePic: "v1/User/RemoveUserProfilePicture",
            editProfile: "v1/User/EditProfile",
            sendRequest: "v1/User/SendRequest"
        }

    public static courseWidgets =
        {
            accessed: "v1/courses/RecentAccessed",
            assigned: "v1/courses/RecentAssigned",
            upcomingExpiry: "v1/courses/upcomingexpiry"

        }

    public static assessWidgets =
        {
            accessed: "v1/assessment/accessed/recent",
            assigned: "v1/assessment/assigned/recent",
            upcomingExpiry: "v1/assessment/upcomingexpiry"
        }

    public static learningpathWidgets =
        {
            accessedLP: "v1/LearningPath/RecentAssigned_LearningPath",
        }

    public static rating =
        {
            post: "v1/User/Rating"
        }

    public static homeCalendar =
        {
            trainingYears: "v1/TrainingManagement/calender/years",
            downloadCalendar: "v1/TrainingManagement/EXCEL_AND_PDF"
        }
    public static getTopRanks =
        {
            getTopRanks: "v1/leaderboard/Toptenranker"
        }

    // Added by manish 
    // Support Module 
    public static supportModule = {
        getDepartmentList: "v1/Department",
        postTicketMiniSupport: "v1/Ticket/Request",
        postTicketFullSupport: "v1/Ticket",
        postTicketManageClosed: "v1/Ticket/Manage?DomainID=",
        postTicketConversation: "v1/Ticket/Manage?DomainID=",
        getTicketTypePendingClose: "v1/Ticket",
        getTicketDetails: "v1/Ticket/",

        //---------Admin Section 
        postSupportDepartment: "Admin/SupportManagement/AddDepartment",
        getSupportManagerList: "Admin/SupportManagement/GetSupportManagerList",
        supportManagerDelete: "Admin/SupportManagement/SupportManagerDelete",
        getSupportManagerDetailsById: "Admin/SupportManagement/GetSupportManagerDetailsById",
    }
    // end here

    //Added by Suraj For Rankers module 
    public static RankersModuleKeys =
        {
            // To Get Overall Rankers
            GetOverallRankers: "v1/leaderboard/Toptenranker",
            // To Get Department wise Rankers
            GetDepartmentWiseRankers: "v1/leaderboard/Rankers",
        }

    //Added by Suraj For Global Search module
    public static GlobalSearchModuleKeys =
        {
            // To Get the Global Search Result in `Json format.
            getGlobalSearchResult: "v1/GlobalSearch",
            // To Get the Global Search Result For LP.
            getLearningPathGlobalSearch: "v1/LearningPathGlobalSearch",
        }

    //Added by Santosh For Offline E-learn module
    public static SynchronizationModule =
        {
            // To Get the Global Search Result in `Json format
            SynchronizationScormData: "v1/Synchronization/ScormCourse",
            //SynchronizationCourseStatus: "v1/Synchronization/CourseStatus",
            //SynchronizationCourseStatusHistory: "v1/Synchronization/CourseStatusHistory",
            getScormData: "v1/Scorm/OfflineInitialize",
        }

    //Added by Gargi B For Badge Management Rules Configuration
    public static Rules =
        {
            RuleList: "v1/BadgeManagement/RuleList",
            AddRules: "v1/BadgeManagement/Rules",
            EditRules: "v1/BadgeManagement/ModRules",
            DelRules: "v1/BadgeManagement/RemoveRules",
            ModTypes: "v1/BadgeManagement/ModuleTypes",
            ModNames: "v1/BadgeManagement/ModuleNames",
            Activities: "v1/BadgeManagement/ActivityList",
            RulesList: "v1/BadgeManagement/GetListForRules",
            RuleConds: "v1/BadgeManagement/RuleConditions",
            RuleCondList: "v1/BadgeManagement/RuleConditionsList",
            RuleCondDtls: "v1/BadgeManagement/RuleConditionsDetails",
            RmvRuleCond: "v1/BadgeManagement/RmvRuleConditions",
            BadgesList: "v1/BadgeManagement/BadgeList",
            AssignedBadgeDetails: "v1/BadgeManagement/AssignedBadge",
            AssignBadge: "v1/BadgeManagement/AssignBadgeToRule",
            RuleCondBSMap: "v1/BadgeManagement/MapBadgeStagetoRuleCond",
            BadgeStageList: "v1/BadgeManagement/BadgeStageList",
            RuleCondListForProg: "v1/BadgeManagement/RuleCondBSMapListForProg",
            RmvAssignedBadge: "v1/BadgeManagement/RemoveAssignedBadges",
            ManageTargetUsers: "v1/BadgeManagement/ManageTargetUsers",
            RmvTargetUsers: "v1/BadgeManagement/RemoveTargetUsers",
            EditRuleCond: "v1/BadgeManagement/ModifyRuleConditions",
            RmvBSfromRuleCond: "v1/BadgeManagement/RemBadgeStagefromRuleCond",
            ManadatoryMasterList: "v1/BadgeManagement/MandatoryMasterList",
            TargetUserList: "v1/BadgeManagement/GetTargetUsers",
            SpecificUserList: "v1/BadgeManagement/GetSpecificUsers",
            AddBadges: "v1/BadgeManagement/BadgeDetails",
            BadgeType: "v1/BadgeManagement/BadgeType",
        }
    //Added by Gargi B For User Rights Module
    public static UserRights =
        {
            ListofModules: "v1/UserRights/UserModuleList",
            ListofRuleModules: "v1/UserRights/ModuleRuleMappingList",
            AddRules: "v1/UserRights/ModuleRules",
            EditRules: "v1/UserRights/ModModuleRules",
            GetRules: "v1/UserRights/ModuleRuleList",
            AddUsers: "v1/UserRights/ModuleRuleConditions",
            ListofUserstoRules: "v1/UserRights/AssignedUsertoRuleList",
            ListofUserCodes: "v1/UserRights/UserCodesList",
        }
    //added by Farooqui Gulam For Admin Elearn Course Category
    public static AdminCourse =
        {
            courseCategory: "Admin/CourseManagement/Category",
            saveFile: "v1/User/SaveFile?DomainID=",
            feedbackListDetails: "Admin/FeedbackManagement/Feedback",
            feedbacktypeandname: "Admin/FeedbackManagement/FeedbackformDetail",
            feedbackimport: "Admin/FeedbackManagement/FeedbackImport",
            languageListDetails: "Admin/MasterManagement/Language",
            topicListDetails: "Admin/MasterManagement/Topic",
            addAdminCourse: "Admin/CourseManagement/Course",
            courseSearch: "Admin/CourseManagement/CourseSearch",
            courseStatus: "Admin/CourseManagement/ModifyCourse",
            singleFile: "Admin/CourseManagement/ImportCourse",
            modifyCourse: "Admin/CourseManagement/{Ref_Course_ID}",
            coursehistoricalcaldata: "Admin/CourseManagement/ImportCourseHistoricalData"
        }

    public static AdminDocument =
        {
            addDocument: "Admin/LibraryManagement/Document",
            saveFile: "Admin/LibraryManagement/UploadFile?DomainID=",

            topicListData: "Admin/LibraryManagement/Topic",
            documentTypeList: "Admin/LibraryManagement/DocumentType",
            documentList: "Admin/LibraryManagement/Documents"
        }

    //Added by Ajit on 06Oct2016
    //Feedback Module : Start Here
    public static feedbackModuleKeys =
        {
            /**
             * For Feedback List
             */
            remainingFeedback: "v1/FeedBack/Remaining",
            /**
             * For Feedback Form
             */
            feedbackFormGet: "v1/FeedBack/Form",
            feedbackFormPost: "v1/FeedBack/Form",
        }
    //Feedback Module : End Here
    public static assessModule =
        {
            catalogueListWithTopic: "v1/Catalogue/CatalogueListWithTopic",
            assessmentlistwithtopic: "v1/assessment/assessmentlistwithtopic",
            details: "v1/assessment/Details",
            status: "v1/assessment/Status",
            attempts: "v1/assessment/Attempts",
            expiryComment: "v1/assessment/ExpiryComment",
            view: "v1/Certificate/View",
            remove: "v1/Certificate/Remove",
            assessment: "v1/assessment/",
            learningPathAssessmentDetails: "v1/assessment/learningpath/details"
        }
    //Added by Pragnesh Makwana on 25-10-2018
    //Import Module Download Excel
    public static downloadFile =
        {
            Fileid: "Admin/User/downloadfile"
        }

    //Added by Pragnesh Makwana on 25-10-2018
    //Import Module Download Excel
    public static PasswordSent =
        {
            Fileid: "Admin/User/ImportPasswordMailSent"
        }

    //Registered user mail confirmation
    public static mailconfirmation =
        {
            userid: "v1/B2BUser/RegistrationConfirmation"
        }

    //Added by Maneesh on 29-11-2018
    //Banner Management Module Keys
    public static bannerModule = {
        getUserMaster: "v1/Organisation/Report_GetUserMasterdata",
        getBannerMasterModule: "Admin/BannerManagement/GetBannerMasterModule",
        getBannerLanguageList: "Admin/BannerManagement/GetBannerLangugeList",
        getBannerList: "Admin/BannerManagement/GetBannerList",
        bannerAddModify: "Admin/BannerManagement/BannerAddModify",
        bannerManagemeActiveDelete: "Admin/BannerManagement/BannerManageActiveateDelete",
        bannerList: "Admin/BannerManagement/GetBannerList",
        modifyBanner: "Admin/BannerManagement/BannerManageActiveateDelete",
        modifyBannerListData: "Admin/BannerManagement/",
        getBannerModuleList: "Admin/BannerManagement/GetBannerMasterModule",
        getTMSBatchID: "Admin/TrainingManagement/GetBatch_ID",
        bannerMaster: "Admin/MasterManagement/ModuleMaster",

    }

    // Added By Farooqui Gulam Gous on 5-03-2019
    public static splashModule = {
        saveFile: "v1/User/SaveFile?DomainID=",
        addModify: "Admin/BannerManagement/Splash",
        selectedSplashList: "Admin/BannerManagement/Splash",
        splashList: "Admin/BannerManagement/SplashList",
        modifyStatusandDelete: "Admin/BannerManagement/ActiveDeactiveSplash",
    }

    //Added by Divyesh Chauhan on 1-12-2018
    public static FAQAdmin = {
        admintopicdetail: "Admin/FAQManagement/Topic",
        addmodifyfaq: "Admin/FAQManagement/FAQ",
        faqList: "Admin/FAQManagement/FAQs",
        faqActiveDeactive: "Admin/FAQManagement/ActiveDeActive",
        faqbyId: "Admin/FAQManagement/",
        tempSaveFile: "Admin/FAQManagement/SaveFile?DomainID=",
        faqbtopic: "Admin/FAQManagement/",
        topicdetail: "Admin/FAQManagement/GetTopicByID/",
        removefaqtopic: "Admin/FAQManagement/RemoveFAQTopic",
        ManageTopic: "Admin/FAQManagement/ManageTopic"
    }

    //Added by Roshan More on 30-11-2018
    // Rule Condition Module
    public static RuleConditionModule = {
        GetModTypes: "Admin/v1/RuleConditionManagement/ModuleTypes",
        GetModNames: "Admin/v1/RuleConditionManagement/ModuleNames",
        GetEventList: "Admin/v1/RuleConditionManagement/EventList",
        GetModuleListForRuleCondition: "Admin/v1/RuleConditionManagement/GetModuleList",
        AddRuleCondition: "Admin/v1/RuleConditionManagement/Rule_Conditions",
        DelRuleCondition: "Admin/v1/RuleConditionManagement/DelRuleCondition",
        AddRuleConditionEventMapping: "Admin/v1/RuleConditionManagement/Rule_Conditions_Events_Mapping",
        GetRuleConditionsDetails: "Admin/v1/RuleConditionManagement/Rule_Conditions_Details"
    }

    public static audiencemanagementmodule = {
        getAudienceMaster: "Admin/v1/AudienceManagement/AudienceMasterList",
        getAudienceList: "Admin/v1/AudienceManagement/getAudienceList",
        getFilter: "Admin/v1/AudienceManagement/GetFilter",
        addAudienceMaster: "Admin/v1/AudienceManagement/AudienceMasterAdd",
        deleteAudienceMaster: "Admin/v1/AudienceManagement/AudienceMasterDelete",
        updateAudienceMaster: "Admin/v1/AudienceManagement/AudienceMasterUpdate",
        filterMasterData: "Admin/v1/AudienceManagement/AudienceFilterDataList",
        filterMasterDataAdd: "Admin/v1/AudienceManagement/TargetAudienceFilterAdd",
        filterMasterDataupdate: "Admin/v1/AudienceManagement/TargetAudienceUpdate",
        getAudienceFilterList: "Admin/v1/AudienceManagement/TargetAudienceFilterList",
        getTargetAudience: "Admin/v1/AudienceManagement/Get_Target_Audience",
        getObjectMapping: "Admin/MasterManagement/ObjectMapping",
        getTargetAudienceList: "Admin/v1/AudienceManagement/Get_Target_AudienceList",
        get_TargetAudience_FilterList: "Admin/v1/AudienceManagement/get_TargetAudience_FilterList",


    }
    //Added by mahendra yadav 12-12-2018
    //Assigment Audience rule
    public static AssignAudienceRule = {
        AddAudienceRule: "Admin/v1/AudienceManagement/AssignmentAudienceRule",
        RemoveAudienceRules: "Admin/v1/AudienceManagement/RemoveAudienceRules",
        AssignAudienceRuleList: "Admin/v1/AudienceManagement/AssigmentAudienceList",
        AssignAudienceRulesCondition: "Admin/v1/AudienceManagement/AssigmentConditionList",
        RuleList: "Admin/v1/AudienceManagement/RuleList",
        GetUserModuleList: "Admin/v1/AudienceManagement/UserModuleList",
        AssignRuleTargetAudience: "Admin/v1/AudienceManagement/AssignRuleToTargetAudience",
        GetTargetedAudienceData: "Admin/v1/AudienceManagement/RuleListData",
        DeleteAssignment: "Admin/v1/AudienceManagement/DelAssignment",
        AddPoints: "Admin/v1/AudienceManagement/AddPoints"
    }


    public static b2cThirdParty = {
        isThirdParty: "v1/B2CUser/thirdParty",
        signIn: "v1/B2CUser/ThirdPartySignin"
    }

    /**
     * Added by brijesh 2-12-2018
     * LNA
     */
    public static LNA = {
        GetCompetencyProficiencyTypeData: "Admin/Competency",
        GetCategory: "Admin/MasterManagement/Category",
        GetTrainingList: "Admin/MasterManagement/Training",
        GettRole: "Admin/MasterManagement/Role",
        getPosition: "Admin/MasterManagement/PositionCode",
        GetReporAssingedtData: "Admin/AdminReport/TrainingRole",
        GetReportRequestedData: "Admin/AdminReport/TrainingRequest",
        GetUserDetails: "Admin/UserDetails/GetUserDetails",
        GetAssignedTrainingList: "Admin/AssignmentManagement/AssignedTrainings",
        GetRequestedTraining: "Admin/User/RequestedTraining",
        PostTraining: "Admin/MasterManagement/Training",
        PostRoleTraining: "Admin/AssignmentManagement/Training",
        PostXlsxData: "Admin/AssignmentManagement/TrainingUsingExcel",
        PostTrainingAcceptanceExcel: "Admin/AssignmentManagement/TrainingAcceptanceExcel",
        PostRequestNewTraining: "Admin/User/TrainingRequest",
        DeleteTraining: "Admin/MasterManagement/ActiveDeactive",
        //GetCompetencyProficiencyTypeData: "v1/LNA/GetCompetencyProficiencyTypeData"
    }

    // Added by Manish Maddesiya 08/01/2019
    // Update Course Status Details
    public static updatecoursestatusdetails = {
        getUserDetails: "Admin/UserDetails/GetUserDetails",
        getCourseManagement: "/Admin/CourseManagement/UserCourses",
        postInitializeCourseUser: "v1/Scorm/InitializeUser",
        posCourseManagement: "Admin/CourseManagement/SyncUserMissingData",

    }

    // Added by Manish Maddesiya 19/01/2019
    // get enquiry details
    public static EnquiryDetails = {
        getEnquiryDetails: "Admin/SupportManagement/GetEnquiryDetails",
    }

    /**
     * Added by brijesh 18-01-2019
     * Annual Declaration
     */
    public static AnnualDeclaration = {
        getAnnualDeclarationAssignment: "v1/AnnualDeclaration/GetAnnualDeclarationAssignment",
        getAnnualDeclarationPostData: "v1/AnnualDeclaration/GetAnnualDeclarationPostData",
        getAnnualDeclarationSubmittedUserCount: "v1/AnnualDeclaration/GetAnnualDeclarationSubmittedUserCount",
        postAnnualDeclarationFormDetail: "v1/AnnualDeclaration/PostAnnualDeclarationFormDetail",
        getMandatoryMasterAndMasterData: "v1/AnnualDeclaration/GetMandatoryMasterAndMasterData",
        getMasterData: "v1/Organisation/Masterdata",
        postMasterData: "v1/User/EditProfile",
    }

    /**
     * Added by Ajit / Irfan
     * Learning Path Admin Section
     */
    public static AdminLearningPath = {
        getQuestionBank: "Admin/AssessManagement/QuestionBank",
        getQuestionList: "Admin/AssessManagement/Questions",
        postAddLearningPath: "Admin/LearningPathManagement/AssessmentDriven",
        getLearningPathData: "Admin/LearningPathManagement/AssessmentDriven",
        getLearningPathList: "Admin/LearningPathManagement/List",
        uploadFile: "v1/User/SaveFile",
        getUserList: "Admin/MasterManagement/User",
        assignLp: "Admin/AssignmentManagement/AssessmentDriven",
        topicListDetails: "Admin/MasterManagement/Topic",
        /**
        * Added by Ajit Vishwakarma
        * Blended Learning Path Admin Section.
        */
        blended: {
            getLearningPathDetails: "Admin/LearningPathManagement/LearningPath",
            setLearningPathDetails: "Admin/LearningPathManagement/LearningPath",
            getLearningPathCondition: "Admin/LearningPathManagement/Condition",
            getAssessmentName: "Admin/AssessManagement/AssessmentName",
            getCourseName: "Admin/CourseManagement/CourseName",
            getBatchName: "Admin/TrainingManagement/BatchName",
            getLearningPathName: "Admin/LearningPathManagement/LearningPathName",
            getSetRating: "Admin/FeedbackManagement/Rating",
            getSetFeedback: "Admin/FeedbackManagement/Feedback",
            getMasterTopicName: "Admin/MasterManagement/TopicName",
        }
    }

    public static AdminLibrary = {
        getTopicList: "Admin/LibraryManagement/Topic",
        getDocument: "Admin/LibraryManagement/Documents",
        getDocumentType: "Admin/LibraryManagement/DocumentType",
        addDocument: "Admin/LibraryManagement/Document",
        // saveFile: "Admin/LibraryManagement/UploadFile?DomainID=",
        saveFile: "v1/User/SaveFile?DomainID=",
        topicListData: "Admin/LibraryManagement/Topic",
        documentTypeList: "Admin/LibraryManagement/DocumentType",
        documentList: "Admin/LibraryManagement/Documents",
        modifyDocument: "Admin/LibraryManagement/Document",
        documentStatus: "Admin/LibraryManagement/ActiveDeActive",
        ManageTopic: "Admin/LibraryManagement/ManageTopic"
    }

    public static AdminAssessment = {
        Complexity: "Admin/AssessManagement/Complexity",
        ManageComplexity: "Admin/AssessManagement/ManageComplexity",
        Category: "Admin/AssessManagement/Category",
        ManageCategory: "Admin/AssessManagement/ManageCategory"

    }

    public static Sms = {
        sendSms: "SendSms"
    }
    //Added by Ramanuj on 2 march 2019 to importy historical data
    public static ImportData = {
        historicaldata: "Admin/ImportFile"
    }
    public static b2cIndex = {
        recommended: "v1/Home/Recommended",
        mostViewed: "v1/Home/MostViewed",
        mostRated: "v1/Home/MostRated",
        recentAdded: "v1/Home/RecentAdded",
        recentAccessed: "v1/Home/RecentAccess"
    }
    //Added by Urmi on 09/04/2019 to import locked and Unlocked Assessment and get default master data
    public static UnlockAssessment = {
        locked: "Admin/AssignmentManagement/LockedAssessment?DomainID=",
        allMasterData: "Admin/MasterManagement/UserMasterdata?DomainID=",
        unlockAssess: "Admin/AssignmentManagement/AssessmentUnlock"
    }
    public static UserLibrary = {
        points: "v1/Synchronization/Points"

    }
    public static identityProvider =
        {
            linkuser: "v1/idp/linkuser",
            checkuserexist: "v1/idp/checkuserexist"
        }




    /**
       * Added by Urmi
       * Escalation matrix
    */
    public static levelmanagement =
        {
            addLevels: "Admin/AddLevels",
            getLevels: "Admin/GetLevelsALL",
            deleteLevels: "Admin/Removelevels",
            modifyLevels: "Admin/ModifyLevels"
        }
    public static roles = {
        addRole: "HafelePH/Role/AddRole",
        getRoles: "HafelePH/Role/GetAllRole",
        deleteRole: "HafelePH/Role/RemoveRole",
        modifyRole: "HafelePH/Role/ModifyRole"
    }
    public static levelrolemapping = {
        getMap: "HafelePH/LevelRole/LevelRoleMappingDetails",
        addMap: "HafelePH/LevelRole/LevelRoleMappingDetails",
        deletemap: "HafelePH/LevelRole/RemoveLevelRoleMapping"
    }
    public static escalation = {
        getEsc: "HafelePH/EscalationMaster/GetEscalationDetail",
        deleteEsc: "HafelePH/EscalationMaster/RemoveEscalation",
        addEsc: "HafelePH/EscalationMaster/AddEscalation",
        modifyEsc: "HafelePH/EscalationMaster/UpdateEscalation"
    }
    public static mastersRole = {
        getMasterData: "v1/Organisation/GetUserMasterdata",
        addRoleMaster: "HafelePH/RoleMasterDataMapping/AddRoleMasterDataMapping",
        getRoleMasters: "HafelePH/RoleMasterDataMapping/RoleMasterData",
        deleteRoleMasters: "HafelePH/RoleMasterDataMapping/RemoveRoleMasterDataMapping"

    }

    /**
     * Added by Urmi
     * User side
  */
    public static userDashboard = {
        dashboardDetails: "HafelePH/UserDashboard/KPIDetails"
    }
    public static process = {
        processDetails: 'HafelePH/Process/ProcessDetails',
        removeProcess: 'HafelePH/Process/RemoveProcess',
    }
    public static status = {
        StatusDetails: 'HafelePH/Status/StatusDetails',
        RemoveStatus: 'HafelePH/Status/RemoveStatus',
    }
    public static workflow = {
        WorkflowDetails: 'HafelePH/Workflow/WorkflowDetails',
        RemoveWorkflow: 'HafelePH/Workflow/RemoveWorkflow'
        // processDetails : 'HafelePH/Process/ProcessDetails',
        // removeProcess : 'HafelePH/Process/RemoveProcess',
    }
    public static CMTree = {
        ProductHierarchyTree: "HafelePH/CMTree/ProductHierarchyTree"
    }
    public static export = {
        exportToExcel:"HafelePH/ExportToExcel"
    }
    public static communication = {
        getGridData:"HafelePH/Communication/GetCommunicationDetails"
    }
    public static createNewPH = {
        regionsData:"HafelePH/CMTree/RegionSubsidiaryMappingList"        
    }
}

