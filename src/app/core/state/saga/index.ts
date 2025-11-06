import { all, fork } from "redux-saga/effects";
import * as authSaga from "./auth";
import * as adminRolesSaga from "./admin-roles";
import * as adminUsersSaga from "./admin-users";
import * as adminOrganizationsSaga from "./admin-organizations";
import * as adminPermissionsSaga from "./admin-permissions";
import * as organizationsSaga from "./organizations";
import * as settingsSaga from "./settings";
import * as gymsSaga from "./gyms";
import * as invitationsSaga from "./invitations";
import * as salesAgreementsSaga from "./sales-agreements";
import * as groupsSaga from "./groups";
import * as usersSaga from "./users";
import * as membersSaga from "./members";
import * as notesSaga from "./notes";
import * as memberSalesAgreementsSaga from "./member-sales-agreements";
import * as memberSalesAgreementFreezesSaga from "./member-sales-agreement-freezes";
import * as presentationDecksSaga from "./presentation-decks";
import * as rolesSaga from "./roles";
import * as formsSaga from "./forms";
import * as formFields from "./form-fields";
import * as formContactFields from "./form-contact-fields";
import * as tasks from "./tasks";
import * as answers from "./answers";
import * as reports from "./reports";
import * as boards from "./boards";
import * as groupAssessments from "./group-assessments";
import * as memberPresentationDecks from "./member-presentation-decks";
import * as userNotes from "./user-notes";
import * as quickLinks from "./quick-links";
import * as sessions from "./sessions";
import * as assessments from "./assessments";
import * as gymRevenues from "./gym-revenue";
import * as gymImportHistory from "./gym-import-history";
import * as organizationImportHistory from "./organization-import-history";

export default function* root() {
    const sagas = [
        ...Object.values(authSaga),
        ...Object.values(adminRolesSaga),
        ...Object.values(adminUsersSaga),
        ...Object.values(adminOrganizationsSaga),
        ...Object.values(adminPermissionsSaga),
        ...Object.values(organizationsSaga),
        ...Object.values(settingsSaga),
        ...Object.values(gymsSaga),
        ...Object.values(invitationsSaga),
        ...Object.values(salesAgreementsSaga),
        ...Object.values(groupsSaga),
        ...Object.values(usersSaga),
        ...Object.values(membersSaga),
        ...Object.values(notesSaga),
        ...Object.values(memberSalesAgreementsSaga),
        ...Object.values(memberSalesAgreementFreezesSaga),
        ...Object.values(presentationDecksSaga),
        ...Object.values(rolesSaga),
        ...Object.values(formsSaga),
        ...Object.values(formFields),
        ...Object.values(formContactFields),
        ...Object.values(tasks),
        ...Object.values(memberPresentationDecks),
        ...Object.values(answers),
        ...Object.values(reports),
        ...Object.values(groupAssessments),
        ...Object.values(boards),
        ...Object.values(userNotes),
        ...Object.values(quickLinks),
        ...Object.values(sessions),
        ...Object.values(assessments),
        ...Object.values(gymRevenues),
        ...Object.values(gymImportHistory),
        ...Object.values(organizationImportHistory),
    ];
    yield all(sagas.map(fork));
}
