import { LoginPageActions, RecruitmentPageActions, SidePanelActions } from "@pageActions";

export interface PageActions {
    loginPageActions?: LoginPageActions;
    sidePanelActions?: SidePanelActions;
    recruitmentPageActions?: RecruitmentPageActions;
}